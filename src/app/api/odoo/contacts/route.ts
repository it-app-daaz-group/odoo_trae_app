import {
  getOdooContacts,
  createOdooContact,
  searchOdooContactByName,
  updateOdooContact,
  CreateContactParams,
  getJournalIdsByNameAndCompany,
  mapLocalCompanyIdsToOdooIds
} from "@/lib/odooClient";
import {
  cleanNameForComparison,
  removePunctuation,
  toProperCaseWithExceptions
} from "@/lib/stringUtils";

type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  message: string;
  errors: string[];
};

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/session";

export async function POST(request: Request) {
  const session = await getIronSession(cookies(), sessionOptions);
  if (!session.user) {
    return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
  }

  const body = await request.json();
  console.log("[API /odoo/contacts] Received body:", JSON.stringify(body, null, 2));

  // Map local company IDs to Odoo IDs
  const localCompanyIds = Array.isArray(body.belongToCompanyIds) ? body.belongToCompanyIds : [];
  const odooCompanyIds = await mapLocalCompanyIdsToOdooIds(localCompanyIds);
  console.log("[API /odoo/contacts] Mapped Odoo Company IDs:", odooCompanyIds);

  const isAdmin = session.user.username === 'admin';

  // Server-side validation: Check if all selected companies are allowed for the user
  if (!isAdmin) {
    const selectedCompanyIds = body.belongToCompanyIds || [];
    const isAllowed = selectedCompanyIds.every((id: number) => session.user.companyIds?.includes(id));

    if (!isAllowed) {
      return new Response(JSON.stringify({ success: false, message: "One or more selected companies are not allowed" }), { status: 403 });
    }
  }

  try {
    if (!body.name) {
      return new Response(JSON.stringify({ success: false, message: "Name is required" }), { status: 400 });
    }

    const supplierRank = Number(body.supplierRank) || undefined;
    const customerRank = Number(body.customerRank) || undefined;

    // New, robust check logic
    const allContacts = await getOdooContacts();
    const cleanedNewName = cleanNameForComparison(body.name);
    const existingContact = allContacts.find(
      (contact) => cleanNameForComparison(contact.name) === cleanedNewName
    );

    if (existingContact) {
      // A contact with a similar name exists, now check if it's a true duplicate or a merge candidate.
      const newCompanyIds = odooCompanyIds;
      const newIsCustomer = (body.customerRank || 0) > 0;
      const newIsVendor = (body.supplierRank || 0) > 0;

      const existingCompanyIds = existingContact.belongToCompanyIds || [];
      const existingIsCustomer = (existingContact.customerRank || 0) > 0;
      const existingIsVendor = (existingContact.supplierRank || 0) > 0;

      // Determine journal type for the request
      const typeName = supplierRank === 1 && customerRank !== 1 ? "Vendor Bills" : "Customer Invoice";
      let newJournalIds: number[] = [];
      if (odooCompanyIds.length > 0) {
        newJournalIds = await getJournalIdsByNameAndCompany(typeName, odooCompanyIds);
      }

      const existingJournalIds = existingContact.journalNameIds || [];
      const isAddingNewJournal = newJournalIds.some((id: number) => !existingJournalIds.includes(id));
      const isAddingNewCompany = odooCompanyIds.some((id: number) => !existingCompanyIds.includes(id));
      const isAddingCustomerType = newIsCustomer && !existingIsCustomer;
      const isAddingVendorType = newIsVendor && !existingIsVendor;

      const hasNewInformation = isAddingNewCompany || isAddingCustomerType || isAddingVendorType || isAddingNewJournal;

      if (!hasNewInformation) {
        return new Response(JSON.stringify({
          success: false,
          message: "This contact already exists with the selected companies and partner types."
        }), { status: 409, headers: { "Content-Type": "application/json" } });
      }

      // Logic Update (Merge)
      const mergedCompanyIds = Array.from(new Set([...existingCompanyIds, ...odooCompanyIds]));
      const mergedJournalIds = Array.from(new Set([...existingJournalIds, ...newJournalIds]));
      const newSupplierRank = Math.max(existingContact.supplierRank || 0, supplierRank || 0);
      const newCustomerRank = Math.max(existingContact.customerRank || 0, customerRank || 0);

      await updateOdooContact(existingContact.id, {
        belongToCompanyIds: mergedCompanyIds,
        journalNameIds: mergedJournalIds,
        supplierRank: newSupplierRank,
        customerRank: newCustomerRank
      });

      return new Response(JSON.stringify({ success: true, data: { id: existingContact.id }, message: "Contact updated successfully (merged)" }), { status: 200 });
    } else {
      // If contact doesn't exist, create it
      let finalContactName = body.name;
      if (supplierRank === 1) {
        const nameWithoutPunctuation = removePunctuation(body.name);
        finalContactName = toProperCaseWithExceptions(nameWithoutPunctuation);
        console.log(`[Create Contact] Vendor name formatting. Original: "${body.name}", Final: "${finalContactName}"`);
      }

      const params: CreateContactParams = {
        name: finalContactName,
        address: body.address,
        email: body.email,
        phone: body.phone,
        supplierRank: supplierRank,
        customerRank: customerRank,
        invCode: body.invCode,
        belongToCompanyIds: odooCompanyIds,
        isCompany: true
      };

      const typeName = params.supplierRank === 1 && params.customerRank !== 1 ? "Vendor Bills" : "Customer Invoice";
      if (Array.isArray(odooCompanyIds) && odooCompanyIds.length > 0) {
        const journalIds = await getJournalIdsByNameAndCompany(typeName, odooCompanyIds);
        if (journalIds.length > 0) {
          params.journalNameIds = journalIds;
        }
      }

      const newId = await createOdooContact(params);
      return new Response(JSON.stringify({ success: true, data: { id: newId }, message: "Contact created successfully" }), { status: 201 });
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error creating contact";

    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: "Failed to create contact",
      errors: [errorMessage]
    };

    return new Response(JSON.stringify(response), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function GET() {
  try {
    const contacts = await getOdooContacts();

    const body: ApiResponse<
      {
        id: number;
        name: string;
        email: string | null;
        phone: string | null;
        mobile: string | null;
        companyType: string | null;
      }[]
    > = {
      success: true,
      data: contacts,
      message: "Fetched Odoo contacts successfully",
      errors: []
    };

    return new Response(JSON.stringify(body), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Odoo contacts error";

    const body: ApiResponse<null> = {
      success: false,
      data: null,
      message: "Failed to load Odoo contacts",
      errors: [errorMessage]
    };

    return new Response(JSON.stringify(body), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
