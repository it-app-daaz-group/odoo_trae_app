'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { OdooContact } from "@/lib/odooClient";

type ContactsTableProps = {
  contacts: OdooContact[];
};

export default function ContactsTable({ contacts }: ContactsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const companyContacts = contacts.filter((contact) => contact.companyType === "company");

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this contact?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/odoo/contacts/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        throw new Error("Failed to delete contact");
      }

      // Refresh the page to show the updated list
      router.refresh();
    } catch (error) {
      alert("Error deleting contact");
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-slate-700">
        <thead className="bg-slate-50">
          <tr className="h-14">
            <th className="px-4 py-3 text-left font-semibold text-slate-900">Number</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-900">Name</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-900">Address</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-900">Email</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-900">Phone</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-900">Supplier Rank</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-900">Customer Rank</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-900">Inv Code</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-900">Belong to Company</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-900">Journal Name</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-900">Type</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companyContacts.map((contact: OdooContact, index: number) => (
            <tr key={contact.id} className="h-14 border-b border-slate-100 hover:bg-blue-50">
              <td className="px-4">{index + 1}</td>
              <td className="px-4"><span className="font-medium text-slate-900">{contact.name}</span></td>
              <td className="px-4">{contact.address ?? <span className="text-slate-400">-</span>}</td>
              <td className="px-4">{contact.email ?? <span className="text-slate-400">-</span>}</td>
              <td className="px-4">{contact.phone ?? contact.mobile ?? <span className="text-slate-400">-</span>}</td>
              <td className="px-4">{contact.supplierRank ?? <span className="text-slate-400">-</span>}</td>
              <td className="px-4">{contact.customerRank ?? <span className="text-slate-400">-</span>}</td>
              <td className="px-4">{contact.inventoryCode ?? <span className="text-slate-400">-</span>}</td>
              <td className="px-4">{contact.belongToCompany ?? <span className="text-slate-400">-</span>}</td>
              <td className="px-4">{contact.journalName ?? <span className="text-slate-400">-</span>}</td>
              <td className="px-4">{contact.companyType ?? <span className="text-slate-400">-</span>}</td>
              <td className="px-4">
                <div className="flex items-center space-x-3">
                  <Link href={`/contacts/${contact.id}/edit`} className="text-blue-600 hover:text-blue-900 font-medium">Edit</Link>
                  <button onClick={() => handleDelete(contact.id)} disabled={deletingId === contact.id} className="text-red-600 hover:text-red-900 font-medium disabled:opacity-50">
                    {deletingId === contact.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {companyContacts.length === 0 && (
            <tr className="h-14">
              <td colSpan={12} className="px-4 text-slate-500 text-center">No contacts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
