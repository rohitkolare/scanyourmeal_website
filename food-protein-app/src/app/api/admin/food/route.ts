import { NextRequest, NextResponse } from "next/server";
import { getFoodData } from "@/lib/admin/live-data";
import { requireAdmin } from "@/lib/admin/server-auth";
import { getAdminSupabase } from "@/lib/admin/supabase-server";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const search = request.nextUrl.searchParams.get("q") ?? "";
    const data = await getFoodData(search);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;
  if (auth.role === "analyst") {
    return NextResponse.json({ error: "Analyst role cannot edit food items" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as {
      id?: string;
      calories?: number;
      protein?: number;
      carbs?: number;
      fats?: number;
    };
    if (!body.id) {
      return NextResponse.json({ error: "Missing food item id" }, { status: 400 });
    }

    const adminSupabase = getAdminSupabase();
    const { data: current, error: fetchError } = await adminSupabase
      .from("food_nutrition_cache")
      .select("nutrients_per_100g")
      .eq("search_query", body.id)
      .single();
    if (fetchError) throw fetchError;

    const existing = (current?.nutrients_per_100g ?? {}) as Record<string, unknown>;
    const next = {
      ...existing,
      ...(typeof body.calories === "number" ? { calories: body.calories } : {}),
      ...(typeof body.protein === "number" ? { protein: body.protein } : {}),
      ...(typeof body.carbs === "number" ? { carbs: body.carbs, carbohydrates: body.carbs } : {}),
      ...(typeof body.fats === "number" ? { fat: body.fats, fats: body.fats } : {}),
    };

    const { error } = await adminSupabase
      .from("food_nutrition_cache")
      .update({ nutrients_per_100g: next })
      .eq("search_query", body.id);
    if (error) throw error;

    return NextResponse.json({ data: { id: body.id, updated: true } });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
