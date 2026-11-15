import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/authorization";
import { parseCartQuantity } from "@/lib/cart";

const quantitySchema = z.object({ quantity: z.number().int().min(1).max(99) });

export async function PATCH(request: Request, { params }: { params: Promise<{ itemId: string }> }) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ error: "يلزم تسجيل الدخول." }, { status: 401 });
  const { itemId } = await params;
  const body = await request.json().catch(() => null);
  const parsed = quantitySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "الكمية غير صحيحة." }, { status: 400 });

  const item = await prisma.cartItem.findFirst({
    where: { id: itemId, cart: { userId: user.id } },
    include: { product: { include: { inventory: true } } },
  });
  if (!item) return NextResponse.json({ error: "عنصر السلة غير موجود." }, { status: 404 });
  const quantity = parseCartQuantity(parsed.data.quantity);
  if (quantity > (item.product.inventory?.quantity ?? 0)) {
    return NextResponse.json({ error: "الكمية المطلوبة تتجاوز المخزون المتاح." }, { status: 409 });
  }
  await prisma.cartItem.update({ where: { id: item.id }, data: { quantity } });
  return NextResponse.json({ success: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ itemId: string }> }) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ error: "يلزم تسجيل الدخول." }, { status: 401 });
  const { itemId } = await params;
  const item = await prisma.cartItem.findFirst({ where: { id: itemId, cart: { userId: user.id } }, select: { id: true } });
  if (!item) return NextResponse.json({ error: "عنصر السلة غير موجود." }, { status: 404 });
  await prisma.cartItem.delete({ where: { id: item.id } });
  return NextResponse.json({ success: true });
}
