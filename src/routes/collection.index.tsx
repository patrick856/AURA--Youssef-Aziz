import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/SiteChrome";
import { ProductCard } from "@/components/ProductCard";
import { byCategory, categoryIntro, categoryOrder } from "@/data/products";

import { buildSeoMeta, getBreadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/collection/")({
  head: () =>
    buildSeoMeta({
      title: "Handcrafted Home Decor Collection — Candles, Vases & Clocks | AURA",
      description:
        "Explore the complete AURA collection of handcrafted candles, hand-thrown stoneware vases, and solid walnut mantel clocks made in small runs.",
      path: "/collection",
    }),
  component: CollectionIndex,
});

function CollectionIndex() {
  const breadcrumbSchema = JSON.stringify(
    getBreadcrumbSchema([{ name: "Collection", path: "/collection" }])
  );

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <section className="mx-auto max-w-[1400px] px-6 md:px-12">
        <p className="text-xs uppercase tracking-[0.28em] opacity-60">Collection</p>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl md:text-6xl max-w-3xl leading-[1.05] md:leading-[1.02]">
          Objects, grouped by their making.
        </h1>
        <div className="mt-5 md:mt-8 flex flex-wrap gap-x-5 md:gap-x-8 gap-y-2 text-[0.72rem] md:text-sm uppercase tracking-[0.20em] md:tracking-[0.22em]">
          {categoryOrder.map((c) => (
            <a key={c} href={`#${c}`} className="link-quiet border-b-0 opacity-70 hover:opacity-100">
              {c}
            </a>
          ))}
        </div>
      </section>

      {categoryOrder.map((cat, idx) => (
        <section
          key={cat}
          id={cat}
          className={
            "mx-auto max-w-[1400px] scroll-mt-32 px-6 md:mt-48 md:px-12 " +
            (idx === 0 ? "mt-14" : "mt-28")
          }
        >
          <div className="flex items-baseline justify-between border-b border-[color-mix(in_oklab,var(--color-espresso)_15%,transparent)] pb-5 md:pb-8">
            <h2 className="font-display text-xl sm:text-2xl md:text-5xl capitalize">{cat}</h2>
            <Link
              to="/collection/$category"
              params={{ category: cat }}
              className="text-xs md:text-sm uppercase tracking-[0.20em] md:tracking-[0.22em] link-quiet border-b-0"
            >
              View {cat}
            </Link>
          </div>
          <p className="mt-6 md:mt-8 max-w-xl text-sm md:text-base opacity-75">{categoryIntro[cat]}</p>

          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
            {byCategory(cat).map((p, i) => (
              <div key={p.id} className={i % 3 === 1 ? "lg:mt-16" : ""}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </PageShell>
  );
}
