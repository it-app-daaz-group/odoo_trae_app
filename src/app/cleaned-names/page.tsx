import { getOdooContacts } from "@/lib/odooClient";
import { cleanNameForComparison } from "@/lib/stringUtils";

export default async function CleanedNamesPage() {
  const contacts = await getOdooContacts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cleaned Contact Names</h1>
      <div className="bg-white shadow-md rounded-lg">
        <ul className="divide-y divide-gray-200">
          {contacts.map((contact) => (
            <li key={contact.id} className="p-4 flex justify-between items-center">
              <span className="text-gray-500 font-medium">{contact.name}</span>
              <span className="text-gray-900 font-bold">{cleanNameForComparison(contact.name)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
