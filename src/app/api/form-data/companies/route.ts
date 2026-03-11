import { prisma } from "@/lib/prisma";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/session";
import { SessionData } from "@/types/iron-session";

import { mst_company } from '@prisma/client';

export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.user) {
    return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
  }

  const isAdmin = session.user.username === 'admin';

  try {
    let companies: mst_company[];
    if (isAdmin) {
      // Admin gets all active companies
      companies = await prisma.mst_company.findMany({
        where: { Status: "Active" },
        orderBy: { Name: "asc" },
      });
    } else {
      // Non-admin gets only their allowed companies
      if (session.user.companyIds && session.user.companyIds.length > 0) {
        companies = await prisma.mst_company.findMany({
          where: {
            ID: { in: session.user.companyIds },
            Status: "Active",
          },
          orderBy: { Name: "asc" },
        });
      } else {
        // If non-admin has no companies assigned, return an empty array
        companies = [];
      }
    }

    console.log(`[API /form-data/companies] isAdmin: ${isAdmin}, Companies found: ${companies.length}`);

    return new Response(JSON.stringify({ success: true, data: companies }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
