export const DEFAULT_SITE_URL = "https://aura-home.com";

export function getSiteUrl(): string {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }
  return import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const baseUrl = getSiteUrl().replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

export interface SeoMetaProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "product";
  noIndex?: boolean;
}

export function buildSeoMeta({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: SeoMetaProps) {
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : absoluteUrl("/favicon.ico");

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { name: "author", content: "AURA Studio" },

    // Open Graph
    { property: "og:site_name", content: "AURA" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: imageUrl },
    { property: "og:locale", content: "en_US" },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];

  if (noIndex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  } else {
    meta.push({ name: "robots", content: "index, follow, max-image-preview:large" });
  }

  return {
    meta,
    links: [{ rel: "canonical", href: canonicalUrl }],
  };
}

// JSON-LD Generators
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeGoodsStore",
    "name": "AURA",
    "url": getSiteUrl(),
    "logo": absoluteUrl("/favicon.ico"),
    "description": "Handcrafted candles, vases and clocks. Made by hand, one small piece at a time.",
    "email": "studio@aura.example",
    "priceRange": "$$",
    "knowsAbout": ["Handcrafted Home Decor", "Ceramic Vases", "Soy Candles", "Walnut Clocks"],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AURA",
    "url": getSiteUrl(),
    "description": "Handcrafted candles, vases and clocks. Made by hand, one small piece at a time.",
    "publisher": {
      "@type": "Organization",
      "name": "AURA",
    },
  };
}

export interface ProductSchemaData {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  image: string;
  materials: string[];
  dimensions: string;
}

export function getProductSchema(product: ProductSchemaData) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": [
      product.image.startsWith("http")
        ? product.image
        : absoluteUrl(product.image),
    ],
    "description": product.description,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "AURA",
    },
    "category": product.category,
    "material": product.materials.join(", "),
    "offers": {
      "@type": "Offer",
      "url": absoluteUrl(`/piece/${product.slug}`),
      "priceCurrency": "USD",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "AURA",
      },
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": absoluteUrl(item.path),
    })),
  };
}
