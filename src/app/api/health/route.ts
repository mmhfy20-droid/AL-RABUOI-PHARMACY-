import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  let database: "connected" | "not_configured" | "unavailable" = "not_configured";
  if (process.env.DATABASE_URL) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      database = "connected";
    } catch {
      database = "unavailable";
    }
  }
  return NextResponse.json(
    { status: database === "connected" ? "ok" : "degraded", database },
    { status: database === "connected" ? 200 : 503 },
  );
}
