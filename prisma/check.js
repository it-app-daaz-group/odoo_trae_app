require('dotenv').config();
const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();
  try {
    const companies = await prisma.mst_company.findMany();
    console.log("Companies count:", companies.length);
    console.log("Sample companies:", companies.slice(0, 5));
  } catch (error) {
    console.error("Check error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
