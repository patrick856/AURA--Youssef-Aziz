import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/SiteChrome";
import { ProductCard } from "@/components/ProductCard";
import { byCategory, categoryIntro, categoryOrder, type Category } from "@/data/products";

import { buildSeoMeta, getBreadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/collection/$category")({
  loader: ({ params }) => {
    if (!(categoryOrder as string[]).includes(params.category)) throw notFound();
    return { category: params.category as Category };
  },
  head: ({ params }) =>
    buildSeoMeta({
      title: `Handcrafted ${cap(params.category)} — Small Run Decor Objects | AURA`,
      description: categoryIntro[params.category as Category] || `Handcrafted ${params.category} made slowly by hand in limited batches by AURA Studio.`,
      path: `/collection/${params.category}`,
    }),
  component: CategoryPage,
});

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function CategoryPage() {
  const data = Route.useLoaderData();
  const category = data.category as Category;
  const items = byCategory(category);

  const breadcrumbSchema = JSON.stringify(
    getBreadcrumbSchema([
      { name: "Collection", path: "/collection" },
      { name: cap(category), path: `/collection/${category}` },
    ])
  );

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <section className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Link to="/collection" className="text-xs uppercase tracking-[0.28em] opacity-60 link-quiet border-b-0">
          ← Collection
        </Link>
        <h1 className="mt-6 font-display text-2xl sm:text-3xl md:text-6xl capitalize leading-[1.05] md:leading-[1.02]">{category}</h1>
        <p className="mt-6 md:mt-8 max-w-xl text-sm sm:text-base md:text-lg opacity-80">{categoryIntro[category]}</p>
      </section>


      <section className="mx-auto mt-24 max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <div key={p.id} className={i % 3 === 1 ? "lg:mt-24" : ""}>
              <ProductCard product={p} tall={i % 3 === 0} />
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
