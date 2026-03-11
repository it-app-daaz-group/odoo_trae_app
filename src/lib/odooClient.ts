type OdooAuthConfig = {
  url: string;
  database: string;
  username: string;
  password: string;
};

export type OdooContact = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  mobile: string | null;
  companyType: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  supplierRank: number | null;
  customerRank: number | null;
  vatNumber: string | null;
  website: string | null;
  inventoryCode: string | null;
  belongToCompany: string | null;
  belongToCompanyIds: number[];
  journalName: string | null;
  journalNameIds: number[];
};

function getOdooConfig(): OdooAuthConfig {
  const url = process.env.ODOO_URL;
  const database = process.env.ODOO_DATABASE;
  const username = process.env.ODOO_USERNAME;
  const password = process.env.ODOO_PASSWORD;

  if (!url || !database || !username || !password) {
    throw new Error("Odoo configuration environment variables are missing");
  }

  return {
    url,
    database,
    username,
    password
  };
}

export async function authenticateWithOdoo(): Promise<number> {
  const config = getOdooConfig();
  const url = new URL(config.url);
  const isSecure = url.protocol === "https:";
  
  const client = isSecure 
    ? (await import("xmlrpc")).createSecureClient({ host: url.hostname, port: 443, path: "/xmlrpc/2/common" })
    : (await import("xmlrpc")).createClient({ host: url.hostname, port: 80, path: "/xmlrpc/2/common" });

  const uid = await new Promise<number>((resolve, reject) => {
    client.methodCall(
      "authenticate",
      [config.database, config.username, config.password, {}],
      (error: unknown, value: unknown) => {
        if (error) {
          reject(error);
          return;
        }

        if (typeof value !== "number") {
          reject(new Error("Unexpected authenticate response from Odoo"));
          return;
        }

        resolve(value);
      }
    );
  });

  if (!uid) {
    throw new Error("Odoo authentication failed");
  }

  return uid;
}

export async function getOdooServerVersion(): Promise<string> {
  const config = getOdooConfig();
  const url = new URL(config.url);
  const isSecure = url.protocol === "https:";

  const client = isSecure 
    ? (await import("xmlrpc")).createSecureClient({ host: url.hostname, port: 443, path: "/xmlrpc/2/common" })
    : (await import("xmlrpc")).createClient({ host: url.hostname, port: 80, path: "/xmlrpc/2/common" });

  const versionInfo = await new Promise<unknown>((resolve, reject) => {
    client.methodCall("version", [], (error: unknown, value: unknown) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(value);
    });
  });

  if (
    !versionInfo ||
    typeof versionInfo !== "object" ||
    !("server_version" in versionInfo) ||
    typeof (versionInfo as { server_version: unknown }).server_version !==
      "string"
  ) {
    throw new Error("Unexpected version response from Odoo");
  }

  return (versionInfo as { server_version: string }).server_version;
}

async function getNamesMap(
  client: any,
  config: OdooAuthConfig,
  uid: number,
  model: string,
  ids: number[]
): Promise<Record<number, string>> {
  if (ids.length === 0) return {};

  return new Promise((resolve, reject) => {
    client.methodCall(
      "execute_kw",
      [
        config.database,
        uid,
        config.password,
        model,
        "read",
        [ids],
        { fields: ["name"] }
      ],
      (error: unknown, value: unknown) => {
        if (error) {
          reject(error);
          return;
        }
        if (!Array.isArray(value)) {
          resolve({});
          return;
        }
        const map: Record<number, string> = {};
        for (const item of value) {
          if (
            item &&
            typeof item === "object" &&
            "id" in item &&
            "name" in item
          ) {
            map[(item as any).id] = (item as any).name;
          }
        }
        resolve(map);
      }
    );
  });
}

export type CreateContactParams = {
  name: string;
  address?: string;
  email?: string;
  phone?: string;
  supplierRank?: number;
  customerRank?: number;
  invCode?: string;
  belongToCompanyIds?: number[];
  journalNameIds?: number[];
  isCompany?: boolean;
};

