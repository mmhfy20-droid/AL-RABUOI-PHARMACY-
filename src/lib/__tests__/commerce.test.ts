import { describe, expect, it } from "vitest";
import { calculateOrderTotals, canTransitionOrder } from "../commerce";

describe("calculateOrderTotals", () => {
  it("calculates subtotal, discount, delivery and final total in minor currency units", () => {
    expect(calculateOrderTotals({
      items: [{ unitPrice: 1250, quantity: 2 }, { unitPrice: 500, quantity: 1 }],
      discount: 300,
      deliveryFee: 250,
    })).toEqual({ subtotal: 3000, discount: 300, deliveryFee: 250, total: 2950 });
  });

  it("rejects an empty order", () => {
    expect(() => calculateOrderTotals({ items: [], discount: 0, deliveryFee: 0 })).toThrow();
  });

  it("rejects negative amounts and invalid quantities", () => {
    expect(() => calculateOrderTotals({
      items: [{ unitPrice: -1, quantity: 1 }], discount: 0, deliveryFee: 0,
    })).toThrow();
    expect(() => calculateOrderTotals({
      items: [{ unitPrice: 100, quantity: 0 }], discount: 0, deliveryFee: 0,
    })).toThrow();
  });

  it("does not allow discounts or fees to create a negative total", () => {
    expect(() => calculateOrderTotals({
      items: [{ unitPrice: 100, quantity: 1 }], discount: 101, deliveryFee: 0,
    })).toThrow();
  });
});

describe("canTransitionOrder", () => {
  it("allows only the documented forward order transitions", () => {
    expect(canTransitionOrder("PENDING", "CONFIRMED")).toBe(true);
    expect(canTransitionOrder("PENDING", "COMPLETED")).toBe(false);
    expect(canTransitionOrder("COMPLETED", "PREPARING")).toBe(false);
  });

  it("allows cancellation only before dispatch or completion", () => {
    expect(canTransitionOrder("CONFIRMED", "CANCELLED")).toBe(true);
    expect(canTransitionOrder("OUT_FOR_DELIVERY", "CANCELLED")).toBe(false);
    expect(canTransitionOrder("COMPLETED", "CANCELLED")).toBe(false);
  });
});
