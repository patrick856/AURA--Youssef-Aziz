import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/SiteChrome";
import { ProductCard } from "@/components/ProductCard";
import { byCategory, categoryIntro, categoryOrder, type Category } from "@/data/products";

export const Route = createFileRoute("/collection/$category")({
  loader: ({ params }) => {
    if (!(categoryOrder as string[]).includes(params.category)) throw notFound();
    return { category: params.category as Category };
  },
  head: ({ params }) => ({
    meta: [
      { title: `${cap(params.category)} — AURA` },
      { name: "description", content: `Handcrafted ${params.category}. Made in small runs.` },
      { property: "og:title", content: `${cap(params.category)} — AURA` },
    ],
    links: [{ rel: "canonical", href: `/collection/${params.category}` }],
  }),
  component: CategoryPage,
});

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = byCategory(category);
  const intro = categoryIntro[category];

  return (
    <PageShell>
      <section className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Link to="/collection" className="text-xs uppercase tracking-[0.28em] opacity-60 link-quiet border-b-0">
          ← Collection
        </Link>
        <h1 className="mt-6 font-display text-4xl md:text-6xl capitalize">{category}</h1>
        <p className="mt-8 max-w-xl text-lg opacity-80">{categoryIntro[category]}</p>
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
