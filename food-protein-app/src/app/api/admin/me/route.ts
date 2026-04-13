import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/server-auth";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  return NextResponse.json({
    data: {
      email: auth.email,
      role: auth.role,
    },
  });
}
