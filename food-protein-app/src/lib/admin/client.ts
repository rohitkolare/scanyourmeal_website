import { getAdminBrowserSupabase } from "./supabase-browser";

async function getAccessToken(): Promise<string> {
  const supabase = getAdminBrowserSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("No active admin session");
  }
  return session.access_token;
}

export async function fetchAdmin<T>(url: string): Promise<T> {
  const accessToken = await getAccessToken();

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error ?? "Failed to fetch admin data");
  }

  return payload.data as T;
}

export async function mutateAdmin<T>(
  url: string,
  options: { method: "PATCH" | "POST" | "DELETE"; body?: Record<string, unknown> },
): Promise<T> {
  const accessToken = await getAccessToken();
  const response = await fetch(url, {
    method: options.method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error ?? "Failed to update admin data");
  }
  return payload.data as T;
}