export async function createOdooContact(
  params: CreateContactParams
): Promise<number> {
  const config = getOdooConfig();
  const uid = await authenticateWithOdoo();

  const client = (await import("xmlrpc")).createClient({
    url: `${config.url}/xmlrpc/2/object`
  });

  return new Promise((resolve, reject) => {
    const record: Record<string, unknown> = {
      name: params.name
    };

    if (params.isCompany) {
      record.company_type = "company";
      record.is_company = true;
    } else {
      record.company_type = "person";
      record.is_company = false;
    }

    if (params.address) record.street = params.address;
    if (params.email) record.email = params.email;
    if (params.phone) record.phone = params.phone;
    if (typeof params.supplierRank === "number")
      record.supplier_rank = params.supplierRank;
    if (typeof params.customerRank === "number")
      record.customer_rank = params.customerRank;
    if (params.invCode) record.x_studio_inv_code = params.invCode;

    if (
      Array.isArray(params.belongToCompanyIds) &&
      params.belongToCompanyIds.length > 0
    ) {
      record.x_studio_belong_to_company = [[6, 0, params.belongToCompanyIds]];
    }

    if (
      Array.isArray(params.journalNameIds) &&
      params.journalNameIds.length > 0
    ) {
      record.x_studio_journal_name = [[6, 0, params.journalNameIds]];
    }

    client.methodCall(
      "execute_kw",
      [
        config.database,
        uid,
        config.password,
        "res.partner",
        "create",
        [record]
      ],
      (error: unknown, value: unknown) => {
        if (error) {
          reject(error);
          return;
        }

        if (typeof value !== "number") {
          reject(new Error("Unexpected create response from Odoo"));
          return;
        }

        resolve(value);
      }
    );
  });
}


