import {
  getOdooContactById,
  updateOdooContact,
  deleteOdooContact,
  CreateContactParams,
  getJournalIdsByNameAndCompany,
  logOdooPartnerChange
} from "@/lib/odooClient";
import { formatVendorName } from "@/lib/utils";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/session";

type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  message: string;
  errors: string[];
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return new Response(
        JSON.stringify({
          success: false,
          data: null,
          message: "Invalid ID",
          errors: ["ID must be a number"]
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const contact = await getOdooContactById(id);

    if (!contact) {
      return new Response(
        JSON.stringify({
          success: false,
          data: null,
          message: "Contact not found",
          errors: ["Contact not found"]
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const response: ApiResponse<typeof contact> = {
      success: true,
      data: contact,
      message: "Contact fetched successfully",
      errors: []
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error fetching contact";
    return new Response(
      JSON.stringify({
        success: false,
        data: null,
        message: "Failed to fetch contact",
        errors: [errorMessage]
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return new Response(
        JSON.stringify({
          success: false,
          data: null,
          message: "Invalid ID",
          errors: ["ID must be a number"]
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const success = await deleteOdooContact(id);

    if (!success) {
      return new Response(
        JSON.stringify({
          success: false,
          data: null,
          message: "Failed to delete contact",
          errors: ["Odoo returned false"]
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: "Contact deleted successfully",
      errors: []
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error deleting contact";
    return new Response(
      JSON.stringify({
        success: false,
        data: null,
        message: "Failed to delete contact",
        errors: [errorMessage]
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return new Response(
        JSON.stringify({
          success: false,
          data: null,
          message: "Invalid ID",
          errors: ["ID must be a number"]
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const session = await getIronSession(cookies(), sessionOptions) as any;
    const actor = session?.user?.username ? String(session.user.username) : "Unknown";

    const before = await getOdooContactById(id);

    const body = await request.json();

    const updateParams: Partial<CreateContactParams> = {
      name: body.name,
      address: body.address,
      email: body.email,
      phone: body.phone,
      supplierRank: body.supplierRank,
      customerRank: body.customerRank,
      invCode: body.invCode,
      belongToCompanyIds: body.belongToCompanyIds,
      journalNameIds: body.journalNameIds,
      isCompany: body.isCompany
    };

    if (updateParams.supplierRank === 1 && updateParams.name) {
      updateParams.name = formatVendorName(updateParams.name);
    }

    if (Array.isArray(updateParams.belongToCompanyIds)) {
      const typeName =
        updateParams.supplierRank === 1 && updateParams.customerRank !== 1
          ? "Vendor Bills"
          : "Customer Invoice";

      const journalIds = await getJournalIdsByNameAndCompany(
        typeName,
        updateParams.belongToCompanyIds
      );
      updateParams.journalNameIds = journalIds;
    }

    const success = await updateOdooContact(id, updateParams);

    if (!success) {
      return new Response(
        JSON.stringify({
          success: false,
          data: null,
          message: "Failed to update contact",
          errors: ["Odoo returned false"]
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: "Contact updated successfully",
      errors: []
    };

    try {
      const after = await getOdooContactById(id);
      const changes: Array<
        | { label: string; value: string }
        | { label: string; from: string; to: string }
      > = [];

      const normalize = (v: unknown) =>
        typeof v === "string" ? v.trim() : v === null || v === undefined ? "" : String(v);

      if (before && after) {
        if (normalize(before.name) !== normalize(after.name)) {
          changes.push({ label: "Name", from: before.name, to: after.name });
        }
        if (normalize(before.address) !== normalize(after.address)) {
          changes.push({ label: "Address", from: before.address || "-", to: after.address || "-" });
        }
        if (normalize(before.email) !== normalize(after.email)) {
          changes.push({ label: "Email", from: before.email || "-", to: after.email || "-" });
        }
        const beforePhone = before.phone || before.mobile || "-";
        const afterPhone = after.phone || after.mobile || "-";
        if (normalize(beforePhone) !== normalize(afterPhone)) {
          changes.push({ label: "Phone", from: beforePhone, to: afterPhone });
        }
        if (normalize(before.inventoryCode) !== normalize(after.inventoryCode)) {
          changes.push({
            label: "Inv Code",
            from: before.inventoryCode || "-",
            to: after.inventoryCode || "-"
          });
        }
        if ((before.supplierRank || 0) !== (after.supplierRank || 0)) {
          changes.push({
            label: "Supplier Rank",
            from: String(before.supplierRank || 0),
            to: String(after.supplierRank || 0)
          });
        }
        if ((before.customerRank || 0) !== (after.customerRank || 0)) {
          changes.push({
            label: "Customer Rank",
            from: String(before.customerRank || 0),
            to: String(after.customerRank || 0)
          });
        }

        const beforeCompanies = Array.isArray(before.belongToCompanyIds)
          ? before.belongToCompanyIds
          : [];
        const afterCompanies = Array.isArray(after.belongToCompanyIds) ? after.belongToCompanyIds : [];
        const addedCompanies = afterCompanies.filter((x) => !beforeCompanies.includes(x));
        const removedCompanies = beforeCompanies.filter((x) => !afterCompanies.includes(x));
        if (addedCompanies.length) {
          changes.push({ label: "Added Company IDs", value: addedCompanies.join(", ") });
        }
        if (removedCompanies.length) {
          changes.push({ label: "Removed Company IDs", value: removedCompanies.join(", ") });
        }

        const beforeJournals = Array.isArray(before.journalNameIds) ? before.journalNameIds : [];
        const afterJournals = Array.isArray(after.journalNameIds) ? after.journalNameIds : [];
        const addedJournals = afterJournals.filter((x) => !beforeJournals.includes(x));
        const removedJournals = beforeJournals.filter((x) => !afterJournals.includes(x));
        if (addedJournals.length) {
          changes.push({ label: "Added Journal IDs", value: addedJournals.join(", ") });
        }
        if (removedJournals.length) {
          changes.push({ label: "Removed Journal IDs", value: removedJournals.join(", ") });
        }
      } else {
        changes.push({ label: "Update", value: "Fields updated via Integration" });
      }

      if (changes.length) {
        await logOdooPartnerChange({
          partnerId: id,
          actor,
          action: "Contact updated via Integration",
          changes
        });
      }
    } catch (error) {
      console.error("[Odoo Log] Failed to post update log:", error);
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error updating contact";
    return new Response(
      JSON.stringify({
        success: false,
        data: null,
        message: "Failed to update contact",
        errors: [errorMessage]
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
