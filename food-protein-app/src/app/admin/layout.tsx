"use client";

import { usePathname } from "next/navigation";
import { AdminGuard, useAdminSession } from "@/components/admin/admin-guard";
import { AdminShell } from "@/components/admin/admin-shell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { session } = useAdminSession();
  const isLogin = pathname === "/admin/login";

  return (
    <AdminGuard>
      {isLogin ? (
        children
      ) : session ? (
        <AdminShell role={session.role} email={session.email}>
          {children}
        </AdminShell>
      ) : null}
    </AdminGuard>
  );
}
