"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("Konfirmasi password baru tidak sama");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok || !data?.success) {
        toast.error(data?.message || "Gagal mengubah password");
        return;
      }

      toast.success(data.message || "Password berhasil diubah");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch {
      toast.error("Gagal mengubah password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Password Lama
        </label>
        <input
          type="password"
          required
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Password Baru
        </label>
        <input
          type="password"
          required
          minLength={8}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Konfirmasi Password Baru
        </label>
        <input
          type="password"
          required
          minLength={8}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition shadow-sm"
        >
          {loading ? "Menyimpan..." : "Ubah Password"}
        </button>
      </div>
    </form>
  );
}

