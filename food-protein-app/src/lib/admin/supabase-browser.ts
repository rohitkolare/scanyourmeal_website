"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let adminBrowserSupabase: SupabaseClient | null = null;

export function getAdminBrowserSupabase() {
  if (adminBrowserSupabase) {
    return adminBrowserSupabase;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  adminBrowserSupabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });

  return adminBrowserSupabase;
}
