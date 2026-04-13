import { analyticsSeries, mealScans, subscriptions, users } from "@/lib/admin/mock-data";
import { getAnalyticsData, getOverviewData, getScansData } from "@/lib/admin/live-data";

type ScanLike = {
  detectedFood: string[];
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  aiConfidence: number;
  flagged: boolean;
  createdAt: string;
};

type AnalyticsLike = {
  label: string;
  dau: number;
  retentionRate: number;
  avgScansPerUser?: number;
};

type HeroTone = "text-emerald-300" | "text-sky-300" | "text-violet-300" | "text-amber-200";

export type HeroMetric = {
  label: string;
  value: string;
  delta: string;
  tone: HeroTone;
};

export type ScanRow = {
  meal: string;
  protein: string;
  calories: string;
  status: string;
  statusTone: string;
};

export type MacroSplit = {
  protein: number;
  carbs: number;
  fats: number;
};

export type HomeDashboardData = {
  heroMetrics: HeroMetric[];
  scanRows: ScanRow[];
  macroSplit: MacroSplit;
  trendValues: number[];
  trendLabels: string[];
  dataSource: "live" | "demo";
};

function toFiniteNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return 0;
}

function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: value >= 100 ? 0 : 1,
  }).format(Math.max(0, value));
}

function formatPercent(value: number): string {
  return `${Math.max(0, value).toFixed(1)}%`;
}

function formatDelta(current: number, previous: number): string {
  if (!Number.isFinite(current) || !Number.isFinite(previous) || previous <= 0) return "+0.0%";
  const delta = ((current - previous) / previous) * 100;
  const prefix = delta >= 0 ? "+" : "";
  return `${prefix}${delta.toFixed(1)}%`;
}

function average(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function dayKey(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 10);
}

function getDailyCounts(scans: ScanLike[]): Array<{ day: string; count: number }> {
  const counts = new Map<string, number>();
  for (const scan of scans) {
    const key = dayKey(scan.createdAt);
    if (!key) continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, count]) => ({ day, count }));
}

function getDailyConfidence(scans: ScanLike[]): Array<{ day: string; confidence: number }> {
  const grouped = new Map<string, number[]>();

  for (const scan of scans) {
    const key = dayKey(scan.createdAt);
    if (!key) continue;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)?.push(scan.aiConfidence);
  }

  return [...grouped.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, values]) => ({ day, confidence: average(values.filter((value) => value > 0)) }));
}

function deriveStatus(scan: ScanLike): Pick<ScanRow, "status" | "statusTone"> {
  if (scan.flagged) {
    return {
      status: "Review Suggested",
      statusTone: "bg-amber-500/20 text-amber-100 border-amber-300/30",
    };
  }

  if (scan.aiConfidence >= 92) {
    return {
      status: "Verified",
      statusTone: "bg-emerald-500/20 text-emerald-200 border-emerald-300/30",
    };
  }

  if (scan.aiConfidence >= 80) {
    return {
      status: "High Confidence",
      statusTone: "bg-sky-500/20 text-sky-200 border-sky-300/30",
    };
  }

  return {
    status: "Needs Review",
    statusTone: "bg-amber-500/20 text-amber-100 border-amber-300/30",
  };
}

function toScanRows(scans: ScanLike[]): ScanRow[] {
  const sorted = [...scans].sort((a, b) => {
    const left = new Date(a.createdAt).getTime();
    const right = new Date(b.createdAt).getTime();
    return right - left;
  });

  const mapped = sorted.slice(0, 4).map((scan) => {
    const status = deriveStatus(scan);
    return {
      meal: scan.detectedFood[0] ?? "Detected Meal",
      protein: `${Math.round(toFiniteNumber(scan.protein))}g`,
      calories: String(Math.round(toFiniteNumber(scan.calories))),
      status: status.status,
      statusTone: status.statusTone,
    };
  });

  if (mapped.length) return mapped;

  return [
    {
      meal: "No scan data yet",
      protein: "0g",
      calories: "0",
      status: "Pending",
      statusTone: "bg-sky-500/20 text-sky-200 border-sky-300/30",
    },
  ];
}

function toMacroSplit(scans: ScanLike[]): MacroSplit {
  const totals = scans.slice(0, 40).reduce(
    (acc, scan) => {
      acc.protein += Math.max(0, toFiniteNumber(scan.protein));
      acc.carbs += Math.max(0, toFiniteNumber(scan.carbs));
      acc.fats += Math.max(0, toFiniteNumber(scan.fats));
      return acc;
    },
    { protein: 0, carbs: 0, fats: 0 },
  );

  const grandTotal = totals.protein + totals.carbs + totals.fats;
  if (grandTotal <= 0) return { protein: 44, carbs: 34, fats: 22 };

  const protein = clampPercent((totals.protein / grandTotal) * 100);
  const carbs = clampPercent((totals.carbs / grandTotal) * 100);
  const fats = Math.max(0, 100 - protein - carbs);

  return { protein, carbs, fats };
}

