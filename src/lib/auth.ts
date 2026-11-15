import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { UserRole } from "@prisma/client";

const COOKIE_NAME = "alr_session";
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function getSecret() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) throw new Error("AUTH_SECRET must be configured with at least 32 characters.");
  return new TextEncoder().encode(value);
}

export async function createSession(user: { id: string; role: UserRole }) {
  const token = await new SignJWT({ role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_SECONDS}s`)
    .sign(getSecret());

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function readSession(): Promise<{ userId: string; role: UserRole } | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const verified = await jwtVerify(token, getSecret(), { algorithms: ["HS256"] });
    const role = verified.payload.role;
    const roles: UserRole[] = ["OWNER", "ADMINISTRATOR", "PHARMACIST", "INVENTORY_MANAGER", "ORDER_MANAGER", "CUSTOMER_SUPPORT", "MARKETING_MANAGER", "CUSTOMER"];
    if (typeof verified.payload.sub !== "string" || typeof role !== "string" || !roles.includes(role as UserRole)) return null;
    return { userId: verified.payload.sub, role: role as UserRole };
  } catch {
    return null;
  }
}

export async function clearSession() {
  const jar = await cookies();
  jar.set(COOKIE_NAME, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
}
