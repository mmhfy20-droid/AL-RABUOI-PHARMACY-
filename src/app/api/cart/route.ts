import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/authorization";
import { parseCartQuantity } from "@/lib/cart";

const addItemSchema = z.object({
  productId: z.string().min(1).max(64),
  quantity: z.number().int().min(1).max(99).default(1),
});

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ error: "يلزم تسجيل الدخول." }, { status: 401 });
  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: { include: { product: { include: { inventory: true, images: { orderBy: { sortOrder: "asc" }, take: 1 } } } } } },
  });
  const items = (cart?.items ?? []).map((item) => ({
    id: item.id,
    productId: item.productId,
    nameAr: item.product.nameAr,
    unitPrice: item.product.priceMinor,
    currency: item.product.currency,
    quantity: item.quantity,
    stock: item.product.inventory?.quantity ?? 0,
    imageUrl: item.product.images[0]?.url ?? null,
    lineTotal: item.product.priceMinor * item.quantity,
  }));
  return NextResponse.json({ items, subtotal: items.reduce((sum, item) => sum + item.lineTotal, 0) });
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ error: "يلزم تسجيل الدخول." }, { status: 401 });
  const body = await request.json().catch(() => null);
  const parsed = addItemSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "بيانات المنتج أو الكمية غير صحيحة." }, { status: 400 });

  try {
    const quantity = parseCartQuantity(parsed.data.quantity);
    const product = await prisma.product.findFirst({
      where: { id: parsed.data.productId, isPublished: true },
      include: { inventory: true },
    });
    if (!product) return NextResponse.json({ error: "المنتج غير متاح." }, { status: 404 });
    const stock = product.inventory?.quantity ?? 0;
    const cart = await prisma.cart.upsert({
      where: { userId: user.id },
      create: { userId: user.id },
      update: {},
    });
    const existing = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId: product.id } },
    });
    const nextQuantity = (existing?.quantity ?? 0) + quantity;
    if (nextQuantity > stock) return NextResponse.json({ error: "الكمية المطلوبة تتجاوز المخزون المتاح." }, { status: 409 });
    await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId: product.id } },
      create: { cartId: cart.id, productId: product.id, quantity },
      update: { quantity: nextQuantity },
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "تعذر تحديث السلة." }, { status: 400 });
  }
}
