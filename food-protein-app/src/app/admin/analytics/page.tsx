"use client";

import { useMemo, useState } from "react";
import { BarChart, LineChart } from "@/components/admin/charts";
import { ModuleHeader } from "@/components/admin/module-header";
import { fetchAdmin } from "@/lib/admin/client";
import { downloadCsv, percent } from "@/lib/admin/utils";
import { useEffect } from "react";

const filters = ["7d", "30d", "custom"];

export default function AnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState("7d");
  const [allRows, setAllRows] = useState<
    Array<{
      label: string;
      dau: number;
      mau: number;
      retentionRate: number;
      conversionRate: number;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setIsLoading(true);
        const days = timeFilter === "30d" ? 30 : timeFilter === "custom" ? 14 : 7;
        const data = await fetchAdmin<typeof allRows>(`/api/admin/analytics?days=${days}`);
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
  }, [timeFilter]);

  const rows = useMemo(() => {
    return allRows;
  }, [allRows]);

  const avgRetention = rows.length ? rows.reduce((sum, point) => sum + point.retentionRate, 0) / rows.length : 0;
  const avgConversion = rows.length ? rows.reduce((sum, point) => sum + point.conversionRate, 0) / rows.length : 0;

  if (error) return <p className="text-sm text-red-200">Failed to load analytics: {error}</p>;
  if (isLoading) return <p className="text-sm text-white/70">Loading analytics...</p>;

  return (
    <section>
      <ModuleHeader
        title="Analytics"
        description="Performance insights for growth, retention, and conversion."
        controls={
          <>
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setTimeFilter(filter)}
                className={`rounded-lg border px-3 py-2 text-sm ${
                  timeFilter === filter ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-100" : "border-white/20 text-white/70"
                }`}
              >
                {filter}
              </button>
            ))}
            <button
              type="button"
              onClick={() =>
                downloadCsv(
                  "analytics.csv",
                  rows.map((point) => ({
                    date_label: point.label,
                    dau: point.dau,
                    mau: point.mau,
                    retention_rate: point.retentionRate,
                    conversion_rate: point.conversionRate,
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

      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <article className="rounded-xl border border-white/10 bg-[#0B121A] p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-white/60">Avg Retention Rate</p>
          <p className="mt-2 text-2xl font-semibold text-white">{percent(avgRetention)}</p>
        </article>
        <article className="rounded-xl border border-white/10 bg-[#0B121A] p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-white/60">Free to Paid Conversion</p>
          <p className="mt-2 text-2xl font-semibold text-white">{percent(avgConversion)}</p>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-white/10 bg-[#0B121A] p-4">
          <h3 className="text-sm font-medium">DAU Trend</h3>
          <div className="mt-4">
            <LineChart data={rows.map((point) => ({ label: point.label, value: point.dau }))} />
          </div>
        </article>
        <article className="rounded-xl border border-white/10 bg-[#0B121A] p-4">
          <h3 className="text-sm font-medium">MAU Trend</h3>
          <div className="mt-4">
            <BarChart data={rows.map((point) => ({ label: point.label, value: point.mau }))} color="bg-cyan-400" />
          </div>
        </article>
      </div>
    </section>
  );
}
