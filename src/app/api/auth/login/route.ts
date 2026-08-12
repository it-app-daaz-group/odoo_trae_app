import { prisma } from "@/lib/prisma";
import { authenticateOdooUser } from "@/lib/odooClient";
import { isAdminUsername, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "Username and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const user = await prisma.sec_user.findFirst({
      where: { Username: username, Status: "Active" },
      include: { Companies: true },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      await authenticateOdooUser(username, password);
    } catch {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const session = await getIronSession(cookies(), sessionOptions) as any;
    session.user = {
      id: user.ID,
      username: user.Username,
      name: user.Name,
      isAdmin: isAdminUsername(user.Username),
      isCustomer: user.IsCustomer,
      isVendor: user.IsVendor,
      companyIds: user.Companies.map(c => c.Company_ID),
    };
    await session.save();

    return new Response(
      JSON.stringify({ success: true, message: "Login successful" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Login API Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
