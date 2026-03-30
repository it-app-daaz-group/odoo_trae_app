import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const users = await prisma.sec_user.findMany({
      where: { Status: "Active" },
      include: {
        Companies: {
          include: {
            Company: true,
          },
        },
      },
    });

    const formattedUsers = users.map((u) => ({
      id: u.ID,
      name: u.Name,
      username: u.Username,
      isCustomer: u.IsCustomer,
      isVendor: u.IsVendor,
      companies: u.Companies.map((c) => ({
        id: c.Company.ID,
        odooId: c.Company.Odoo_ID,
        name: c.Company.Name,
      })),
    }));

    return new Response(JSON.stringify({ success: true, data: formattedUsers }), {
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, username, password, companyIds, isCustomer, isVendor } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.sec_user.create({
      data: {
        Name: name,
        Username: username,
        PasswordHash: hashedPassword,
        IsCustomer: isCustomer,
        IsVendor: isVendor,
        Created_By: "Admin", // Should get from session in real app
        Status: "Active",
        Companies: {
          create: companyIds.map((compId: number) => ({
            Company: { connect: { ID: compId } },
          })),
        },
      },
    });

    return new Response(JSON.stringify({ success: true, data: { id: newUser.ID } }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
