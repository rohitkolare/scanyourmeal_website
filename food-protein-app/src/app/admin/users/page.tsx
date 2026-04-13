"use client";

import { useEffect, useState } from "react";
import { ModuleHeader } from "@/components/admin/module-header";
import { useAdminSession } from "@/components/admin/admin-guard";
import { fetchAdmin, mutateAdmin } from "@/lib/admin/client";
import { canDeleteUser } from "@/lib/admin/permissions";
import { downloadCsv, toDate } from "@/lib/admin/utils";

export default function UsersPage() {
  const { session } = useAdminSession();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<
    Array<{
      id: string;
      name: string;
      email: string;
      subscriptionStatus: string;
      totalScans: number;
      createdAt: string;
      lastActive: string;
      isSuspended: boolean;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  const loadUsers = async () => {
    setIsLoading(true);
    const users = await fetchAdmin<typeof filtered>(`/api/admin/users?q=${encodeURIComponent(query)}`);
    setFiltered(users);
    setIsLoading(false);
  };

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const users = await fetchAdmin<typeof filtered>(`/api/admin/users?q=${encodeURIComponent(query)}`);
        if (!cancelled) {
          setFiltered(users);
          setIsLoading(false);
        }
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [query]);

  if (error) return <p className="text-sm text-red-200">Failed to load users: {error}</p>;
  if (isLoading) return <p className="text-sm text-white/70">Loading users...</p>;

  const onToggleSuspend = async (id: string, suspend: boolean) => {
    try {
      setBusyId(id);
      await mutateAdmin("/api/admin/users", {
        method: "PATCH",
        body: { id, suspend },
      });
      await loadUsers();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId("");
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this user and their linked records?")) return;

    try {
      setBusyId(id);
      await mutateAdmin("/api/admin/users", {
        method: "DELETE",
        body: { id },
      });
      setFiltered((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId("");
    }
  };

  return (
    <section>
      <ModuleHeader
        title="User Management"
        description={`Search, review, and manage registered users. Role: ${session?.role ?? "unknown"}.`}
        controls={
          <>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, email, user ID"
              className="rounded-lg border border-white/20 bg-[#081018] px-3 py-2 text-sm outline-none ring-cyan-300 focus:ring"
            />
            <button
              type="button"
              onClick={() =>
                downloadCsv(
                  "users.csv",
                  filtered.map((user) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    subscription_status: user.subscriptionStatus,
                    total_scans: user.totalScans,
                    join_date: toDate(user.createdAt),
                    last_active: toDate(user.lastActive),
                    suspended: user.isSuspended,
                  })),
                )
              }
              className="rounded-lg border border-cyan-300/35 px-3 py-2 text-sm text-cyan-100 hover:bg-cyan-400/10"
            >
              Export CSV
            </button>
          </>
        }
      />

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#0E1620] text-white/70">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Scans</th>
              <th className="px-4 py-3">Subscription</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Last Active</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-t border-white/10 bg-[#0A1119]">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-xs text-white/60">{user.email}</p>
                </td>
                <td className="px-4 py-3 text-white/70">{user.id}</td>
                <td className="px-4 py-3 text-white/80">{user.totalScans}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full border border-cyan-300/25 px-2 py-1 text-xs uppercase tracking-[0.12em] text-cyan-100/80">
                    {user.subscriptionStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/70">{toDate(user.createdAt)}</td>
                <td className="px-4 py-3 text-white/70">{toDate(user.lastActive)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onToggleSuspend(user.id, !user.isSuspended)}
                      disabled={busyId === user.id}
                      className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/5 disabled:opacity-50"
                    >
                      {busyId === user.id ? "Updating..." : user.isSuspended ? "Unsuspend" : "Suspend"}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(user.id)}
                      disabled={busyId === user.id || !session || !canDeleteUser(session.role)}
                      title={
                        session && canDeleteUser(session.role)
                          ? "Delete user"
                          : "Only Super Admin can delete users"
                      }
                      className="rounded-md border border-red-300/35 px-3 py-1.5 text-xs font-medium text-red-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
