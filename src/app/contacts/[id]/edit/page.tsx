import { getOdooCompanies, getOdooContactById } from "@/lib/odooClient";
import EditContactForm from "@/components/EditContactForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditContactPage({
  params
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const [contact, companies] = await Promise.all([
    getOdooContactById(id),
    getOdooCompanies()
  ]);

  if (!contact) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          Edit Contact: {contact.name}
        </h1>
        <EditContactForm companies={companies} contact={contact} />
      </div>
    </div>
  );
}
