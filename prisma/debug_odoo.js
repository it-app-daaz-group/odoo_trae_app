require('dotenv').config({ path: '.env.local' });

async function debugOdoo() {
  const url = `${process.env.ODOO_URL}/xmlrpc/2/common`;
  console.log(`Testing connection to: ${url}`);
  
  const body = `<?xml version="1.0"?>
<methodCall>
  <methodName>version</methodName>
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
    console.log(`Response headers:`, Object.fromEntries(response.headers.entries()));
    console.log(`Response body (first 500 chars):`);
    console.log(text.substring(0, 500));
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

debugOdoo();
