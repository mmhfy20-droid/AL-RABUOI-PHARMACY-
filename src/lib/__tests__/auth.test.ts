import { describe, expect, it } from "vitest";
import { registrationSchema } from "../auth-validation";

describe("registrationSchema", () => {
  it("accepts a customer registration with a valid phone and strong password", () => {
    const result = registrationSchema.safeParse({
      fullName: "Customer Name",
      phone: "+967777123456",
      password: "a-very-strong-password",
    });
    expect(result.success).toBe(true);
  });

  it("rejects registration without email or phone", () => {
    const result = registrationSchema.safeParse({
      fullName: "Customer Name",
      password: "a-very-strong-password",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short passwords", () => {
    const result = registrationSchema.safeParse({
      fullName: "Customer Name",
      phone: "777123456",
      password: "short",
    });
    expect(result.success).toBe(false);
  });
});
