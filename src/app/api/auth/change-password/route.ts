import { prisma } from "@/lib/prisma";
import { sessionOptions } from "@/lib/session";
import bcrypt from "bcryptjs";
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

  try {
    const body = await request.json();
    const currentPassword = body?.currentPassword;
    const newPassword = body?.newPassword;

    if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
      return new Response(
        JSON.stringify({ success: false, message: "currentPassword dan newPassword wajib diisi" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (newPassword.length < 8) {
      return new Response(
        JSON.stringify({ success: false, message: "Password baru minimal 8 karakter" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const userId = session.user.id as number;

    const user = await prisma.sec_user.findFirst({
      where: { ID: userId, Status: "Active" },
      select: { ID: true, PasswordHash: true, Username: true },
    });

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "User tidak ditemukan" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    const ok = await bcrypt.compare(currentPassword, user.PasswordHash);
    if (!ok) {
      return new Response(JSON.stringify({ success: false, message: "Password lama salah" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    await prisma.sec_user.update({
      where: { ID: user.ID },
      data: {
        PasswordHash: newHash,
        Updated_By: user.Username,
      },
    });

    return new Response(JSON.stringify({ success: true, message: "Password berhasil diubah" }), {
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
