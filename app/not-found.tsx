import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-stone-500">We couldn't find what you were looking for.</p>
      <Link href="/" className="mt-6 inline-block text-emerald-700 hover:underline">
        Back to the store
      </Link>
    </div>
  );
}
