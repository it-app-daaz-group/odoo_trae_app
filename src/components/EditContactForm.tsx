"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { OdooContact } from "@/lib/odooClient";

interface EditContactFormProps {
  companies: { id: number; name: string }[];
  contact: OdooContact;
}

export default function EditContactForm({
  companies,
  contact
}: EditContactFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialPartnerType =
    (contact.supplierRank ?? 0) > 0 ? "vendor" : "customer";

  const [partnerType, setPartnerType] = useState<"vendor" | "customer">(
    initialPartnerType
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const belongToCompanyIds = formData
      .getAll("belongToCompanyIds")
      .map((v) => Number(v));

    const supplierRank = partnerType === "vendor" ? 1 : 0;
    const customerRank = partnerType === "customer" ? 1 : 0;

    const data = {
      name: formData.get("name"),
      address: formData.get("address"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      supplierRank,
      customerRank,
      invCode: formData.get("invCode"),
      belongToCompanyIds,
      isCompany: true
    };

    try {
      const res = await fetch(`/api/odoo/contacts/${contact.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update contact");
      }

      router.push("/contacts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          defaultValue={contact.name}
          required
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
        />
      </div>

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-slate-700"
        >
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          defaultValue={contact.address || ""}
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={contact.email || ""}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700"
          >
            Phone
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            defaultValue={contact.phone || contact.mobile || ""}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">
          Partner Type
        </label>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <input
              id="type-customer"
              name="partnerType"
              type="radio"
              checked={partnerType === "customer"}
              onChange={() => setPartnerType("customer")}
              className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="type-customer"
              className="ml-3 block text-sm font-medium text-slate-700"
            >
              Customer
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="type-vendor"
              name="partnerType"
              type="radio"
              checked={partnerType === "vendor"}
              onChange={() => setPartnerType("vendor")}
              className="h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="type-vendor"
              className="ml-3 block text-sm font-medium text-slate-700"
            >
              Vendor
            </label>
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="invCode"
          className="block text-sm font-medium text-slate-700"
        >
          Inv Code
        </label>
        <input
          type="text"
          name="invCode"
          id="invCode"
          defaultValue={contact.inventoryCode || ""}
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
        />
      </div>

      <div>
        <label
          htmlFor="belongToCompanyIds"
          className="block text-sm font-medium text-slate-700"
        >
          Belong to Company (Hold Ctrl/Cmd to select multiple)
        </label>
        <select
          multiple
          name="belongToCompanyIds"
          id="belongToCompanyIds"
          defaultValue={contact.belongToCompanyIds?.map(String) || []}
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border h-32"
        >
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="mr-3 px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
