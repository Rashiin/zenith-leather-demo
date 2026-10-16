export type CartLine = { id: string; size: string; quantity: number };
export type CartAction =
  | { type: "add"; id: string; size: string }
  | { type: "quantity"; id: string; size: string; quantity: number }
  | { type: "remove"; id: string; size: string }
  | { type: "restore"; lines: CartLine[] };
export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  if (action.type === "restore") return action.lines;
  const matches = (line: CartLine) =>
    line.id === action.id && line.size === action.size;
  if (action.type === "remove") return state.filter((line) => !matches(line));
  if (action.type === "quantity")
    return action.quantity <= 0
      ? state.filter((line) => !matches(line))
      : state.map((line) =>
          matches(line)
            ? { ...line, quantity: Math.min(10, Math.floor(action.quantity)) }
            : line,
        );
  if (state.some(matches))
    return state.map((line) =>
      matches(line)
        ? { ...line, quantity: Math.min(10, line.quantity + 1) }
        : line,
    );
  return [...state, { id: action.id, size: action.size, quantity: 1 }];
}
export function restoreCart(
  raw: string | null,
  catalog: { id: string; sizes: string[] }[],
): CartLine[] {
  try {
    const parsed: unknown = JSON.parse(raw || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.reduce<CartLine[]>((valid, item) => {
      if (!item || typeof item !== "object") return valid;
      const p = catalog.find((p) => p.id === item.id);
      if (
        !p ||
        !p.sizes.includes(item.size) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      )
        return valid;
      if (valid.some((line) => line.id === item.id && line.size === item.size))
        return valid;
      return [
        ...valid,
        { id: item.id, size: item.size, quantity: Math.min(10, item.quantity) },
      ];
    }, []);
  } catch {
    return [];
  }
}
