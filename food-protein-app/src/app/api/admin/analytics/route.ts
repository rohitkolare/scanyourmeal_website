import { NextRequest, NextResponse } from "next/server";
import { getAnalyticsData } from "@/lib/admin/live-data";
import { requireAdmin } from "@/lib/admin/server-auth";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const rawDays = request.nextUrl.searchParams.get("days");
    const days = rawDays ? Number.parseInt(rawDays, 10) : 7;
    const safeDays = Number.isFinite(days) && days > 0 ? days : 7;
    const data = await getAnalyticsData(safeDays);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
