export type AdminRole = "super_admin" | "admin" | "analyst";

export type SubscriptionStatus = "free" | "trial" | "active" | "cancelled";

export interface User {
  id: string;
  name: string;
  email: string;
  subscriptionStatus: SubscriptionStatus;
  totalScans: number;
  createdAt: string;
  lastActive: string;
  isSuspended: boolean;
}

export interface MealScan {
  id: string;
  userId: string;
  imageUrl: string;
  detectedFood: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  aiConfidence: number;
  flagged: boolean;
  createdAt: string;
}

export type PlanType = "free" | "pro_monthly" | "pro_yearly";

export interface Subscription {
  id: string;
  userId: string;
  planType: PlanType;
  price: number;
  status: "active" | "cancelled";
  startDate: string;
  endDate: string;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  status: "active" | "disabled";
}

export interface AnalyticsPoint {
  label: string;
  dau: number;
  mau: number;
  retentionRate: number;
  conversionRate: number;
}
