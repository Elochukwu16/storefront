# NaijaMart: a Next.js storefront with Paystack checkout

A demo e-commerce site built with Next.js (App Router), TypeScript and Tailwind CSS.

## Features

- Product catalog with debounced search, category filters and sorting
- Product detail pages (statically generated)
- Cart with quantity controls, saved in localStorage
- Delivery fee logic (free above ₦50,000)
- Paystack checkout in test mode
- Fully responsive, accessible labels on controls

## Run it locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add your Paystack **test** public key. Copy the example file and edit it:

   ```bash
   cp .env.example .env.local
   ```

   Get the key from the Paystack dashboard (Settings → API Keys & Webhooks) and use the one that starts with `pk_test_`.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

## Test payments

Paystack documents test cards at https://paystack.com/docs/payments/test-payments. Use those details in the popup. No real money moves in test mode.

## Deploy

Push to GitHub, import the repo on Vercel, and add `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` under Project Settings → Environment Variables.

## Project structure

```
app/            routes (home, product page, cart)
components/     Header, Catalog, ProductCard, AddToCartButton, CheckoutButton
context/        CartContext (cart state + localStorage)
lib/            product data and price formatting
types/          Paystack window typings
```

## Known limitations (good next steps)

- **Payments are not verified on a server.** The success screen trusts the popup callback. In production, verify every transaction on your backend with your secret key (`/transaction/verify/:reference`) or use Paystack webhooks before marking an order paid.
- Product data is hardcoded in `lib/products.ts`. Move it to a database (Supabase or Firebase) and add an admin page.
- No user accounts or order history yet.
- Products use emoji placeholders. Replace them with real images via `next/image`.

## What I'd improve next

1. Server-side payment verification with a Route Handler.
2. Real product images and a gallery on the detail page.
3. Order history with authentication.
4. Tests for the cart logic.
