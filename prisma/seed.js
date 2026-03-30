require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

async function main() {
  const prisma = new PrismaClient();
  try {
    const existingUser = await prisma.sec_user.findUnique({
      where: { Username: "admin" },
    });

    if (existingUser) {
      console.log("Admin user already exists");
      return;
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

    console.log("Admin user created: admin / admin123");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
