"use client";

import { useEffect, useMemo, useState } from "react";
import { ModuleHeader } from "@/components/admin/module-header";
import { useAdminSession } from "@/components/admin/admin-guard";
import { fetchAdmin } from "@/lib/admin/client";
import { canModifySubscriptionPlans } from "@/lib/admin/permissions";
import { asCurrency, downloadCsv } from "@/lib/admin/utils";

export default function SubscriptionsPage() {
  const { session } = useAdminSession();
  const [planFilter, setPlanFilter] = useState("all");
  const [allRows, setAllRows] = useState<
    Array<{
      id: string;
      userId: string;
      userEmail: string;
      planType: string;
      price: number;
      status: string;
      startDate: string;
      endDate: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await fetchAdmin<typeof allRows>("/api/admin/subscriptions");
        if (!cancelled) setAllRows(data);
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const rows = useMemo(() => {
    if (planFilter === "all") return allRows;
    return allRows.filter((sub) => sub.planType === planFilter);
  }, [allRows, planFilter]);

  const revenue = rows.filter((sub) => sub.status === "active").reduce((sum, sub) => sum + sub.price, 0);

  if (error) return <p className="text-sm text-red-200">Failed to load subscriptions: {error}</p>;
  if (isLoading) return <p className="text-sm text-white/70">Loading subscriptions...</p>;

  return (
    <section>
      <ModuleHeader
        title="Subscription & Revenue"
        description="Track plans, active subscribers, and revenue trends."
        controls={
          <>
            <select
              value={planFilter}
              onChange={(event) => setPlanFilter(event.target.value)}
              className="rounded-lg border border-white/20 bg-[#081018] px-3 py-2 text-sm"
            >
              <option value="all">All Plans</option>
              <option value="pro_monthly">Pro Monthly</option>
              <option value="pro_yearly">Pro Yearly</option>
              <option value="free">Free</option>
            </select>
            <button
              type="button"
              onClick={() =>
                downloadCsv(
                  "subscriptions.csv",
                  rows.map((sub) => ({
                    id: sub.id,
                    user_id: sub.userId,
                    plan_type: sub.planType,
                    price: sub.price,
                    status: sub.status,
                    start_date: sub.startDate,
                    end_date: sub.endDate,
                  })),
                )
              }
              className="rounded-lg border border-cyan-300/35 px-3 py-2 text-sm text-cyan-100 hover:bg-cyan-400/10"
            >
              Export Reports
            </button>
            <button
              type="button"
              disabled={!session || !canModifySubscriptionPlans(session.role)}
              title={
                session && canModifySubscriptionPlans(session.role)
                  ? "Add new plan"
                  : "Only Super Admin can modify plans"
              }
              className="rounded-lg border border-cyan-300/35 px-3 py-2 text-sm text-cyan-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add Plan
            </button>
          </>
        }
      />

      <article className="mb-4 rounded-xl border border-cyan-300/20 bg-[#0B121A] p-4">
        <p className="text-xs uppercase tracking-[0.14em] text-cyan-100/70">Revenue Summary</p>
        <p className="mt-2 text-2xl font-semibold">{asCurrency(revenue)}</p>
      </article>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#0E1620] text-white/70">
            <tr>
              <th className="px-4 py-3">Subscription</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Period</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((sub) => {
              return (
                <tr key={sub.id} className="border-t border-white/10 bg-[#0A1119]">
                  <td className="px-4 py-3 text-white/80">{sub.id}</td>
                  <td className="px-4 py-3 text-white/80">{sub.userEmail}</td>
                  <td className="px-4 py-3 text-white/80">{sub.planType}</td>
                  <td className="px-4 py-3 text-white/80">{asCurrency(sub.price)}</td>
                  <td className="px-4 py-3 text-white/80">{sub.status}</td>
                  <td className="px-4 py-3 text-white/70">
                    {sub.startDate} to {sub.endDate}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      disabled={!session || !canModifySubscriptionPlans(session.role)}
                      className="rounded-md border border-cyan-300/30 px-2 py-1 text-xs text-cyan-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Modify
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
