"use client";

import Script from "next/script";
import { useState } from "react";

type Props = {
  email: string;
  amount: number; // in naira
  disabled?: boolean;
  onSuccess: (reference: string) => void;
};

export default function CheckoutButton({ email, amount, disabled, onSuccess }: Props) {
  const [error, setError] = useState("");
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  function pay() {
    setError("");

    if (!publicKey) {
      setError("Missing Paystack key. Add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY to .env.local and restart.");
      return;
    }
    if (!window.PaystackPop) {
      setError("Payment window is still loading. Please try again in a moment.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: Math.round(amount * 100), // Paystack expects kobo
      currency: "NGN",
      ref: `order_${Date.now()}`,
      callback: (response) => onSuccess(response.reference),
      onClose: () => {
        // user closed the popup without paying
      },
    });
    handler.openIframe();
  }

  return (
    <div>
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
      <button
        type="button"
        onClick={pay}
        disabled={disabled}
        className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-300"
      >
        Pay with Paystack
      </button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
