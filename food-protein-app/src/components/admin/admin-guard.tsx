"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { clearSession, getSession, getSessionRaw, subscribeSession } from "@/lib/admin/session";
import { adminBrowserSupabase } from "@/lib/admin/supabase-browser";

export function useAdminSession() {
  const raw = useSyncExternalStore(subscribeSession, getSessionRaw, () => "");
  const session = useMemo(() => {
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return getSession();
    }
  }, [raw]);

  return { session, isLoading: false };
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { session, isLoading } = useAdminSession();

  const isLoginRoute = useMemo(() => pathname === "/admin/login", [pathname]);

  useEffect(() => {
    if (isLoading) return;

    if (session) {
      adminBrowserSupabase.auth.getSession().then(({ data }) => {
        if (!data.session) {
          clearSession();
          router.replace("/admin/login");
        }
      });
    }

    if (!session && !isLoginRoute) {
      router.replace("/admin/login");
      return;
    }

    if (session && isLoginRoute) {
      router.replace("/admin");
    }
  }, [isLoading, session, isLoginRoute, router]);

  if (!session && !isLoginRoute) return null;
  return <>{children}</>;
}
