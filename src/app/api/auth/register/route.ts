import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth";
import { registrationSchema } from "@/lib/auth-validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "بيانات التسجيل غير صحيحة." }, { status: 400 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "خدمة التسجيل غير مهيأة حالياً." }, { status: 503 });

  const email = parsed.data.email?.trim().toLowerCase() || null;
  const phone = parsed.data.phone?.replace(/[\s()-]/g, "") || null;
  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  try {
    const user = await prisma.user.create({
      data: { fullName: parsed.data.fullName, email, phone, passwordHash, role: "CUSTOMER" },
      select: { id: true, role: true },
    });
    await createSession(user);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "البريد الإلكتروني أو رقم الهاتف مستخدم بالفعل." }, { status: 409 });
    }
    return NextResponse.json({ error: "تعذر إنشاء الحساب حالياً." }, { status: 503 });
  }
}
