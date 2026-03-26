import { prisma } from "@/lib/prisma";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/session";
import { SessionData } from "@/types/iron-session";

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions) as any;
  if (!session.user || session.user.username !== 'admin') {
    return new Response(JSON.stringify({ success: false, message: "Forbidden" }), { status: 403 });
  }

  try {
    const companies = await prisma.mst_company.findMany({
      where: { Status: "Active" },
      orderBy: { Name: "asc" },
    });

    return new Response(JSON.stringify({ success: true, data: companies }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
