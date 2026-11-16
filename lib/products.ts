export const categories = ["Fashion", "Gadgets", "Home"] as const;
export type Category = (typeof categories)[number];

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number; // in naira
  category: Category;
  emoji: string;
  gradient: string; // full Tailwind classes so they are not purged
  rating: number;
  inStock: boolean;
};

// Swap emoji/gradient for real images later (use next/image and put files in /public).
export const products: Product[] = [
  {
    id: "ankara-shirt",
    name: "Ankara Print Shirt",
    description:
      "Slim-fit short-sleeve shirt in a bold Ankara print. Breathable cotton, perfect for Lagos weather and weekend outings.",
    price: 18500,
    category: "Fashion",
    emoji: "👔",
    gradient: "from-amber-300 to-orange-500",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "leather-slides",
    name: "Handmade Leather Slides",
    description:
      "Soft, durable leather slides made by local artisans. Comfortable from day one and easy to dress up or down.",
    price: 12000,
    category: "Fashion",
    emoji: "🩴",
    gradient: "from-yellow-200 to-amber-600",
    rating: 4.4,
    inStock: true,
  },
  {
    id: "tote-bag",
    name: "Canvas Tote Bag",
    description:
      "Roomy canvas tote with reinforced handles and an inner zip pocket. Fits a laptop, lunch and more.",
    price: 8500,
    category: "Fashion",
    emoji: "👜",
    gradient: "from-rose-300 to-pink-600",
    rating: 4.2,
    inStock: false,
  },
  {
    id: "power-bank",
    name: "20,000mAh Power Bank",
    description:
      "Fast-charging power bank with two USB ports and USB-C. Keeps your phone alive through power cuts for days.",
    price: 24000,
    category: "Gadgets",
    emoji: "🔋",
    gradient: "from-sky-300 to-blue-600",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "earbuds",
    name: "Wireless Earbuds",
    description:
      "Bluetooth 5.3 earbuds with noise reduction and a charging case that lasts up to 24 hours in total.",
    price: 15500,
    category: "Gadgets",
    emoji: "🎧",
    gradient: "from-violet-300 to-indigo-600",
    rating: 4.3,
    inStock: true,
  },
  {
    id: "led-lamp",
    name: "Rechargeable LED Lamp",
    description:
      "Bright, rechargeable desk lamp with three brightness levels. Runs up to 10 hours on a single charge.",
    price: 9800,
    category: "Home",
    emoji: "💡",
    gradient: "from-lime-200 to-emerald-500",
    rating: 4.5,
    inStock: true,
  },
  {
    id: "blender",
    name: "Portable Blender",
    description:
      "USB-rechargeable blender for smoothies and pap on the go. Easy to rinse and small enough for any bag.",
    price: 21000,
    category: "Home",
    emoji: "🥤",
    gradient: "from-teal-200 to-cyan-600",
    rating: 4.1,
    inStock: true,
  },
  {
    id: "scented-candle",
    name: "Soy Scented Candle",
    description:
      "Hand-poured soy candle with a warm vanilla and coconut scent. Burns cleanly for around 40 hours.",
    price: 6500,
    category: "Home",
    emoji: "🕯️",
    gradient: "from-orange-200 to-red-400",
    rating: 4.7,
    inStock: true,
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
