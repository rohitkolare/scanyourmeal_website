"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ModuleHeader } from "@/components/admin/module-header";
import { useAdminSession } from "@/components/admin/admin-guard";
import { fetchAdmin, mutateAdmin } from "@/lib/admin/client";
import { canAdjustNutrition } from "@/lib/admin/permissions";
import { percent, toDate } from "@/lib/admin/utils";

export default function ScansPage() {
  const { session } = useAdminSession();
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const [minConfidence, setMinConfidence] = useState(0);
  const [scans, setScans] = useState<
    Array<{
      id: string;
      userId: string;
      userName: string;
      imageUrl: string;
      detectedFood: string[];
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
      aiConfidence: number;
      flagged: boolean;
      createdAt: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await fetchAdmin<typeof scans>("/api/admin/scans");
        if (!cancelled) setScans(data);
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
    return scans.filter((scan) => {
      if (flaggedOnly && !scan.flagged) return false;
      return scan.aiConfidence >= minConfidence;
    });
  }, [flaggedOnly, minConfidence, scans]);

  if (error) return <p className="text-sm text-red-200">Failed to load scans: {error}</p>;
  if (isLoading) return <p className="text-sm text-white/70">Loading meal scans...</p>;

  const onToggleFlag = async (id: string, flagged: boolean) => {
    try {
      setBusyId(id);
      await mutateAdmin("/api/admin/scans", { method: "PATCH", body: { id, flagged } });
      setScans((prev) => prev.map((scan) => (scan.id === id ? { ...scan, flagged } : scan)));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId("");
    }
  };

  const onAdjustNutrition = async (scan: (typeof scans)[number]) => {
    const calories = Number(prompt("Calories", String(scan.calories)));
    const protein = Number(prompt("Protein (g)", String(scan.protein)));
    const carbs = Number(prompt("Carbs (g)", String(scan.carbs)));
    const fats = Number(prompt("Fats (g)", String(scan.fats)));
    if ([calories, protein, carbs, fats].some((value) => Number.isNaN(value))) return;

    try {
      setBusyId(scan.id);
      await mutateAdmin("/api/admin/scans", {
        method: "PATCH",
        body: { id: scan.id, calories, protein, carbs, fats },
      });

      setScans((prev) =>
        prev.map((row) =>
          row.id === scan.id
            ? {
                ...row,
                calories,
                protein,
                carbs,
                fats,
              }
            : row,
        ),
      );
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusyId("");
    }
  };

  return (
    <section>
      <ModuleHeader
        title="Meal Scan Monitoring"
        description="Review scan outputs, confidence scores, and flagged records."
        controls={
          <>
            <label className="flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-xs text-white/80">
              <input type="checkbox" checked={flaggedOnly} onChange={() => setFlaggedOnly((v) => !v)} />
              Flagged only
            </label>
            <label className="flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-xs text-white/80">
              Min confidence
              <input
                type="number"
                value={minConfidence}
                min={0}
                max={100}
                onChange={(event) => setMinConfidence(Number(event.target.value))}
                className="w-14 rounded border border-white/20 bg-transparent px-1 py-0.5"
              />
            </label>
          </>
        }
      />

      <div className="space-y-3">
        {rows.map((scan) => {
          return (
            <article key={scan.id} className="grid gap-4 rounded-xl border border-white/10 bg-[#0B121A] p-4 lg:grid-cols-[140px_1fr_auto]">
              <div className="relative h-[110px] overflow-hidden rounded-lg border border-white/10">
                <Image src={scan.imageUrl} alt={scan.id} fill className="object-cover" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-cyan-100/70">{scan.id}</p>
                <p className="mt-1 text-sm text-white/80">User: {scan.userName}</p>
                <p className="mt-2 text-xs text-white/60">Detected: {scan.detectedFood.join(", ")}</p>
                <p className="mt-2 text-xs text-white/60">
                  {scan.calories} kcal | P {scan.protein}g | C {scan.carbs}g | F {scan.fats}g
                </p>
                <p className="mt-2 text-xs text-white/60">Created: {toDate(scan.createdAt)}</p>
              </div>

              <div className="space-y-2 text-right">
                <p className="text-sm text-cyan-100">Confidence {percent(scan.aiConfidence)}</p>
                {scan.flagged ? (
                  <span className="inline-flex rounded-full border border-red-300/35 px-2 py-1 text-xs text-red-200">
                    Flagged
                  </span>
                ) : (
                  <span className="inline-flex rounded-full border border-emerald-300/35 px-2 py-1 text-xs text-emerald-200">
                    Normal
                  </span>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleFlag(scan.id, !scan.flagged)}
                    disabled={busyId === scan.id}
                    className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-medium text-white/80 disabled:opacity-50"
                  >
                    {busyId === scan.id ? "Updating..." : scan.flagged ? "Unflag" : "Flag"}
                  </button>
                  <button
                    type="button"
                    onClick={() => onAdjustNutrition(scan)}
                    disabled={busyId === scan.id || !session || !canAdjustNutrition(session.role)}
                    title={
                      session && canAdjustNutrition(session.role)
                        ? "Edit nutrition values"
                        : "Only Admin and Super Admin can edit nutrition"
                    }
                    className="rounded-md border border-cyan-300/30 px-3 py-1.5 text-xs font-medium text-cyan-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {busyId === scan.id ? "Saving..." : "Adjust Nutrition"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
