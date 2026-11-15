export function parseCartQuantity(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 1 || value > 99) {
    throw new Error("Quantity must be a whole number between 1 and 99.");
  }
  return value;
}
