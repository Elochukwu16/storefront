import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "NaijaMart | Everyday essentials",
  description: "A demo storefront built with Next.js, TypeScript, Tailwind and Paystack.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
          <footer className="mx-auto max-w-6xl px-4 pb-10 text-center text-xs text-stone-400">
            Demo store. Payments run in Paystack test mode, no real money is charged.
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
