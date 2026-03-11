import { getOdooContacts } from "@/lib/odooClient";
import Link from "next/link";
import ContactsTable from "@/components/ContactsTable";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const contacts = await getOdooContacts();
  // Pass all contacts, filtering is handled in client component if needed, 
  // or we can filter here. The client component currently filters for companyType === "company".
  // So we can pass all contacts.

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[95%] px-4 py-8">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Contacts
            </h1>
            <Link
              href="/contacts/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium shadow-sm transition-colors"
            >
              Create Contact
            </Link>
          </div>
          <ContactsTable contacts={contacts} />
        </div>
      </div>
    </main>
  );
}