function toTrend(analytics: AnalyticsLike[], scans: ScanLike[]): { trendValues: number[]; trendLabels: string[] } {
  if (analytics.length) {
    const trendValues = analytics.map((point) => {
      const scansPerUser = toFiniteNumber(point.avgScansPerUser) || 1;
      return Math.max(0, Math.round(point.dau * scansPerUser));
    });
    const trendLabels = analytics.map((point) => point.label);
    return { trendValues, trendLabels };
  }

  const dailyCounts = getDailyCounts(scans);
  if (dailyCounts.length) {
    return {
      trendValues: dailyCounts.map((entry) => entry.count),
      trendLabels: dailyCounts.map((entry) => entry.day.slice(5)),
    };
  }

  return {
    trendValues: [12, 15, 14, 18, 22, 20, 24],
    trendLabels: ["D1", "D2", "D3", "D4", "D5", "D6", "D7"],
  };
}

function toHeroMetrics(
  overview: {
    scansToday: number;
    successRate: number;
  },
  scans: ScanLike[],
  analytics: AnalyticsLike[],
): HeroMetric[] {
  const dailyCounts = getDailyCounts(scans);
  const todayCount = dailyCounts.at(-1)?.count ?? toFiniteNumber(overview.scansToday);
  const previousCount = dailyCounts.at(-2)?.count ?? todayCount;

  const dailyConfidence = getDailyConfidence(scans);
  const latestConfidence =
    dailyConfidence.at(-1)?.confidence || toFiniteNumber(overview.successRate);
  const previousConfidence = dailyConfidence.at(-2)?.confidence || latestConfidence;

  const latestRetention = analytics.at(-1)?.retentionRate ?? 0;
  const previousRetention = analytics.at(-2)?.retentionRate ?? latestRetention;

  return [
    {
      label: "Meals Scanned / Day",
      value: formatCompact(todayCount),
      delta: formatDelta(todayCount, previousCount),
      tone: "text-emerald-300",
    },
    {
      label: "Protein Goal Accuracy",
      value: formatPercent(latestConfidence),
      delta: formatDelta(latestConfidence, previousConfidence),
      tone: "text-sky-300",
    },
    {
      label: "Retention (7D)",
      value: formatPercent(latestRetention),
      delta: formatDelta(latestRetention, previousRetention),
      tone: "text-violet-300",
    },
  ];
}

function buildOverviewFromMock() {
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => !user.isSuspended).length;
  const totalScans = mealScans.length;
  const scansToday = mealScans.filter((scan) => dayKey(scan.createdAt) === new Date().toISOString().slice(0, 10)).length;
  const confidenceValues = mealScans.map((scan) => scan.aiConfidence).filter((score) => score > 0);
  const successRate = average(confidenceValues);
  const activeSubscribers = subscriptions.filter((sub) => sub.status === "active").length;

  return {
    totalUsers,
    activeUsers,
    totalScans,
    scansToday,
    successRate,
    activeSubscribers,
  };
}

function buildDemoData(): HomeDashboardData {
  const overview = buildOverviewFromMock();
  const analytics = analyticsSeries.map((point) => ({
    label: point.label,
    dau: point.dau,
    retentionRate: point.retentionRate,
    avgScansPerUser: 1.25,
  }));

  return {
    heroMetrics: toHeroMetrics(overview, mealScans, analytics),
    scanRows: toScanRows(mealScans),
    macroSplit: toMacroSplit(mealScans),
    ...toTrend(analytics, mealScans),
    dataSource: "demo",
  };
}

function normalizeLiveScans(
  scans: Awaited<ReturnType<typeof getScansData>>,
): ScanLike[] {
  return scans.map((scan) => ({
    detectedFood: scan.detectedFood,
    protein: scan.protein,
    carbs: scan.carbs,
    fats: scan.fats,
    calories: scan.calories,
    aiConfidence: scan.aiConfidence,
    flagged: scan.flagged,
    createdAt: scan.createdAt,
  }));
}

export async function getHomeDashboardData(): Promise<HomeDashboardData> {
  const demoData = buildDemoData();

  try {
    const [overview, scans, analytics] = await Promise.all([
      getOverviewData(),
      getScansData(),
      getAnalyticsData(7),
    ]);

    const liveScans = normalizeLiveScans(scans);
    const validScans = liveScans.length ? liveScans : mealScans;
    const validAnalytics: AnalyticsLike[] = analytics.length
      ? analytics.map((point) => ({
          label: point.label,
          dau: point.dau,
          retentionRate: point.retentionRate,
          avgScansPerUser: point.avgScansPerUser,
        }))
      : [];

    return {
      heroMetrics: toHeroMetrics(overview, validScans, validAnalytics),
      scanRows: toScanRows(validScans),
      macroSplit: toMacroSplit(validScans),
      ...toTrend(validAnalytics, validScans),
      dataSource: "live",
    };
  } catch {
    return demoData;
  }
}
