import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { formatPrice } from "@/lib/format";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  return { title: product ? `${product.name} | NaijaMart` : "Product not found" };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <div>
      <Link href="/" className="text-sm text-stone-500 hover:underline">
        ← Back to products
      </Link>
      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div
          className={`flex h-72 items-center justify-center rounded-3xl bg-gradient-to-br text-9xl md:h-96 ${product.gradient}`}
          aria-hidden="true"
        >
          {product.emoji}
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-wide text-stone-400">{product.category}</p>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-sm text-stone-500">★ {product.rating} rating</p>
          <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
          <p className="text-stone-600">{product.description}</p>
          <p className={`text-sm font-medium ${product.inStock ? "text-emerald-700" : "text-red-600"}`}>
            {product.inStock ? "In stock" : "Currently out of stock"}
          </p>
          <AddToCartButton
            productId={product.id}
            inStock={product.inStock}
            className="w-full py-3 text-base md:w-60"
          />
        </div>
      </div>
    </div>
  );
}
