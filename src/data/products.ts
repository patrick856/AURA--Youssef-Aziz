import candle1 from "@/assets/candle-1.jpg";
import candle2 from "@/assets/candle-2.jpg";
import vase1 from "@/assets/vase-1.jpg";
import vase2 from "@/assets/vase-2.jpg";
import vase3 from "@/assets/vase-3.jpg";
import clock1 from "@/assets/clock-1.jpg";
import clock2 from "@/assets/clock-2.jpg";

export type Category = "candles" | "vases" | "clocks";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  materials: string[];
  dimensions: string;
  description: string;
  images: string[];
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "c-01",
    slug: "linen-pillar",
    name: "Linen Pillar",
    category: "candles",
    price: 68,
    materials: ["soy wax", "linen wick", "stoneware base"],
    dimensions: "H 140mm  W 80mm  D 80mm",
    description:
      "Soy wax poured slowly. Set on a stoneware collar, hand-finished.",
    images: [candle1],
    featured: true,
  },
  {
    id: "c-02",
    slug: "beeswax-short",
    name: "Beeswax Short",
    category: "candles",
    price: 42,
    materials: ["beeswax", "cotton wick"],
    dimensions: "H 90mm  W 70mm  D 70mm",
    description: "Pure beeswax. Burns warm and honey-scented.",
    images: [candle2],
    featured: false,
  },
  {
    id: "v-01",
    slug: "raw-tan-carafe",
    name: "Raw Tan Carafe",
    category: "vases",
    price: 210,
    materials: ["stoneware", "unglazed"],
    dimensions: "H 320mm  W 120mm  D 120mm",
    description:
      "Hand-thrown stoneware. Unglazed body, softly banded at the shoulder.",
    images: [vase1],
    featured: true,
  },
  {
    id: "v-02",
    slug: "sage-bud",
    name: "Sage Bud",
    category: "vases",
    price: 145,
    materials: ["stoneware", "sage matte glaze"],
    dimensions: "H 180mm  W 160mm  D 160mm",
    description:
      "A rounded bud vase in dusty sage. Matte, hand-thrown, kiln-fired.",
    images: [vase2],
    featured: true,
  },
  {
    id: "v-03",
    slug: "long-neck",
    name: "Long Neck",
    category: "vases",
    price: 260,
    materials: ["stoneware"],
    dimensions: "H 460mm  W 140mm  D 140mm",
    description: "A single stem is enough. Hand-thrown, quietly banded.",
    images: [vase3],
    featured: false,
  },
  {
    id: "k-01",
    slug: "mantel-walnut",
    name: "Mantel Walnut",
    category: "clocks",
    price: 480,
    materials: ["solid walnut", "brass"],
    dimensions: "H 240mm  W 220mm  D 90mm",
    description:
      "Solid walnut, hand-jointed. Brass hands, quiet German movement.",
    images: [clock1],
    featured: true,
  },
  {
    id: "k-02",
    slug: "desk-square",
    name: "Desk Square",
    category: "clocks",
    price: 320,
    materials: ["walnut", "brass"],
    dimensions: "H 110mm  W 110mm  D 60mm",
    description: "A small desk clock. Walnut face, brass indices.",
    images: [clock2],
    featured: false,
  },
];

export const findProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const byCategory = (c: Category) =>
  products.filter((p) => p.category === c);

export const categoryIntro: Record<Category, string> = {
  candles:
    "Soy and beeswax, poured slowly. Held in stoneware finished by hand.",
  vases:
    "Hand-thrown stoneware. Some unglazed, some banded in sage — each one made in small runs.",
  clocks:
    "Solid walnut, hand-jointed. Brass hands, quiet movements. Made to sit for years.",
};

export const categoryOrder: Category[] = ["candles", "vases", "clocks"];
