import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const user = await prisma.sec_user.findFirst({
      where: { ID: id, Status: "Active" },
      include: {
        Companies: {
          include: {
            Company: true,
          },
        },
      },
    });

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "User not found" }), { status: 404 });
    }

    const formattedUser = {
      id: user.ID,
      name: user.Name,
      username: user.Username,
      isCustomer: user.IsCustomer,
      isVendor: user.IsVendor,
      companies: user.Companies.map((c) => ({
        id: c.Company.ID,
        name: c.Company.Name,
      })),
    };

    return new Response(JSON.stringify({ success: true, data: formattedUser }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();
    const { name, username, password, companyIds, isCustomer, isVendor } = body;

    const data: any = {
      Name: name,
      Username: username,
      IsCustomer: isCustomer,
      IsVendor: isVendor,
      Updated_By: "Admin",
    };

    if (password) {
      data.PasswordHash = await bcrypt.hash(password, 10);
    }

    await prisma.sec_user.update({
      where: { ID: id },
      data: {
        ...data,
        Companies: {
          deleteMany: {},
          create: companyIds.map((compId: number) => ({
            Company: { connect: { ID: compId } },
          })),
        },
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    // Soft delete according to .traerules
    await prisma.sec_user.update({
      where: { ID: id },
      data: {
        Status: "Inactive",
        Deleted_By: "Admin",
        Deleted_Date: new Date(),
      },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
