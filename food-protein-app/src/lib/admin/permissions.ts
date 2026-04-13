import { AdminRole } from "./types";

export const canDeleteUser = (role: AdminRole) => role === "super_admin";

export const canModifySubscriptionPlans = (role: AdminRole) => role === "super_admin";

export const canEditFoodDatabase = (role: AdminRole) => role === "super_admin" || role === "admin";

export const canAdjustNutrition = (role: AdminRole) => role === "super_admin" || role === "admin";
