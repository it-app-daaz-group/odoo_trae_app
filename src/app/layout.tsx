import "./globals.css";
import type { ReactNode } from "react";
import Link from "next/link";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions } from "@/lib/session";
import LogoutButton from "@/components/LogoutButton";
import { SessionData } from "./types/iron-session";
import { Toaster } from "react-hot-toast";

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout(props: RootLayoutProps) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const user = session.user;
  const isAdmin = user?.username === "admin";

  return (
    <html lang="en">
      <body className="flex bg-slate-50 min-h-screen text-slate-900">
        {user ? (
          <>
            <aside className="w-64 bg-white shadow-sm border-r border-slate-200 flex flex-col sticky top-0 h-screen">
              <div className="p-6 border-b border-slate-100">
                <h1 className="text-xl font-bold text-blue-600">Odoo Integration</h1>
                <p className="text-sm text-slate-500">Welcome, {user.name}</p>
              </div>
              <nav className="flex-1 py-4 overflow-y-auto">
                <ul className="space-y-1 px-3">
                  {isAdmin && (
                    <>
                      <li>
                        <Link href="/contacts" className="flex items-center p-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition group">
                          <span className="font-medium">All Contacts</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/cleaned-names" className="flex items-center p-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition group">
                          <span className="font-medium">Cleaned Names</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/users" className="flex items-center p-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition group">
                          <span className="font-medium">Master Users</span>
                        </Link>
                      </li>
                    </>
                  )}
                  {!isAdmin && (
                  <li>
                    <Link href="/contacts/create" className="flex items-center p-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition group">
                      <span className="font-medium">Create Contact</span>
                    </Link>
                  </li>
                  )}
                </ul>
              </nav>
              <div className="border-t border-slate-100">
                <LogoutButton />
              </div>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
              {props.children}
            </main>
          </>
        ) : (
          <main className="flex-1">
            {props.children}
          </main>
        )}
        <Toaster />
      </body>
    </html>
  );
}
