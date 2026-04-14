"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setSession } from "@/lib/admin/session";
import { fetchAdmin } from "@/lib/admin/client";
import { getAdminBrowserSupabase } from "@/lib/admin/supabase-browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("founder@scanyourmeal.app");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const finalizeAdminSession = useCallback(async () => {
    const profile = await fetchAdmin<{ email: string; role: "super_admin" | "admin" | "analyst" }>("/api/admin/me");

    setSession({
      email: profile.email,
      role: profile.role,
      loginAt: new Date().toISOString(),
    });

    router.replace("/admin");
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      const supabase = getAdminBrowserSupabase();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session || cancelled) return;

      try {
        setIsLoading(true);
        await finalizeAdminSession();
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [finalizeAdminSession]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setError("");
      setIsLoading(true);
      const supabase = getAdminBrowserSupabase();

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      await finalizeAdminSession();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const onGoogleSignIn = async () => {
    try {
      setError("");
      setIsGoogleLoading(true);
      const supabase = getAdminBrowserSupabase();
      const redirectTo = `${window.location.origin}/admin/login`;
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });

      if (oauthError) throw oauthError;
    } catch (err) {
      setError((err as Error).message);
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060B11] grid place-items-center p-6 text-white">
      <section className="w-full max-w-md rounded-2xl border border-cyan-300/25 bg-[#0A1119] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">ScanYourMeal</p>
        <h1 className="mt-2 text-2xl font-semibold">Admin Sign In</h1>
        <p className="mt-2 text-sm text-white/60">MVP auth flow for internal operations panel.</p>

        <button
          type="button"
          onClick={onGoogleSignIn}
          disabled={isGoogleLoading || isLoading}
          className="mt-6 w-full rounded-lg border border-white/25 px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/5 disabled:opacity-60"
        >
          {isGoogleLoading ? "Redirecting to Google..." : "Continue with Google"}
        </button>

        <div className="my-4 flex items-center gap-3 text-xs text-white/40">
          <span className="h-px flex-1 bg-white/15" />
          <span>OR</span>
          <span className="h-px flex-1 bg-white/15" />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-white/70" htmlFor="email">
              Work Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm outline-none ring-cyan-300 focus:ring"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-white/70" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm outline-none ring-cyan-300 focus:ring"
              required
            />
          </div>

          {error ? <p className="text-xs text-red-300">{error}</p> : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-cyan-300 px-3 py-2 text-sm font-semibold text-black hover:bg-cyan-200"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}
