"use client";

import { useEffect, useMemo, useState } from "react";
import { categories, type Category, type Product } from "@/lib/products";
import ProductCard from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

export default function Catalog({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [sort, setSort] = useState<Sort>("featured");

  // Debounce the search box so we don't re-filter on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 250);
    return () => clearTimeout(t);
  }, [query]);

  const visible = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !debounced ||
        p.name.toLowerCase().includes(debounced) ||
        p.description.toLowerCase().includes(debounced);
      return matchesCategory && matchesQuery;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, debounced, sort]);

  return (
    <section>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm outline-none focus:border-emerald-600 md:max-w-sm"
        />
        <div className="flex flex-wrap items-center gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full border px-3 py-1 text-sm ${
                category === c
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-stone-300 bg-white hover:bg-stone-100"
              }`}
            >
              {c}
            </button>
          ))}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort products"
            className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-300 p-10 text-center text-stone-500">
          No products match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
