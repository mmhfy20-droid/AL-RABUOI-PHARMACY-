import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { loginSchema } from "@/lib/auth-validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "بيانات الدخول غير صحيحة." }, { status: 400 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "خدمة الدخول غير مهيأة حالياً." }, { status: 503 });

  const identifier = parsed.data.identifier.trim();
  const user = await prisma.user.findFirst({
    where: { OR: [{ email: identifier.toLowerCase() }, { phone: identifier.replace(/[\s()-]/g, "") }] },
    select: { id: true, role: true, passwordHash: true, isActive: true },
  });
  if (!user || !user.isActive || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ error: "بيانات الدخول غير صحيحة." }, { status: 401 });
  }

  await createSession({ id: user.id, role: user.role });
  return NextResponse.json({ success: true });
}
