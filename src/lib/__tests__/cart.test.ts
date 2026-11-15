import { describe, expect, it } from "vitest";
import { parseCartQuantity } from "../cart";

describe("parseCartQuantity", () => {
  it("accepts positive integer quantities up to the cart limit", () => {
    expect(parseCartQuantity(1)).toBe(1);
    expect(parseCartQuantity(99)).toBe(99);
  });

  it("rejects zero, negative, fractional, and excessive quantities", () => {
    for (const quantity of [0, -1, 1.5, 100, "2", null]) {
      expect(() => parseCartQuantity(quantity)).toThrow();
    }
  });
});

