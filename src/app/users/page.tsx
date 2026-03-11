'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  username: string;
  isCustomer: boolean;
  isVendor: boolean;
  companies: {
    id: number;
    name: string;
  }[];
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch("/api/odoo/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/odoo/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Master Users</h1>
        <Link
          href="/users/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add User
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 font-semibold text-slate-700">Name</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Username</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Allowed Companies</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Roles</th>
              <th className="px-6 py-4 font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
            ) : users.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-4 text-center">No users found</td></tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 hover:bg-blue-50 transition">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4 text-slate-600">@{user.username}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.companies.map(c => (
                        <span key={c.id} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">
                          {c.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {user.isCustomer && <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Customer</span>}
                      {user.isVendor && <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-medium">Vendor</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link href={`/users/${user.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                      <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
