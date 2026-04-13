import { NextRequest, NextResponse } from "next/server";
import { getScansData } from "@/lib/admin/live-data";
import { requireAdmin } from "@/lib/admin/server-auth";
import { getAdminSupabase } from "@/lib/admin/supabase-server";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const data = await getScansData();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;
  if (auth.role === "analyst") {
    return NextResponse.json({ error: "Analyst role cannot modify scans" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as {
      id?: string;
      flagged?: boolean;
      calories?: number;
      protein?: number;
      carbs?: number;
      fats?: number;
    };
    if (!body.id) {
      return NextResponse.json({ error: "Missing scan id" }, { status: 400 });
    }

    const adminSupabase = getAdminSupabase();
    const { data: current, error: fetchError } = await adminSupabase
      .from("meals")
      .select("total_macros")
      .eq("id", body.id)
      .single();
    if (fetchError) throw fetchError;

    const existing = (current?.total_macros ?? {}) as Record<string, unknown>;
    const nextMacros = {
      ...existing,
      ...(typeof body.flagged === "boolean" ? { flagged: body.flagged } : {}),
      ...(typeof body.calories === "number" ? { calories: body.calories } : {}),
      ...(typeof body.protein === "number" ? { protein: body.protein } : {}),
      ...(typeof body.carbs === "number" ? { carbs: body.carbs } : {}),
      ...(typeof body.fats === "number" ? { fat: body.fats } : {}),
    };

    const { error } = await adminSupabase.from("meals").update({ total_macros: nextMacros }).eq("id", body.id);
    if (error) throw error;

    return NextResponse.json({ data: { id: body.id, updated: true } });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
