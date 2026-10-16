import { test } from "node:test";
import assert from "node:assert/strict";
import { cartReducer, restoreCart } from "../src/lib/cart.ts";
const catalog = [{ id: "shoe", sizes: ["41", "42"] }];
test("same size aggregates, different sizes stay separate", () => {
  let cart = cartReducer([], { type: "add", id: "shoe", size: "41" });
  cart = cartReducer(cart, { type: "add", id: "shoe", size: "41" });
  cart = cartReducer(cart, { type: "add", id: "shoe", size: "42" });
  assert.deepEqual(cart, [
    { id: "shoe", size: "41", quantity: 2 },
    { id: "shoe", size: "42", quantity: 1 },
  ]);
});
test("quantity cannot exceed ten and zero removes the line", () => {
  const line = [{ id: "shoe", size: "41", quantity: 10 }];
  assert.equal(
    cartReducer(line, { type: "add", id: "shoe", size: "41" })[0].quantity,
    10,
  );
  assert.deepEqual(
    cartReducer(line, {
      type: "quantity",
      id: "shoe",
      size: "41",
      quantity: 0,
    }),
    [],
  );
});
test("invalid saved cart data is discarded safely", () => {
  assert.deepEqual(restoreCart("broken", catalog), []);
  assert.deepEqual(restoreCart('{"id":"shoe"}', catalog), []);
  assert.deepEqual(
    restoreCart(
      JSON.stringify([
        { id: "fake", size: "41", quantity: 2 },
        { id: "shoe", size: "99", quantity: 1 },
        { id: "shoe", size: "41", quantity: -1 },
        { id: "shoe", size: "42", quantity: 3.1 },
      ]),
      catalog,
    ),
    [],
  );
});
test("saved quantities are clamped and duplicate lines are removed", () => {
  assert.deepEqual(
    restoreCart(
      JSON.stringify([
        { id: "shoe", size: "41", quantity: 99 },
        { id: "shoe", size: "41", quantity: 2 },
      ]),
      catalog,
    ),
    [{ id: "shoe", size: "41", quantity: 10 }],
  );
});
