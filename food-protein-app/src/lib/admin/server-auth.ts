import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { AdminRole } from "./types";

function getAuthClient() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anon) {
    throw new Error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createClient(supabaseUrl, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function splitCsv(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function resolveAdminRole(email: string): AdminRole | null {
  const normalized = email.toLowerCase();
  const superAdmins = splitCsv(process.env.ADMIN_SUPER_EMAILS);
  const admins = splitCsv(process.env.ADMIN_ADMIN_EMAILS);
  const analysts = splitCsv(process.env.ADMIN_ANALYST_EMAILS);

  if (superAdmins.includes(normalized)) return "super_admin";
  if (admins.includes(normalized)) return "admin";
  if (analysts.includes(normalized)) return "analyst";

  return null;
}

export async function requireAdmin(request: NextRequest): Promise<
  | { ok: true; email: string; role: AdminRole; token: string }
  | { ok: false; response: NextResponse }
> {
  try {
    const auth = request.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

    if (!token) {
      return {
        ok: false,
        response: NextResponse.json({ error: "Missing bearer token" }, { status: 401 }),
      };
    }

    const supabase = getAuthClient();
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user?.email) {
      return {
        ok: false,
        response: NextResponse.json({ error: "Invalid or expired token" }, { status: 401 }),
      };
    }

    const role = resolveAdminRole(data.user.email);

    if (!role) {
      return {
        ok: false,
        response: NextResponse.json({ error: "Not authorized for admin access" }, { status: 403 }),
      };
    }

    return { ok: true, email: data.user.email, role, token };
  } catch (error) {
    return {
      ok: false,
      response: NextResponse.json({ error: (error as Error).message }, { status: 500 }),
    };
  }
}
