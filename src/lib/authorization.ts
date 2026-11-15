import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { readSession } from "@/lib/auth";
import { hasPermission, type Permission } from "@/lib/permissions";

export async function getAuthenticatedUser() {
  const session = await readSession();
  if (!session) return null;
  return prisma.user.findFirst({
    where: { id: session.userId, isActive: true },
    select: { id: true, fullName: true, email: true, phone: true, role: true },
  });
}

export async function requirePermission(permission: Permission) {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/login");
  if (!hasPermission(user.role, permission)) redirect("/");
  return user;
}
