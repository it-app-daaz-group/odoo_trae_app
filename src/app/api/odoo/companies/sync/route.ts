import { prisma } from "@/lib/prisma";
import { getOdooCompanies } from "@/lib/odooClient";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const odooCompanies = await getOdooCompanies();

    for (const comp of odooCompanies) {
      await prisma.mst_company.upsert({
        where: { Odoo_ID: comp.id },
        update: { Name: comp.name, Status: "Active" },
        create: {
          Odoo_ID: comp.id,
          Name: comp.name,
          Created_By: "System",
          Status: "Active",
        },
      });
    }

    return new Response(JSON.stringify({ success: true, message: "Companies synced successfully" }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
