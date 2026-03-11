require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env', override: true });

const { PrismaClient } = require("@prisma/client");
const xmlrpc = require("xmlrpc");

async function getOdooConfig() {
  const url = new URL(process.env.ODOO_URL);
  return {
    host: url.hostname,
    port: url.port || (url.protocol === 'https:' ? 443 : 80),
    secure: url.protocol === 'https:',
    database: process.env.ODOO_DATABASE,
    username: process.env.ODOO_USERNAME,
    password: process.env.ODOO_PASSWORD,
  };
}

async function authenticateWithOdoo(config) {
  const client = config.secure 
    ? xmlrpc.createSecureClient({ host: config.host, port: config.port, path: '/xmlrpc/2/common' })
    : xmlrpc.createClient({ host: config.host, port: config.port, path: '/xmlrpc/2/common' });

  return new Promise((resolve, reject) => {
    client.methodCall("authenticate", [config.database, config.username, config.password, {}], (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  });
}

async function getOdooCompanies(config, uid) {
  const client = config.secure 
    ? xmlrpc.createSecureClient({ host: config.host, port: config.port, path: '/xmlrpc/2/object' })
    : xmlrpc.createClient({ host: config.host, port: config.port, path: '/xmlrpc/2/object' });

  return new Promise((resolve, reject) => {
    client.methodCall("execute_kw", [config.database, uid, config.password, "res.company", "search_read", [[]], { fields: ["name"] }], (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  });
}

async function main() {
  const prisma = new PrismaClient();
  try {
    const config = await getOdooConfig();
    console.log(`Connecting to Odoo at ${config.host}:${config.port} (secure: ${config.secure})...`);
    const uid = await authenticateWithOdoo(config);
    if (!uid) throw new Error("Odoo authentication failed");
    console.log(`Authenticated with UID: ${uid}`);
    
    const odooCompanies = await getOdooCompanies(config, uid);

    console.log(`Found ${odooCompanies.length} companies in Odoo`);

    for (const comp of odooCompanies) {
      await prisma.mst_company.upsert({
        where: { Odoo_ID: comp.id },
        update: { Name: comp.name, Status: "Active" },
        create: {
          Odoo_ID: comp.id,
          Name: comp.name,
          Created_By: "System",
          Status: "Active",
        },
      });
      console.log(`Synced: ${comp.name}`);
    }

    console.log("Companies synced successfully");
  } catch (error) {
    console.error("Sync error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
