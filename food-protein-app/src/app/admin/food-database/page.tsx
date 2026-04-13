"use client";

import { useEffect, useState } from "react";
import { ModuleHeader } from "@/components/admin/module-header";
import { useAdminSession } from "@/components/admin/admin-guard";
import { fetchAdmin, mutateAdmin } from "@/lib/admin/client";
import { canEditFoodDatabase } from "@/lib/admin/permissions";

export default function FoodDatabasePage() {
  const { session } = useAdminSession();
  const [query, setQuery] = useState("");
  const [rows, setRows] = useState<
    Array<{
      id: string;
      name: string;
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
      status: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");

  const canEdit = session ? canEditFoodDatabase(session.role) : false;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAdmin<typeof rows>(`/api/admin/food?q=${encodeURIComponent(query)}`);
        if (!cancelled) setRows(data);
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
  }, [query]);

  if (error) return <p className="text-sm text-red-200">Failed to load food database: {error}</p>;
  if (isLoading) return <p className="text-sm text-white/70">Loading food database...</p>;

  const onEdit = async (id: string, current: { calories: number; protein: number; carbs: number; fats: number }) => {
    const calories = Number(prompt("Calories", String(current.calories)));
    const protein = Number(prompt("Protein (g)", String(current.protein)));
    const carbs = Number(prompt("Carbs (g)", String(current.carbs)));
    const fats = Number(prompt("Fats (g)", String(current.fats)));
    if ([calories, protein, carbs, fats].some((value) => Number.isNaN(value))) return;

    try {
      setBusyId(id);
      await mutateAdmin("/api/admin/food", {
        method: "PATCH",
        body: { id, calories, protein, carbs, fats },
      });
      setRows((prev) =>
        prev.map((row) => (row.id === id ? { ...row, calories, protein, carbs, fats } : row)),
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
        title="Food Database"
        description="Maintain nutrition references used by AI scan output." 
        controls={
          <>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by food name"
              className="rounded-lg border border-white/20 bg-[#081018] px-3 py-2 text-sm outline-none ring-cyan-300 focus:ring"
            />
            <button
              type="button"
              disabled={!canEdit}
              className="rounded-lg border border-cyan-300/35 px-3 py-2 text-sm text-cyan-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Add Food Item
            </button>
            <button
              type="button"
              disabled={!canEdit}
              className="rounded-lg border border-cyan-300/35 px-3 py-2 text-sm text-cyan-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Bulk CSV Import
            </button>
          </>
        }
      />

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#0E1620] text-white/70">
            <tr>
              <th className="px-4 py-3">Food</th>
              <th className="px-4 py-3">Calories</th>
              <th className="px-4 py-3">Protein</th>
              <th className="px-4 py-3">Carbs</th>
              <th className="px-4 py-3">Fats</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.id} className="border-t border-white/10 bg-[#0A1119]">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="text-xs text-white/60">{item.id}</p>
                </td>
                <td className="px-4 py-3 text-white/70">{item.calories}</td>
                <td className="px-4 py-3 text-white/70">{item.protein}g</td>
                <td className="px-4 py-3 text-white/70">{item.carbs}g</td>
                <td className="px-4 py-3 text-white/70">{item.fats}g</td>
                <td className="px-4 py-3 text-white/70">{item.status}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onEdit(item.id, item)}
                    disabled={busyId === item.id || !canEdit}
                    className="rounded-md border border-cyan-300/30 px-3 py-1.5 text-xs font-medium text-cyan-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {busyId === item.id ? "Saving..." : "Edit"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
