"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearSession } from "@/lib/admin/session";
import { adminBrowserSupabase } from "@/lib/admin/supabase-browser";

const items = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/scans", label: "Scan Monitoring" },
  { href: "/admin/food-database", label: "Food Database" },
  { href: "/admin/subscriptions", label: "Subscriptions" },
  { href: "/admin/analytics", label: "Analytics" },
];

interface AdminShellProps {
  role: string;
  email: string;
  children: React.ReactNode;
}

export function AdminShell({ role, email, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    adminBrowserSupabase.auth.signOut().finally(() => {
      clearSession();
      router.replace("/admin/login");
    });
  };

  return (
    <div className="min-h-screen bg-[#060B11] text-white">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 p-4 md:grid-cols-[230px_1fr] md:p-6">
        <aside className="rounded-2xl border border-cyan-300/20 bg-[#0A1119] p-4 md:p-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">ScanYourMeal</p>
            <h1 className="mt-2 text-xl font-semibold">Admin Panel</h1>
          </div>

          <nav className="mt-7 space-y-2">
            {items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 text-sm transition ${
                    active ? "bg-cyan-400/20 text-cyan-100" : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-lg border border-cyan-300/20 bg-cyan-300/5 p-3 text-xs">
            <p className="text-cyan-100/80">Signed in as</p>
            <p className="mt-1 font-medium text-white">{email}</p>
            <p className="mt-1 uppercase tracking-[0.16em] text-cyan-100/70">{role.replace("_", " ")}</p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="mt-4 w-full rounded-lg border border-red-300/30 px-3 py-2 text-sm text-red-200 hover:bg-red-500/10"
          >
            Logout
          </button>
        </aside>

        <main className="rounded-2xl border border-cyan-300/20 bg-[#0A1119] p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
