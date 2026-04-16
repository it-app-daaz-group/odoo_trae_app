import ChangePasswordForm from "@/components/ChangePasswordForm";

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-xl px-4 py-8">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Account</h1>
          <p className="text-slate-500 mb-6">Ubah password akun Anda.</p>
          <ChangePasswordForm />
        </div>
      </div>
    </main>
  );
}

