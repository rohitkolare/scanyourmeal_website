import { NextRequest, NextResponse } from "next/server";
import { getOverviewData } from "@/lib/admin/live-data";
import { requireAdmin } from "@/lib/admin/server-auth";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const data = await getOverviewData();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
