export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY_FOR_DELIVERY"
  | "OUT_FOR_DELIVERY"
  | "COMPLETED"
  | "CANCELLED";

export interface OrderLineInput {
  unitPrice: number;
  quantity: number;
}

export interface OrderTotalsInput {
  items: OrderLineInput[];
  discount: number;
  deliveryFee: number;
}

export interface OrderTotals {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
}

/**
 * All monetary values are integer minor units (for example, fils/cents).
 * Currency display and conversion are intentionally handled separately.
 */
export function calculateOrderTotals(input: OrderTotalsInput): OrderTotals {
  if (!Array.isArray(input.items) || input.items.length === 0) {
    throw new Error("An order must contain at least one item.");
  }
  if (!Number.isSafeInteger(input.discount) || input.discount < 0) {
    throw new Error("Discount must be a non-negative integer amount.");
  }
  if (!Number.isSafeInteger(input.deliveryFee) || input.deliveryFee < 0) {
    throw new Error("Delivery fee must be a non-negative integer amount.");
  }

  const subtotal = input.items.reduce((sum, item) => {
    if (!Number.isSafeInteger(item.unitPrice) || item.unitPrice < 0) {
      throw new Error("Unit price must be a non-negative integer amount.");
    }
    if (!Number.isSafeInteger(item.quantity) || item.quantity < 1) {
      throw new Error("Quantity must be a positive integer.");
    }
    const lineTotal = item.unitPrice * item.quantity;
    if (!Number.isSafeInteger(lineTotal) || !Number.isSafeInteger(sum + lineTotal)) {
      throw new Error("Order amount exceeds the supported safe integer range.");
    }
    return sum + lineTotal;
  }, 0);

  if (input.discount > subtotal) {
    throw new Error("Discount cannot exceed the subtotal.");
  }

  const total = subtotal - input.discount + input.deliveryFee;
  if (!Number.isSafeInteger(total)) {
    throw new Error("Order total exceeds the supported safe integer range.");
  }

  return { subtotal, discount: input.discount, deliveryFee: input.deliveryFee, total };
}

const transitions: Record<OrderStatus, readonly OrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY_FOR_DELIVERY", "CANCELLED"],
  READY_FOR_DELIVERY: ["OUT_FOR_DELIVERY", "CANCELLED"],
  OUT_FOR_DELIVERY: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
};

export function canTransitionOrder(from: OrderStatus, to: OrderStatus): boolean {
  return transitions[from].includes(to);
}
