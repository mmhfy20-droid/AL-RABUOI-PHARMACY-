import { describe, expect, it } from "vitest";
import { hasPermission } from "../permissions";

describe("role permissions", () => {
  it("grants owner access to all administrative capabilities", () => {
    expect(hasPermission("OWNER", "dashboard:read")).toBe(true);
    expect(hasPermission("OWNER", "employees:manage")).toBe(true);
    expect(hasPermission("OWNER", "payments:verify")).toBe(true);
  });

  it("limits inventory managers to inventory capabilities", () => {
    expect(hasPermission("INVENTORY_MANAGER", "inventory:manage")).toBe(true);
    expect(hasPermission("INVENTORY_MANAGER", "marketing:manage")).toBe(false);
    expect(hasPermission("INVENTORY_MANAGER", "employees:manage")).toBe(false);
  });

  it("does not grant administrative permissions to customers", () => {
    expect(hasPermission("CUSTOMER", "dashboard:read")).toBe(false);
    expect(hasPermission("CUSTOMER", "orders:read_own")).toBe(true);
  });
});
