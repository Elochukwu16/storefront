"use client";

import Link from "next/link";
import { useState } from "react";
import CheckoutButton from "@/components/CheckoutButton";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

const DELIVERY_FEE = 2000;
const FREE_DELIVERY_ABOVE = 50000;

export default function CartPage() {
  const { lines, subtotal, setQuantity, removeItem, clear } = useCart();
  const [email, setEmail] = useState("");
  const [paidRef, setPaidRef] = useState<string | null>(null);

  const delivery = subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;
  const emailValid = /^\S+@\S+\.\S+$/.test(email);

  if (paidRef) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-emerald-200 bg-white p-8 text-center">
        <p className="text-4xl">🎉</p>
        <h1 className="mt-3 text-2xl font-bold">Payment successful</h1>
        <p className="mt-2 text-stone-600">Thanks for your order. Your reference is:</p>
        <p className="mt-1 break-all font-mono text-sm">{paidRef}</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-2 font-semibold text-white hover:bg-emerald-700"
        >
          Keep shopping
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-stone-500">Add a few things and they will show up here.</p>
        <Link href="/" className="mt-6 inline-block text-emerald-700 hover:underline">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Your cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {lines.map(({ product, quantity }) => (
            <li
              key={product.id}
              className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-4"
            >
              <div
                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-3xl ${product.gradient}`}
                aria-hidden="true"
              >
                {product.emoji}
              </div>
              <div className="flex-1">
                <Link href={`/products/${product.id}`} className="font-semibold hover:underline">
                  {product.name}
                </Link>
                <p className="text-sm text-stone-500">{formatPrice(product.price)}</p>
                <button
                  type="button"
                  onClick={() => removeItem(product.id)}
                  className="mt-1 text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity(product.id, quantity - 1)}
                  aria-label={`Decrease quantity of ${product.name}`}
                  className="h-8 w-8 rounded-full border border-stone-300 hover:bg-stone-100"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(product.id, quantity + 1)}
                  aria-label={`Increase quantity of ${product.name}`}
                  className="h-8 w-8 rounded-full border border-stone-300 hover:bg-stone-100"
                >
                  +
                </button>
              </div>
              <p className="w-24 text-right font-semibold">{formatPrice(product.price * quantity)}</p>
            </li>
          ))}
        </ul>

        <aside className="h-fit space-y-4 rounded-2xl border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-stone-500">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Delivery</dt>
              <dd>{delivery === 0 ? "Free" : formatPrice(delivery)}</dd>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-2 text-base font-bold">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          {subtotal < FREE_DELIVERY_ABOVE && (
            <p className="text-xs text-stone-500">
              Spend {formatPrice(FREE_DELIVERY_ABOVE - subtotal)} more for free delivery.
            </p>
          )}

          <label className="block text-sm">
            <span className="mb-1 block font-medium">Email for your receipt</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-emerald-600"
            />
          </label>

          <CheckoutButton
            email={email}
            amount={total}
            disabled={!emailValid}
            onSuccess={(ref) => {
              setPaidRef(ref);
              clear();
            }}
          />
          <p className="text-center text-xs text-stone-400">
            Test mode. Use Paystack's test card details.
          </p>
        </aside>
      </div>
    </div>
  );
}
