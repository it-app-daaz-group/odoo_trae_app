export default function ChangePasswordForm() {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        Password akun aplikasi sekarang mengikuti password akun Odoo.
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
        Untuk mengganti password, silakan ubah langsung dari akun Odoo Anda. Setelah password di Odoo berubah, password yang sama otomatis dipakai untuk login ke aplikasi ini.
      </div>
    </div>
  );
}
