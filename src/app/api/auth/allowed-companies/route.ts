import { prisma } from "@/lib/prisma";
import { sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions) as any;

  if (!session.user) {
    return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
  }

  try {
    const allowedCompanies = await prisma.mst_company.findMany({
      where: {
        ID: { in: session.user.companyIds },
        Status: "Active",
      },
      orderBy: { Name: "asc" },
    });

    return new Response(JSON.stringify({ success: true, data: allowedCompanies }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
