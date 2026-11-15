import { describe, expect, it } from "vitest";
import { formatMinorCurrency } from "../money";

describe("formatMinorCurrency", () => {
  it("formats minor units as a major currency amount", () => {
    expect(formatMinorCurrency(12550, "YER")).toContain("125.5");
    expect(formatMinorCurrency(1099, "USD")).toContain("10.99");
  });

  it("falls back to YER for an unsupported currency code", () => {
    expect(formatMinorCurrency(10000, "EUR")).toContain("YER");
  });
});
