"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Naija<span className="text-emerald-600">Mart</span>
        </Link>
        <Link
          href="/cart"
          className="relative rounded-full border border-stone-300 px-4 py-1.5 text-sm font-medium hover:bg-stone-100"
          aria-label={`Cart, ${count} items`}
        >
          Cart
          {count > 0 && (
            <span className="ml-2 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
