"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Company {
  ID: number;
  Name: string;
}

export default function CreateContactForm() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [user, setUser] = useState<{ username: string; isCustomer: boolean; isVendor: boolean } | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    customerRank: 0,
    supplierRank: 0,
    invCode: "",
    belongToCompanyIds: [] as number[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
    setFormData((prev) => ({ ...prev, belongToCompanyIds: values }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);

    console.log("Submitting data:", formData);
    try {
      const res = await fetch("/api/odoo/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();
      console.log("API Response:", responseData);

      if (!res.ok) {
        setError(responseData.message || "Failed to create contact");
        toast.error(responseData.message || "Failed to create contact");
        return;
      }

      toast.success(responseData.message);
      router.push("/contacts");
    } catch (error: any) {
      console.error("Submit error:", error);
      setError(error.message || "An unknown error occurred during submission.");
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [companiesRes, userRes] = await Promise.all([
          fetch("/api/form-data/companies"),
          fetch("/api/auth/me")
        ]);

        const companiesData = await companiesRes.json();
        const userData = await userRes.json();

        if (!companiesRes.ok) {
          throw new Error(companiesData.message || "Failed to fetch companies");
        }

        if (companiesData.success) {
          setCompanies(companiesData.data);
        }

        if (userData.success) {
          setUser(userData.user);
          const userObj = userData.user;

          const isAdmin = userObj.username === 'admin';
          let initialCustomerRank = 0;
          let initialSupplierRank = 0;

          if (isAdmin) {
            initialCustomerRank = 1; // Default for admin
          } else if (userObj.isCustomer && !userObj.isVendor) {
            initialCustomerRank = 1;
          } else if (!userObj.isCustomer && userObj.isVendor) {
            initialSupplierRank = 1;
          } else if (userObj.isCustomer && userObj.isVendor) {
            initialCustomerRank = 1; // Both allowed, default to customer
          }

          setFormData(prev => ({
            ...prev,
            customerRank: initialCustomerRank,
            supplierRank: initialSupplierRank
          }));
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setDataLoading(false);
      }
    }
    fetchData();
  }, []);

  if (dataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Name *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-slate-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Partner Type</label>
        <div className="mt-2 flex items-center space-x-6">
          {(user?.username === "admin" || user?.isCustomer) && (
            <div className="flex items-center">
              <input
                id="customer"
                name="partnerType"
                type="radio"
                checked={formData.customerRank === 1}
                onChange={() => setFormData({ ...formData, customerRank: 1, supplierRank: 0 })}
                className="h-4 w-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="customer" className="ml-3 block text-sm font-medium text-slate-700">
                Customer
              </label>
            </div>
          )}
          {(user?.username === "admin" || user?.isVendor) && (
            <div className="flex items-center">
              <input
                id="vendor"
                name="partnerType"
                type="radio"
                checked={formData.supplierRank === 1}
                onChange={() => setFormData({ ...formData, supplierRank: 1, customerRank: 0 })}
                className="h-4 w-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="vendor" className="ml-3 block text-sm font-medium text-slate-700">
                Vendor
              </label>
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="invCode" className="block text-sm font-medium text-slate-700">
          Inv Code
        </label>
        <input
          type="text"
          id="invCode"
          value={formData.invCode}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition"
        />
      </div>

      <div>
        <label htmlFor="belongToCompanyIds" className="block text-sm font-medium text-slate-700">
          Belong to Company (Hold Ctrl/Cmd to select multiple)
        </label>
        <select
          id="belongToCompanyIds"
          multiple
          value={formData.belongToCompanyIds.map(String)}
          onChange={handleCompanyChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-600 outline-none transition h-32"
        >
          {companies.map((company) => (
            <option key={company.ID} value={company.ID}>
              {company.Name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition shadow-sm"
        >
          {submitLoading ? "Creating..." : "Create Contact"}
        </button>
      </div>
    </form>
  );
}