export async function getOdooJournals(): Promise<{ id: number; name: string }[]> {
  const config = getOdooConfig();
  const uid = await authenticateWithOdoo();
  const url = new URL(config.url);
  const isSecure = url.protocol === "https:";

  const client = isSecure 
    ? (await import("xmlrpc")).createSecureClient({ host: url.hostname, port: 443, path: "/xmlrpc/2/object" })
    : (await import("xmlrpc")).createClient({ host: url.hostname, port: 80, path: "/xmlrpc/2/object" });

  return new Promise((resolve, reject) => {
    client.methodCall(
      "execute_kw",
      [
        config.database,
        uid,
        config.password,
        "account.journal",
        "search_read",
        [[]],
        { fields: ["name", "display_name"], limit: 100 }
      ],
      (error: unknown, value: unknown) => {
        if (error) {
          reject(error);
          return;
        }
        if (!Array.isArray(value)) {
          resolve([]);
          return;
        }
        const journals = value
          .map((item: any) => ({
            id: item.id,
            name: item.display_name || item.name
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        resolve(journals);
      }
    );
  });
}


export async function getOdooCompanies(): Promise<{ id: number; name: string }[]> {
  const config = getOdooConfig();
  const uid = await authenticateWithOdoo();
  const url = new URL(config.url);
  const isSecure = url.protocol === "https:";

  const client = isSecure 
    ? (await import("xmlrpc")).createSecureClient({ host: url.hostname, port: 443, path: "/xmlrpc/2/object" })
    : (await import("xmlrpc")).createClient({ host: url.hostname, port: 80, path: "/xmlrpc/2/object" });

  return new Promise((resolve, reject) => {
    client.methodCall(
      "execute_kw",
      [
        config.database,
        uid,
        config.password,
        "res.company",
        "search_read",
        [[]],
        { fields: ["name"], limit: 100 }
      ],
      (error: unknown, value: unknown) => {
        if (error) {
          reject(error);
          return;
        }
        if (!Array.isArray(value)) {
          resolve([]);
          return;
        }
        const companies = value
          .map((item: any) => ({
            id: item.id,
            name: item.name
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        resolve(companies);
      }
    );
  });
}

export async function getJournalIdsByNameAndCompany(
  name: string,
  companyIds: number[]
): Promise<number[]> {
  if (!Array.isArray(companyIds) || companyIds.length === 0) {
    return [];
  }

  const config = getOdooConfig();
  const uid = await authenticateWithOdoo();
  const url = new URL(config.url);
  const isSecure = url.protocol === "https:";

  const client = isSecure 
    ? (await import("xmlrpc")).createSecureClient({ host: url.hostname, port: 443, path: "/xmlrpc/2/object" })
    : (await import("xmlrpc")).createClient({ host: url.hostname, port: 80, path: "/xmlrpc/2/object" });

  const domain = [
    ["name", "ilike", name],
    ["company_id", "in", companyIds]
  ];

  const result = await new Promise<unknown>((resolve, reject) => {
    client.methodCall(
      "execute_kw",
      [
        config.database,
        uid,
        config.password,
        "account.journal",
        "search_read",
        [domain],
        { fields: ["id"], limit: 200 }
      ],
      (error: unknown, value: unknown) => {
        if (error) {
          console.error("Odoo search_read error:", error);
          reject(error);
          return;
        }
        console.log("Odoo search_read result:", value);
        resolve(value);
      }
    );
  });

  if (!Array.isArray(result)) {
    return [];
  }

  const ids: number[] = [];
  for (const item of result) {
    if (item && typeof item === "object" && "id" in item) {
      const id = (item as any).id;
      if (typeof id === "number") {
        ids.push(id);
      }
    }
  }
  return ids;
}

export async function getOdooContacts(limit?: number): Promise<OdooContact[]> {
  const config = getOdooConfig();
  const uid = await authenticateWithOdoo();

  const client = (await import("xmlrpc")).createClient({
    url: `${config.url}/xmlrpc/2/object`
  });

  const rawContacts = await new Promise<unknown>((resolve, reject) => {
    const searchOptions: Record<string, unknown> = {
      fields: [
        "name",
        "email",
        "phone",
        "mobile",
        "company_type",
        "street",
        "street2",
        "city",
        "zip",
        "state_id",
        "country_id",
        "supplier_rank",
        "customer_rank",
        "vat",
        "website",
        "x_studio_inv_code",
        "x_studio_belong_to_company",
        "x_studio_journal_name"
      ],
      limit: typeof limit === "number" ? limit : 0
    };

    client.methodCall(
      "execute_kw",
      [
        config.database,
        uid,
        config.password,
        "res.partner",
        "search_read",
        [[]],
        searchOptions
      ],
      (error: unknown, value: unknown) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(value);
      }
    );
  });

  if (!Array.isArray(rawContacts)) {
    throw new Error("Unexpected contacts response from Odoo");
  }

  // Collect IDs for secondary fetch
  const companyIds = new Set<number>();
  const journalIds = new Set<number>();

  rawContacts.forEach((item: any) => {
    const companies = item.x_studio_belong_to_company;
    if (Array.isArray(companies)) {
      companies.forEach((id: any) => {
        if (typeof id === "number") companyIds.add(id);
      });
    }

    const journals = item.x_studio_journal_name;
    if (Array.isArray(journals)) {
      journals.forEach((id: any) => {
        if (typeof id === "number") journalIds.add(id);
      });
    }
  });

  const companyMap = await getNamesMap(
    client,
    config,
    uid,
    "res.company",
    Array.from(companyIds)
  );

  const journalMap = await getNamesMap(
    client,
    config,
    uid,
    "account.journal",
    Array.from(journalIds)
  );

  const contacts: OdooContact[] = rawContacts
    .map((item) => {
      const record =
        item && typeof item === "object"
          ? (item as Record<string, unknown>)
          : {};

      const idValue = record.id;
      const nameValue = record.name;

      if (typeof idValue !== "number" || typeof nameValue !== "string") {
        return null;
      }

      const emailValue = record.email;
      const phoneValue = record.phone;
      const mobileValue = record.mobile;
      const companyTypeValue = record.company_type;
      const streetValue = record.street;
      const streetTwoValue = record.street2;
      const cityValue = record.city;
      const zipValue = record.zip;
      const stateValue = record.state_id;
      const countryValue = record.country_id;
      const supplierRankValue = record.supplier_rank;
      const customerRankValue = record.customer_rank;
      const vatValue = record.vat;
      const websiteValue = record.website;
      const inventoryCodeValue = record.x_studio_inv_code;
      const belongToCompanyValue = record.x_studio_belong_to_company;
      const journalNameValue = record.x_studio_journal_name;

      const stateName =
        Array.isArray(stateValue) && typeof stateValue[1] === "string"
          ? stateValue[1]
          : null;

      const countryName =
        Array.isArray(countryValue) && typeof countryValue[1] === "string"
          ? countryValue[1]
          : null;

      // Map IDs to Names for Many2many fields
      let belongToCompany: string | null = null;
      let belongToCompanyIds: number[] = [];
      if (Array.isArray(belongToCompanyValue)) {
        belongToCompanyIds = belongToCompanyValue.filter(
          (id) => typeof id === "number"
        );
        const names = belongToCompanyIds
          .map((id) => companyMap[id])
          .filter((name) => !!name);
        if (names.length > 0) {
          belongToCompany = names.join(", ");
        }
      } else if (typeof belongToCompanyValue === "string") {
         belongToCompany = belongToCompanyValue;
      }

      let journalName: string | null = null;
      let journalNameIds: number[] = [];
      if (Array.isArray(journalNameValue)) {
        journalNameIds = journalNameValue.filter(
          (id) => typeof id === "number"
        );
        const names = journalNameIds
          .map((id) => journalMap[id])
          .filter((name) => !!name);
        if (names.length > 0) {
          journalName = names.join(", ");
        }
      } else if (typeof journalNameValue === "string") {
         journalName = journalNameValue;
      }

      const addressParts: string[] = [];

      if (typeof streetValue === "string" && streetValue.trim() !== "") {
        addressParts.push(streetValue);
      }

      if (typeof streetTwoValue === "string" && streetTwoValue.trim() !== "") {
        addressParts.push(streetTwoValue);
      }

      if (typeof cityValue === "string" && cityValue.trim() !== "") {
        addressParts.push(cityValue);
      }

      if (typeof zipValue === "string" && zipValue.trim() !== "") {
        addressParts.push(zipValue);
      }

      if (stateName) {
        addressParts.push(stateName);
      }

      if (countryName) {
        addressParts.push(countryName);
      }

      const address = addressParts.length > 0 ? addressParts.join(", ") : null;

      return {
        id: idValue,
        name: nameValue,
        email: typeof emailValue === "string" ? emailValue : null,
        phone: typeof phoneValue === "string" ? phoneValue : null,
        mobile: typeof mobileValue === "string" ? mobileValue : null,
        companyType:
          typeof companyTypeValue === "string" ? companyTypeValue : null,
        address,
        city: typeof cityValue === "string" ? cityValue : null,
        state: stateName,
        country: countryName,
        postalCode: typeof zipValue === "string" ? zipValue : null,
        supplierRank:
          typeof supplierRankValue === "number" ? supplierRankValue : null,
        customerRank:
          typeof customerRankValue === "number" ? customerRankValue : null,
        vatNumber: typeof vatValue === "string" ? vatValue : null,
        website: typeof websiteValue === "string" ? websiteValue : null,
        inventoryCode:
          typeof inventoryCodeValue === "string" ? inventoryCodeValue : null,
        belongToCompany,
        belongToCompanyIds,
        journalName,
        journalNameIds
      };
    })
    .filter((contact): contact is OdooContact => contact !== null);

  return contacts;
}

export async function getOdooContactById(id: number): Promise<OdooContact | null> {
  const config = getOdooConfig();
  const uid = await authenticateWithOdoo();

  const client = (await import("xmlrpc")).createClient({
    url: `${config.url}/xmlrpc/2/object`
  });

  const searchOptions: Record<string, unknown> = {
    fields: [
      "name",
      "email",
      "phone",
      "mobile",
      "company_type",
      "street",
      "street2",
      "city",
      "zip",
      "state_id",
      "country_id",
      "supplier_rank",
      "customer_rank",
      "vat",
      "website",
      "x_studio_inv_code",
      "x_studio_belong_to_company",
      "x_studio_journal_name"
    ],
    limit: 1
  };

  const rawContacts = await new Promise<unknown>((resolve, reject) => {
    client.methodCall(
      "execute_kw",
      [
        config.database,
        uid,
        config.password,
        "res.partner",
        "search_read",
        [[["id", "=", id]]],
        searchOptions
      ],
      (error: unknown, value: unknown) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(value);
      }
    );
  });

  if (!Array.isArray(rawContacts) || rawContacts.length === 0) {
    return null;
  }

  const item = rawContacts[0];
  
  // Secondary fetches for names
  const companyIds: number[] = [];
  const journalIds: number[] = [];

  const companies = item.x_studio_belong_to_company;
  if (Array.isArray(companies)) {
    companies.forEach((cid: any) => {
      if (typeof cid === "number") companyIds.push(cid);
    });
  }

  const journals = item.x_studio_journal_name;
  if (Array.isArray(journals)) {
    journals.forEach((jid: any) => {
      if (typeof jid === "number") journalIds.push(jid);
    });
  }

  const [companyMap, journalMap] = await Promise.all([
    getNamesMap(client, config, uid, "res.company", companyIds),
    getNamesMap(client, config, uid, "account.journal", journalIds)
  ]);

  const record = item as Record<string, unknown>;
  const idValue = record.id;
  const nameValue = record.name;

  if (typeof idValue !== "number" || typeof nameValue !== "string") {
    return null;
  }

  const emailValue = record.email;
  const phoneValue = record.phone;
  const mobileValue = record.mobile;
  const companyTypeValue = record.company_type;
  const streetValue = record.street;
  const streetTwoValue = record.street2;
  const cityValue = record.city;
  const zipValue = record.zip;
  const stateValue = record.state_id;
  const countryValue = record.country_id;
  const supplierRankValue = record.supplier_rank;
  const customerRankValue = record.customer_rank;
  const vatValue = record.vat;
  const websiteValue = record.website;
  const inventoryCodeValue = record.x_studio_inv_code;
  const belongToCompanyValue = record.x_studio_belong_to_company;
  const journalNameValue = record.x_studio_journal_name;

  const stateName =
    Array.isArray(stateValue) && typeof stateValue[1] === "string"
      ? stateValue[1]
      : null;

  const countryName =
    Array.isArray(countryValue) && typeof countryValue[1] === "string"
      ? countryValue[1]
      : null;

  let belongToCompany: string | null = null;
  let belongToCompanyIds: number[] = [];
  if (Array.isArray(belongToCompanyValue)) {
    belongToCompanyIds = belongToCompanyValue.filter(
      (id) => typeof id === "number"
    );
    const names = belongToCompanyIds
      .map((id) => companyMap[id])
      .filter((name) => !!name);
    if (names.length > 0) {
      belongToCompany = names.join(", ");
    }
  }

  let journalName: string | null = null;
  let journalNameIds: number[] = [];
  if (Array.isArray(journalNameValue)) {
    journalNameIds = journalNameValue.filter(
      (id) => typeof id === "number"
    );
    const names = journalNameIds
      .map((id) => journalMap[id])
      .filter((name) => !!name);
    if (names.length > 0) {
      journalName = names.join(", ");
    }
  }

  const addressParts: string[] = [];
  if (typeof streetValue === "string" && streetValue.trim() !== "") addressParts.push(streetValue);
  if (typeof streetTwoValue === "string" && streetTwoValue.trim() !== "") addressParts.push(streetTwoValue);
  if (typeof cityValue === "string" && cityValue.trim() !== "") addressParts.push(cityValue);
  if (typeof zipValue === "string" && zipValue.trim() !== "") addressParts.push(zipValue);
  if (stateName) addressParts.push(stateName);
  if (countryName) addressParts.push(countryName);

  const address = addressParts.length > 0 ? addressParts.join(", ") : null;

  return {
    id: idValue,
    name: nameValue,
    email: typeof emailValue === "string" ? emailValue : null,
    phone: typeof phoneValue === "string" ? phoneValue : null,
    mobile: typeof mobileValue === "string" ? mobileValue : null,
    companyType: typeof companyTypeValue === "string" ? companyTypeValue : null,
    address,
    city: typeof cityValue === "string" ? cityValue : null,
    state: stateName,
    country: countryName,
    postalCode: typeof zipValue === "string" ? zipValue : null,
    supplierRank: typeof supplierRankValue === "number" ? supplierRankValue : null,
    customerRank: typeof customerRankValue === "number" ? customerRankValue : null,
    vatNumber: typeof vatValue === "string" ? vatValue : null,
    website: typeof websiteValue === "string" ? websiteValue : null,
    inventoryCode: typeof inventoryCodeValue === "string" ? inventoryCodeValue : null,
    belongToCompany,
    belongToCompanyIds,
    journalName,
    journalNameIds
  };
}

export async function searchOdooContactByName(
  name: string
): Promise<OdooContact | null> {
  console.log(`[searchOdooContactByName] Searching for: "${name}"`);
  const config = getOdooConfig();
  const uid = await authenticateWithOdoo();
  const url = new URL(config.url);
  const isSecure = url.protocol === "https:";

  const client = isSecure
    ? (await import("xmlrpc")).createSecureClient({ host: url.hostname, port: 443, path: "/xmlrpc/2/object" })
    : (await import("xmlrpc")).createClient({ host: url.hostname, port: 80, path: "/xmlrpc/2/object" });

  const searchOptions: Record<string, unknown> = {
    fields: [
      "name",
      "email",
      "phone",
      "mobile",
      "company_type",
      "street",
      "street2",
      "city",
      "zip",
      "state_id",
      "country_id",
      "supplier_rank",
      "customer_rank",
      "vat",
      "website",
      "x_studio_inv_code",
      "x_studio_belong_to_company",
      "x_studio_journal_name"
    ],
    limit: 1
  };

  const rawContacts = await new Promise<unknown>((resolve, reject) => {
    client.methodCall(
      "execute_kw",
      [
        config.database,
        uid,
        config.password,
        "res.partner",
        "search_read",
        [[["name", "ilike", name.trim()]]],
        searchOptions
      ],
      (error: unknown, value: unknown) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(value);
      }
    );
  });

  if (!Array.isArray(rawContacts) || rawContacts.length === 0) {
    return null;
  }

  const item = rawContacts[0];
  const record = item as Record<string, unknown>;

  // Extract IDs
  const belongToCompanyIds: number[] = [];
  if (Array.isArray(record.x_studio_belong_to_company)) {
    record.x_studio_belong_to_company.forEach((id: any) => {
      if (typeof id === "number") belongToCompanyIds.push(id);
    });
  }

  const journalNameIds: number[] = [];
  if (Array.isArray(record.x_studio_journal_name)) {
    record.x_studio_journal_name.forEach((id: any) => {
      if (typeof id === "number") journalNameIds.push(id);
    });
  }

  // Return minimal object needed for logic, or fetch full details if we want consistency
  // For this task, we mainly need the IDs to update. 
  // Returning full object would require extra RPC calls for names map.
  // Let's return a partial object that satisfies the type for the fields we have, and null for others
  
  return {
    id: record.id as number,
    name: record.name as string,
    email: record.email as string || null,
    phone: record.phone as string || null,
    mobile: record.mobile as string || null,
    companyType: record.company_type as string || null,
    address: null, // Skipping address formatting for efficiency
    city: record.city as string || null,
    state: null,
    country: null,
    postalCode: record.zip as string || null,
    supplierRank: record.supplier_rank as number || null,
    customerRank: record.customer_rank as number || null,
    vatNumber: record.vat as string || null,
    website: record.website as string || null,
    inventoryCode: record.x_studio_inv_code as string || null,
    belongToCompany: null, // Skipping name resolution
    belongToCompanyIds,
    journalName: null, // Skipping name resolution
    journalNameIds
  };
}

export async function updateOdooContact(
  id: number,
  params: Partial<CreateContactParams>
): Promise<boolean> {
  const config = getOdooConfig();
  const uid = await authenticateWithOdoo();

  const client = (await import("xmlrpc")).createClient({
    url: `${config.url}/xmlrpc/2/object`
  });

  return new Promise((resolve, reject) => {
    const record: Record<string, unknown> = {};

    if (params.name) record.name = params.name;
    if (params.isCompany !== undefined) {
      if (params.isCompany) {
        record.company_type = "company";
        record.is_company = true;
      } else {
        record.company_type = "person";
        record.is_company = false;
      }
    }
    if (params.address !== undefined) record.street = params.address;
    if (params.email !== undefined) record.email = params.email;
    if (params.phone !== undefined) record.phone = params.phone;
    if (typeof params.supplierRank === "number")
      record.supplier_rank = params.supplierRank;
    if (typeof params.customerRank === "number")
      record.customer_rank = params.customerRank;
    if (params.invCode !== undefined) record.x_studio_inv_code = params.invCode;

    if (Array.isArray(params.belongToCompanyIds)) {
      record.x_studio_belong_to_company = [[6, 0, params.belongToCompanyIds]];
    }

    if (Array.isArray(params.journalNameIds)) {
      record.x_studio_journal_name = [[6, 0, params.journalNameIds]];
    }

    if (Object.keys(record).length === 0) {
      resolve(true);
      return;
    }

    client.methodCall(
      "execute_kw",
      [
        config.database,
        uid,
        config.password,
        "res.partner",
        "write",
        [[id], record]
      ],
      (error: unknown, value: unknown) => {
        if (error) {
          reject(error);
          return;
        }

        if (typeof value !== "boolean") {
          reject(new Error("Unexpected update response from Odoo"));
          return;
        }

        resolve(value);
      }
    );
  });
}

export async function deleteOdooContact(id: number): Promise<boolean> {
  const config = getOdooConfig();
  const uid = await authenticateWithOdoo();

  const client = (await import("xmlrpc")).createClient({
    url: `${config.url}/xmlrpc/2/object`
  });

  return new Promise((resolve, reject) => {
    client.methodCall(
      "execute_kw",
      [
        config.database,
        uid,
        config.password,
        "res.partner",
        "unlink",
        [[id]]
      ],
      (error: unknown, value: unknown) => {
        if (error) {
          reject(error);
          return;
        }

        if (typeof value !== "boolean") {
          reject(new Error("Unexpected delete response from Odoo"));
          return;
        }

        resolve(value);
      }
    );
  });
}
