import CreateContactForm from "@/components/CreateContactForm";

export default function CreateContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          Create New Contact
        </h1>
        <CreateContactForm />
      </div>
    </div>
  );
}
