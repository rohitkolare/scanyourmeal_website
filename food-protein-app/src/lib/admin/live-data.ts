import { getAdminSupabase } from "./supabase-server";

type JsonObject = Record<string, unknown>;

function asNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(/[^\d.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function parseMacros(macros: unknown) {
  const data = (macros ?? {}) as JsonObject;
  return {
    calories: asNumber(data.calories),
    protein: asNumber(data.protein),
    carbs: asNumber(data.carbs),
    fats: asNumber(data.fat),
    confidence: asNumber(data.ai_confidence ?? data.confidence),
    flagged: Boolean(data.flagged),
  };
}

async function listAllAuthUsers() {
  const adminSupabase = getAdminSupabase();
  const users: Array<{ id: string; email: string | null; created_at: string | null; last_sign_in_at: string | null; banned_until: string | null }> = [];
  let page = 1;

  try {
    while (true) {
      const { data, error } = await adminSupabase.auth.admin.listUsers({ page, perPage: 1000 });
      if (error) throw error;

      const batch = (data.users ?? []).map((user) => ({
        id: user.id,
        email: user.email ?? null,
        created_at: user.created_at ?? null,
        last_sign_in_at: user.last_sign_in_at ?? null,
        banned_until: user.banned_until ?? null,
      }));

      users.push(...batch);

      if (!data.nextPage) break;
      page = data.nextPage;
    }
  } catch {
    return [];
  }

  return users;
}

export async function getUsersData(search = "") {
  const adminSupabase = getAdminSupabase();
  const [{ data: profiles, error: profileError }, authUsers, { data: mealRows, error: mealsError }] = await Promise.all([
    adminSupabase
      .from("profiles")
      .select("id, username, updated_at, is_subscribed, subscription_expires_at, total_meals")
      .order("updated_at", { ascending: false }),
    listAllAuthUsers(),
    adminSupabase.from("meals").select("user_id"),
  ]);

  if (profileError) throw profileError;
  if (mealsError) throw mealsError;

  const mealCountByUser = new Map<string, number>();
  for (const row of mealRows ?? []) {
    const key = String(row.user_id);
    mealCountByUser.set(key, (mealCountByUser.get(key) ?? 0) + 1);
  }

  const authMap = new Map(authUsers.map((u) => [u.id, u]));

  const result = (profiles ?? []).map((profile) => {
    const auth = authMap.get(profile.id);
    const expiresAt = profile.subscription_expires_at ? new Date(profile.subscription_expires_at) : null;
    const isActiveSubscription = Boolean(profile.is_subscribed) && Boolean(expiresAt && expiresAt > new Date());

    return {
      id: profile.id,
      name: profile.username ?? "Unnamed User",
      email: auth?.email ?? "unknown@user.local",
      subscriptionStatus: isActiveSubscription
        ? "active"
        : profile.is_subscribed
          ? "cancelled"
          : "free",
      totalScans: mealCountByUser.get(profile.id) ?? profile.total_meals ?? 0,
      createdAt: auth?.created_at ?? profile.updated_at ?? new Date(0).toISOString(),
      lastActive: auth?.last_sign_in_at ?? profile.updated_at ?? auth?.created_at ?? new Date(0).toISOString(),
      isSuspended: Boolean(auth?.banned_until),
    };
  });

  const q = search.trim().toLowerCase();
  if (!q) return result;

  return result.filter(
    (row) =>
      row.name.toLowerCase().includes(q) ||
      row.email.toLowerCase().includes(q) ||
      row.id.toLowerCase().includes(q),
  );
}

export async function getScansData() {
  const adminSupabase = getAdminSupabase();
  const [{ data: meals, error: mealsError }, users] = await Promise.all([
    adminSupabase
      .from("meals")
      .select("id, user_id, date, dish_name, items, total_macros")
      .order("date", { ascending: false })
      .limit(250),
    getUsersData(),
  ]);

  if (mealsError) throw mealsError;

  const usersById = new Map(users.map((user) => [user.id, user]));

  return (meals ?? []).map((meal) => {
    const macros = parseMacros(meal.total_macros);
    const items = Array.isArray(meal.items) ? meal.items : [];
    const detectedFood = items
      .map((item) => ((item as JsonObject).name as string | undefined) ?? "")
      .filter(Boolean);

    return {
      id: meal.id,
      userId: meal.user_id,
      userName: usersById.get(meal.user_id)?.name ?? meal.user_id,
      imageUrl: "/hero.png",
      detectedFood: detectedFood.length ? detectedFood : [meal.dish_name ?? "Unknown Meal"],
      calories: macros.calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fats: macros.fats,
      aiConfidence: macros.confidence,
      flagged: macros.flagged,
      createdAt: meal.date,
    };
  });
}

export async function getFoodData(search = "") {
  const adminSupabase = getAdminSupabase();
  const { data, error } = await adminSupabase
    .from("food_nutrition_cache")
    .select("search_query, nutrients_per_100g, created_at")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) throw error;

  const mapped = (data ?? []).map((row) => {
    const nutrients = (row.nutrients_per_100g ?? {}) as JsonObject;
    return {
      id: row.search_query,
      name: row.search_query,
      calories: asNumber(nutrients.calories ?? nutrients.energy_kcal),
      protein: asNumber(nutrients.protein),
      carbs: asNumber(nutrients.carbohydrates ?? nutrients.carbs),
      fats: asNumber(nutrients.fat ?? nutrients.fats),
      status: "active",
      createdAt: row.created_at,
    };
  });

  const q = search.trim().toLowerCase();
  if (!q) return mapped;
  return mapped.filter((item) => item.name.toLowerCase().includes(q));
}

export async function getSubscriptionData() {
  const users = await getUsersData();

  return users.map((user, index) => {
    const active = user.subscriptionStatus === "active";
    return {
      id: `sub_${index + 1}`,
      userId: user.id,
      userEmail: user.email,
      planType: active ? "pro_monthly" : "free",
      price: active ? 12.99 : 0,
      status: active ? "active" : "cancelled",
      startDate: user.createdAt.slice(0, 10),
      endDate: active ? "2099-12-31" : user.lastActive.slice(0, 10),
    };
  });
}

export async function getOverviewData() {
  const [users, scans, subs] = await Promise.all([getUsersData(), getScansData(), getSubscriptionData()]);

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => !user.isSuspended).length;
  const totalScans = scans.length;

  const todayIso = new Date().toISOString().slice(0, 10);
  const scansToday = scans.filter((scan) => scan.createdAt.slice(0, 10) === todayIso).length;

  const confidences = scans.map((scan) => scan.aiConfidence).filter((score) => score > 0);
  const successRate = confidences.length
    ? confidences.reduce((sum, score) => sum + score, 0) / confidences.length
    : 0;

  const activeSubscribers = subs.filter((sub) => sub.status === "active").length;
  const freeUsers = users.filter((user) => user.subscriptionStatus === "free").length;
  const revenue = subs.filter((sub) => sub.status === "active").reduce((sum, sub) => sum + sub.price, 0);

  return {
    totalUsers,
    activeUsers,
    totalScans,
    scansToday,
    successRate,
    activeSubscribers,
    freeUsers,
    revenue,
  };
}

