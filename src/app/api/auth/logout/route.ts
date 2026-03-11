import { sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function POST() {
  const session = await getIronSession(cookies(), sessionOptions);
  session.destroy();
  return new Response(
    JSON.stringify({ success: true, message: "Logged out successfully" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
