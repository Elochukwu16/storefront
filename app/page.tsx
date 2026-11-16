import Catalog from "@/components/Catalog";
import { products } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <section className="mb-10 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 p-8 text-white md:p-12">
        <h1 className="text-3xl font-bold md:text-4xl">Everyday essentials, delivered.</h1>
        <p className="mt-3 max-w-xl text-emerald-50">
          Fashion, gadgets and home goods from local sellers. Pay securely with your card or
          bank transfer.
        </p>
      </section>
      <Catalog products={products} />
    </>
  );
}