export async function getAnalyticsData(days = 7) {
  const adminSupabase = getAdminSupabase();
  const { data: meals, error } = await adminSupabase.from("meals").select("user_id, date, total_macros");
  if (error) throw error;

  const users = await getUsersData();
  const paidUsers = users.filter((user) => user.subscriptionStatus === "active").length;
  const conversionRate = users.length ? (paidUsers / users.length) * 100 : 0;

  const today = new Date();
  const series: Array<{
    label: string;
    dau: number;
    mau: number;
    retentionRate: number;
    conversionRate: number;
    avgScansPerUser: number;
    avgCaloriesPerDay: number;
  }> = [];

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const dayStart = new Date(today);
    dayStart.setHours(0, 0, 0, 0);
    dayStart.setDate(today.getDate() - offset);

    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayStart.getDate() + 1);

    const windowStart = new Date(dayStart);
    windowStart.setDate(dayStart.getDate() - 29);

    const previousWeekStart = new Date(dayStart);
    previousWeekStart.setDate(dayStart.getDate() - 7);

    const dayMeals = (meals ?? []).filter((meal) => {
      const date = new Date(meal.date);
      return date >= dayStart && date < dayEnd;
    });

    const monthMeals = (meals ?? []).filter((meal) => {
      const date = new Date(meal.date);
      return date >= windowStart && date < dayEnd;
    });

    const previousMeals = (meals ?? []).filter((meal) => {
      const date = new Date(meal.date);
      return date >= previousWeekStart && date < dayStart;
    });

    const dauUsers = new Set(dayMeals.map((meal) => meal.user_id));
    const mauUsers = new Set(monthMeals.map((meal) => meal.user_id));
    const previousUsers = new Set(previousMeals.map((meal) => meal.user_id));

    const retainedCount = [...dauUsers].filter((id) => previousUsers.has(id)).length;
    const retentionRate = dauUsers.size ? (retainedCount / dauUsers.size) * 100 : 0;

    const calories = dayMeals.reduce((sum, meal) => sum + parseMacros(meal.total_macros).calories, 0);

    series.push({
      label: dayStart.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      dau: dauUsers.size,
      mau: mauUsers.size,
      retentionRate,
      conversionRate,
      avgScansPerUser: dauUsers.size ? dayMeals.length / dauUsers.size : 0,
      avgCaloriesPerDay: calories,
    });
  }

  return series;
}
