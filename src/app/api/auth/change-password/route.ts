import { sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const session = await getIronSession(cookies(), sessionOptions) as any;

  if (!session.user) {
    return new Response(JSON.stringify({ success: false, message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  void request;

  return new Response(
    JSON.stringify({
      success: false,
      message: "Password akun dikelola di Odoo. Silakan ubah password langsung dari akun Odoo Anda."
    }),
    {
      status: 400,
      headers: { "Content-Type": "application/json" }
    }
  );
}
