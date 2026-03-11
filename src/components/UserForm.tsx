'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Company {
  ID: number;
  Name: string;
}

interface UserFormProps {
  id?: number;
}

export default function UserForm({ id }: UserFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    companyIds: [] as number[],
    isCustomer: false,
    isVendor: false,
  });

  useEffect(() => {
    fetchCompanies();
    if (id) fetchUser();
  }, [id]);

  async function fetchCompanies() {
    const res = await fetch("/api/odoo/companies");
    const data = await res.json();
    if (data.success) setCompanies(data.data);
  }

  async function fetchUser() {
    const res = await fetch(`/api/odoo/users/${id}`);
    const data = await res.json();
    if (data.success) {
      const user = data.data;
      setFormData({
        name: user.name,
        username: user.username,
        password: "", // Don't show password
        companyIds: user.companies.map((c: any) => c.id),
        isCustomer: user.isCustomer,
        isVendor: user.isVendor,
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(id ? `/api/odoo/users/${id}` : "/api/odoo/users", {
        method: id ? "PUT" : "POST",
        body: JSON.stringify(formData),
      });
      if (res.ok) router.push("/users");
    } catch (error) {
      console.error("Failed to save user:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleCompanyToggle(compId: number) {
    setFormData(prev => ({
      ...prev,
      companyIds: prev.companyIds.includes(compId)
        ? prev.companyIds.filter(id => id !== compId)
        : [...prev.companyIds, compId]
    }));
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">{id ? "Edit User" : "Add New User"}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition"
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required={!id}
              placeholder={id ? "Leave empty to keep current" : ""}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Allowed Companies</label>
            <div className="grid grid-cols-2 gap-3 border border-slate-200 p-4 rounded-lg bg-slate-50 max-h-48 overflow-y-auto">
              {companies.map(comp => (
                <label key={comp.ID} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-white rounded transition">
                  <input
                    type="checkbox"
                    checked={formData.companyIds.includes(comp.ID)}
                    onChange={() => handleCompanyToggle(comp.ID)}
                    className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{comp.Name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-8 border-t border-slate-100 pt-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.isCustomer}
                onChange={e => setFormData({ ...formData, isCustomer: e.target.checked })}
                className="w-5 h-5 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="text-slate-700 font-medium group-hover:text-blue-600 transition">Customer</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.isVendor}
                onChange={e => setFormData({ ...formData, isVendor: e.target.checked })}
                className="w-5 h-5 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <span className="text-slate-700 font-medium group-hover:text-blue-600 transition">Vendor</span>
            </label>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition shadow-sm"
          >
            {loading ? "Saving..." : id ? "Update User" : "Create User"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/users")}
            className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
