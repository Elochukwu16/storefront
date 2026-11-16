import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/products/${product.id}`} className="block">
        <div
          className={`flex h-44 items-center justify-center bg-gradient-to-br text-6xl ${product.gradient}`}
          aria-hidden="true"
        >
          {product.emoji}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${product.id}`}
            className="font-semibold leading-snug hover:underline"
          >
            {product.name}
          </Link>
          <span className="shrink-0 text-xs text-stone-500">★ {product.rating}</span>
        </div>
        <p className="text-xs uppercase tracking-wide text-stone-400">{product.category}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-bold">{formatPrice(product.price)}</span>
          <AddToCartButton productId={product.id} inStock={product.inStock} />
        </div>
      </div>
    </article>
  );
}
