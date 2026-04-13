"use client";

import { AdminRole } from "./types";

export interface AdminSession {
  email: string;
  role: AdminRole;
  loginAt: string;
}

export const SESSION_KEY = "sym_admin_session";
const SESSION_EVENT = "sym_admin_session_change";

export function subscribeSession(onStoreChange: () => void): () => void {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(SESSION_EVENT, handler);

  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(SESSION_EVENT, handler);
  };
}

export function getSessionRaw(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(SESSION_KEY) ?? "";
}

export function getSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  const raw = getSessionRaw();
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AdminSession;
  } catch {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function setSession(session: AdminSession): void {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function clearSession(): void {
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}
