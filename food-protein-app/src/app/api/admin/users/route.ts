import { NextRequest, NextResponse } from "next/server";
import { getUsersData } from "@/lib/admin/live-data";
import { requireAdmin } from "@/lib/admin/server-auth";
import { getAdminSupabase } from "@/lib/admin/supabase-server";

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  try {
    const search = request.nextUrl.searchParams.get("q") ?? "";
    const data = await getUsersData(search);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;
  if (auth.role === "analyst") {
    return NextResponse.json({ error: "Analyst role cannot modify users" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as { id?: string; suspend?: boolean };
    if (!body.id || typeof body.suspend !== "boolean") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const adminSupabase = getAdminSupabase();
    const { error } = await adminSupabase.auth.admin.updateUserById(body.id, {
      ban_duration: body.suspend ? "876000h" : "none",
    });
    if (error) throw error;

    return NextResponse.json({ data: { id: body.id, suspended: body.suspend } });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;
  if (auth.role !== "super_admin") {
    return NextResponse.json({ error: "Only super admin can delete users" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as { id?: string };
    if (!body.id) {
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });
    }

    const adminSupabase = getAdminSupabase();

    await adminSupabase.from("meals").delete().eq("user_id", body.id);
    await adminSupabase.from("profiles").delete().eq("id", body.id);

    const { error } = await adminSupabase.auth.admin.deleteUser(body.id);
    if (error) throw error;

    return NextResponse.json({ data: { id: body.id, deleted: true } });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
