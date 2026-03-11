import {
  getOdooContactById,
  updateOdooContact,
  deleteOdooContact,
  CreateContactParams,
  getJournalIdsByNameAndCompany
} from "@/lib/odooClient";
import { formatVendorName } from "@/lib/utils";

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
