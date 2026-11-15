import type { UserRole } from "@/generated/prisma/client";

export type Permission =
  | "dashboard:read"
  | "catalog:manage"
  | "catalog:review_clinical"
  | "inventory:manage"
  | "orders:manage"
  | "orders:read_assigned"
  | "orders:read_own"
  | "payments:verify"
  | "customers:read"
  | "employees:manage"
  | "reports:read"
  | "marketing:manage"
  | "settings:manage";

const rolePermissions: Record<UserRole, readonly Permission[]> = {
  OWNER: [
    "dashboard:read", "catalog:manage", "catalog:review_clinical", "inventory:manage",
    "orders:manage", "orders:read_assigned", "orders:read_own", "payments:verify",
    "customers:read", "employees:manage", "reports:read", "marketing:manage", "settings:manage",
  ],
  ADMINISTRATOR: [
    "dashboard:read", "catalog:manage", "catalog:review_clinical", "inventory:manage",
    "orders:manage", "orders:read_assigned", "orders:read_own", "payments:verify",
    "customers:read", "employees:manage", "reports:read", "marketing:manage", "settings:manage",
  ],
  PHARMACIST: ["catalog:review_clinical", "orders:read_assigned", "orders:read_own"],
  INVENTORY_MANAGER: ["inventory:manage", "catalog:manage", "orders:read_assigned"],
  ORDER_MANAGER: ["orders:manage", "orders:read_assigned", "payments:verify", "customers:read"],
  CUSTOMER_SUPPORT: ["orders:read_assigned", "customers:read"],
  MARKETING_MANAGER: ["marketing:manage", "reports:read"],
  CUSTOMER: ["orders:read_own"],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role].includes(permission);
}
