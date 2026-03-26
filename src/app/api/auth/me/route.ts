import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/session";

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions) as any;

  if (!session.user) {
    return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), { status: 401 });
  }

  return new Response(JSON.stringify({ success: true, user: session.user }), { status: 200 });
}
