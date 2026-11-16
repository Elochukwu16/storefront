"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

type Props = {
  productId: string;
  inStock: boolean;
  className?: string;
};

export default function AddToCartButton({ productId, inStock, className = "" }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1200);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <button
      type="button"
      disabled={!inStock}
      onClick={() => {
        addItem(productId);
        setAdded(true);
      }}
      className={`rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-300 ${className}`}
    >
      {!inStock ? "Out of stock" : added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
