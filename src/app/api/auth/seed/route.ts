import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const existingUser = await prisma.sec_user.findUnique({
      where: { Username: "admin" },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ success: false, message: "Admin user already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.sec_user.create({
      data: {
        Username: "admin",
        PasswordHash: hashedPassword,
        Name: "Administrator",
        IsCustomer: true,
        IsVendor: true,
        Created_By: "System",
        Status: "Active",
      },
    });

    return new Response(JSON.stringify({ success: true, message: "Admin user created: admin / admin123" }), { status: 201 });
  } catch (error: any) {
    console.error("Seed error:", error);
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
