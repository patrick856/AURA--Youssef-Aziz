import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/SiteChrome";
import { ProductCard } from "@/components/ProductCard";
import { findProduct, products } from "@/data/products";
import { useSelection } from "@/context/selection";
import { buildSeoMeta, getProductSchema, getBreadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/piece/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return buildSeoMeta({
        title: "Piece Not Found — AURA",
        description: "The requested piece could not be found.",
        path: "/piece",
        noIndex: true,
      });
    }
    const { product } = loaderData;
    return buildSeoMeta({
      title: `${product.name} — Handcrafted ${product.category} | AURA`,
      description: `${product.description} Made from ${product.materials.join(", ")}. ${product.dimensions}.`,
      path: `/piece/${product.slug}`,
      image: product.images[0],
      type: "product",
    });
  },
  component: PiecePage,
});

function PiecePage() {
  const { product } = Route.useLoaderData();
  const { add, has } = useSelection();
  const selected = has(product.id);

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  const productSchema = JSON.stringify(
    getProductSchema({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      category: product.category,
      price: product.price,
      image: product.images[0],
      materials: product.materials,
      dimensions: product.dimensions,
    })
  );

  const breadcrumbSchema = JSON.stringify(
    getBreadcrumbSchema([
      { name: "Collection", path: "/collection" },
      {
        name: product.category.charAt(0).toUpperCase() + product.category.slice(1),
        path: `/collection/${product.category}`,
      },
      { name: product.name, path: `/piece/${product.slug}` },
    ])
  );

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <section className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Link
          to="/collection/$category"
          params={{ category: product.category }}
          className="text-xs uppercase tracking-[0.28em] opacity-60 link-quiet border-b-0"
        >
          ← {product.category}
        </Link>

        <div className="mt-4 md:mt-10 grid grid-cols-12 gap-y-6 md:gap-y-16 md:gap-x-16">
          <div className="col-span-12 md:col-span-7">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-auto object-contain mix-blend-multiply"
              loading="eager"
            />
          </div>

          <div className="col-span-12 md:col-span-5 md:pt-24">
            <p className="text-xs uppercase tracking-[0.28em] opacity-60">AURA</p>
            <h1 className="mt-3 font-display text-2xl sm:text-3xl md:text-5xl">{product.name}</h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed opacity-85">{product.description}</p>

            <p className="mt-10 text-lg">${product.price}</p>

            <div className="mt-10 space-y-2 text-sm opacity-75">
              <p>{product.dimensions}</p>
              <p>Materials: {product.materials.join(", ")}</p>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                to="/request/$slug"
                params={{ slug: product.slug }}
                className="inline-flex items-center border border-[var(--color-espresso)] px-8 py-4 text-xs uppercase tracking-[0.24em] transition-colors hover:bg-[var(--color-espresso)] hover:text-[var(--color-linen)]"
              >
                Request this piece
              </Link>
              <button
                type="button"
                disabled={selected}
                onClick={() =>
                  add({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    materials: product.materials,
                    image: product.images[0],
                  })
                }
                className="text-xs uppercase tracking-[0.24em] link-quiet"
              >
                {selected ? "In Selection" : "Add to Selection"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 md:mt-40 max-w-[1400px] px-6 md:px-12">
        <h2 className="font-display text-xl sm:text-2xl md:font-sans md:text-xs capitalize md:uppercase tracking-normal md:tracking-[0.28em] text-espresso opacity-90 md:opacity-60">
          Also in the room
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
