"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart, LineChart } from "@/components/admin/charts";
import { KpiCard } from "@/components/admin/kpi-card";
import { ModuleHeader } from "@/components/admin/module-header";
import { fetchAdmin } from "@/lib/admin/client";
import { asCurrency, percent } from "@/lib/admin/utils";

export default function AdminOverviewPage() {
  const [overview, setOverview] = useState<{
    totalUsers: number;
    activeUsers: number;
    totalScans: number;
    scansToday: number;
    successRate: number;
    activeSubscribers: number;
    freeUsers: number;
    revenue: number;
  } | null>(null);
  const [series, setSeries] = useState<Array<{ label: string; dau: number; mau: number }>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [overviewData, analyticsData] = await Promise.all([
          fetchAdmin<{
            totalUsers: number;
            activeUsers: number;
            totalScans: number;
            scansToday: number;
            successRate: number;
            activeSubscribers: number;
            freeUsers: number;
            revenue: number;
          }>("/api/admin/overview"),
          fetchAdmin<Array<{ label: string; dau: number; mau: number }>>("/api/admin/analytics?days=7"),
        ]);

        if (cancelled) return;
        setOverview(overviewData);
        setSeries(analyticsData);
      } catch (err) {
        if (cancelled) return;
        setError((err as Error).message);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const dauSeries = useMemo(() => series.map((point) => ({ label: point.label, value: point.dau })), [series]);
  const mauSeries = useMemo(() => series.map((point) => ({ label: point.label, value: point.mau })), [series]);

  if (error) return <p className="text-sm text-red-200">Failed to load overview: {error}</p>;
  if (!overview) return <p className="text-sm text-white/70">Loading overview...</p>;

  return (
    <section>
      <ModuleHeader
        title="Dashboard Overview"
        description="Core KPIs for users, scan performance, and subscription health."
      />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Users" value={String(overview.totalUsers)} hint="All registered accounts" />
        <KpiCard label="Active Users" value={String(overview.activeUsers)} hint="DAU snapshot" />
        <KpiCard label="Total Meals Scanned" value={String(overview.totalScans)} hint="Lifetime total" />
        <KpiCard label="Scans Today" value={String(overview.scansToday)} hint="UTC day window" />
        <KpiCard label="AI Scan Success Rate" value={percent(overview.successRate)} hint="Mean confidence score" />
        <KpiCard label="Subscription Revenue" value={asCurrency(overview.revenue)} hint="Active subscription total" />
        <KpiCard label="Active Subscribers" value={String(overview.activeSubscribers)} hint="Currently paying users" />
        <KpiCard label="Free Users" value={String(overview.freeUsers)} hint="Potential conversion pool" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-white/10 bg-[#0B121A] p-4">
          <h3 className="text-sm font-medium text-white">Daily Active Users (Last 7 Days)</h3>
          <div className="mt-4">
            <LineChart data={dauSeries} />
          </div>
        </article>

        <article className="rounded-xl border border-white/10 bg-[#0B121A] p-4">
          <h3 className="text-sm font-medium text-white">MAU Trend (Last 7 Days)</h3>
          <div className="mt-4">
            <BarChart data={mauSeries} color="bg-cyan-400" />
          </div>
        </article>
      </div>
    </section>
  );
}
