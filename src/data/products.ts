import { assetPath } from "@/lib/asset-path";

export type Product = {
  id: string;
  name: string;
  category: "Women" | "Men";
  type: "Bag" | "Shoe";
  price: number;
  color: string;
  image: string;
  description: string;
  details: string[];
  sizes: string[];
};
export const products: Product[] = [
  {
    id: "aurora",
    name: "The Aurora Bag",
    category: "Women",
    type: "Bag",
    price: 385,
    color: "Cognac",
    image: assetPath("/images/aurora.webp"),
    description:
      "A sculptural silhouette. A quiet statement. The Aurora brings a soft curve to the everyday, finished with a considered touch of brass.",
    details: [
      "Pebbled leather concept",
      "Brass-tone clasp",
      "Top handle with detachable strap",
      "28 × 20 × 11 cm",
    ],
    sizes: ["One size"],
  },
  {
    id: "heritage",
    name: "The Heritage Tote",
    category: "Men",
    type: "Bag",
    price: 425,
    color: "Espresso",
    image: assetPath("/images/heritage.webp"),
    description:
      "Room for everything that matters. A generous everyday companion with clean lines and an easy, unstructured presence.",
    details: [
      "Smooth leather concept",
      "Open-top silhouette",
      "Interior slip pocket",
      "38 × 30 × 14 cm",
    ],
    sizes: ["One size"],
  },
  {
    id: "noir",
    name: "The Noir Crossbody",
    category: "Women",
    type: "Bag",
    price: 295,
    color: "Black",
    image: assetPath("/images/noir.webp"),
    description:
      "Beautifully understated, effortlessly close. A compact crossbody designed to move from the morning light into the evening.",
    details: [
      "Smooth leather concept",
      "Adjustable shoulder strap",
      "Brass-tone closure",
      "22 × 16 × 7 cm",
    ],
    sizes: ["One size"],
  },
  {
    id: "signature",
    name: "The Signature Loafer",
    category: "Women",
    type: "Shoe",
    price: 265,
    color: "Dark brown",
    image: assetPath("/images/loafer.webp"),
    description:
      "An enduring shape, refined to its essentials. The penny loafer lends a relaxed confidence to every step.",
    details: [
      "Polished leather concept",
      "Classic penny strap",
      "Leather-look sole",
      "European sizing",
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
  },
  {
    id: "classic",
    name: "The Classic Leather Derby",
    category: "Men",
    type: "Shoe",
    price: 310,
    color: "Black",
    image: assetPath("/images/derby.webp"),
    description:
      "Character in every line. A clean lace-up profile that pairs a formal foundation with modern ease.",
    details: [
      "Polished leather concept",
      "Open-lacing construction",
      "Rounded toe",
      "European sizing",
    ],
    sizes: ["40", "41", "42", "43", "44", "45"],
  },
  {
    id: "atelier",
    name: "The Atelier Shoulder Bag",
    category: "Women",
    type: "Bag",
    price: 345,
    color: "Oxblood",
    image: assetPath("/images/atelier.webp"),
    description:
      "A soft crescent in a deep, expressive shade. The Atelier sits naturally at the shoulder, from first plans to last light.",
    details: [
      "Smooth leather concept",
      "Crescent silhouette",
      "Adjustable shoulder handle",
      "30 × 19 × 8 cm",
    ],
    sizes: ["One size"],
  },
];
export const money = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
