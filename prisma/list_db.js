require('dotenv').config({ path: '.env.local' });

async function listDatabases() {
  const url = `${process.env.ODOO_URL}/xmlrpc/2/common`;
  console.log(`Listing databases at: ${url}`);
  
  const body = `<?xml version="1.0"?>
<methodCall>
  <methodName>list</methodName>
  <params></params>
</methodCall>`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml' },
      body: body
    });

    const text = await response.text();
    console.log(`Status: ${response.status}`);
    console.log(`Response body:`);
    console.log(text);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

listDatabases();
