import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { products } from "@/data/products";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const dateStr = new Date().toISOString().split("T")[0];

        const routes = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/collection", priority: "0.9", changefreq: "weekly" },
          { path: "/collection/candles", priority: "0.8", changefreq: "weekly" },
          { path: "/collection/vases", priority: "0.8", changefreq: "weekly" },
          { path: "/collection/clocks", priority: "0.8", changefreq: "weekly" },
          { path: "/about", priority: "0.7", changefreq: "monthly" },
          { path: "/contact", priority: "0.6", changefreq: "monthly" },
          ...products.map((p) => ({
            path: `/piece/${p.slug}`,
            priority: "0.8",
            changefreq: "weekly",
          })),
        ];

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...routes.map(
            (r) =>
              `  <url>\n    <loc>${absoluteUrl(r.path)}</loc>\n    <lastmod>${dateStr}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
          ),
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
