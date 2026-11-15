import { NextResponse } from "next/server";
import { z } from "zod";
import { getAssistantReadiness } from "@/lib/assistant-config";

const messageSchema = z.object({
  message: z.string().trim().min(1).max(2000),
});

export async function GET() {
  const readiness = getAssistantReadiness();
  return NextResponse.json({
    assistant: readiness,
    integration: {
      available: false,
      status: "provider_adapter_pending",
    },
  });
}

export async function POST(request: Request) {
  const payload: unknown = await request.json().catch(() => null);
  const parsed = messageSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "أدخل رسالة صحيحة لا تتجاوز 2000 حرف." },
      { status: 400 },
    );
  }

  const readiness = getAssistantReadiness();
  if (!readiness.ready) {
    return NextResponse.json(
      {
        code: "ASSISTANT_NOT_CONFIGURED",
        assistant: readiness.name,
        missing: readiness.missing,
        error: "مساعد AL-RABUOI ينتظر إعداد بيانات الاتصال.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json(
    {
      code: "PROVIDER_ADAPTER_PENDING",
      assistant: readiness.name,
      error: "بيانات المزود موجودة، لكن موصل الذكاء الاصطناعي لم يُنفّذ بعد.",
    },
    { status: 501 },
  );
}
