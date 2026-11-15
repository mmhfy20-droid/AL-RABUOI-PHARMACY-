import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254).optional().or(z.literal("")),
  phone: z.string().trim().regex(/^[0-9+()\-\s]{7,20}$/).optional().or(z.literal("")),
  password: z.string().min(12).max(128),
}).refine((data) => Boolean(data.email || data.phone), {
  message: "An email address or phone number is required.",
  path: ["email"],
});

export const loginSchema = z.object({
  identifier: z.string().trim().min(3).max(254),
  password: z.string().min(1).max(128),
});
