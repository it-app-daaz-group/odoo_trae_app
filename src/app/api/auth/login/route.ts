import { prisma } from "@/lib/prisma";
import { sessionOptions } from "@/lib/session";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData } from "@/types/iron-session";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "Username and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const user = await prisma.sec_user.findUnique({
      where: { Username: username, Status: "Active" },
      include: { Companies: true },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.PasswordHash);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    session.user = {
      id: user.ID,
      username: user.Username,
      name: user.Name,
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
