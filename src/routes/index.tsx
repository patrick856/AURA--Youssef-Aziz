import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/SiteChrome";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import heroPiece from "@/assets/hero-piece.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURA — Made by hand, one small piece at a time" },
      {
        name: "description",
        content:
          "A room becomes a home, slowly, by hand. Handcrafted candles, vases and clocks from AURA.",
      },
      { property: "og:title", content: "AURA — Handcrafted home decor" },
      {
        property: "og:description",
        content: "Made by hand, one small piece at a time.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <PageShell>
      {/* Hero — headline sticks while the image scrolls past */}
      <section className="relative mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-12 gap-y-8 md:gap-x-8">
          <div className="col-span-12 md:col-span-6 md:sticky md:top-28 md:self-start flex flex-col md:mt-[10vh]">

            <h1 className="font-display text-[2.5rem] leading-[1.02] md:text-[5.5rem] md:leading-[0.98] tracking-[-0.02em]">
              Made by hand,
              <br />
              one small piece
              <br />
              at a time.
            </h1>
            <p className="max-w-md text-lg opacity-80 mt-8">
              That's how a room becomes a home.
            </p>
          </div>


          <div className="col-span-12 md:col-span-6 relative">
            <img
              src={heroPiece}
              alt="A handcrafted walnut side table in a sunlit room"
              width={1600}
              height={1800}
              className="w-full h-auto object-contain mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-48 md:px-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] opacity-60">Recently made</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl">A few pieces, at rest.</h2>
          </div>
          <Link to="/collection" className="hidden md:inline-block text-sm uppercase tracking-[0.22em] link-quiet border-b-0">
            The full collection
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <div key={p.id} className={i === 1 ? "lg:mt-24" : i === 2 ? "lg:-mt-8" : ""}>
              <ProductCard product={p} tall={i === 0} />
            </div>
          ))}
        </div>

        <div className="mt-16 md:hidden">
          <Link to="/collection" className="text-sm uppercase tracking-[0.22em] link-quiet border-b-0">
            The full collection
          </Link>
        </div>
      </section>

      {/* Brand statement */}
      <section className="mx-auto mt-40 max-w-[1100px] px-6 md:mt-56 md:px-12">
        <p className="text-xs uppercase tracking-[0.28em] opacity-60">The studio</p>
        <p className="mt-8 font-display text-2xl leading-[1.35] md:text-4xl md:leading-[1.25]">
          AURA is not a store. It is a room where objects, made slowly by hand,
          settle in. Walnut and brass, stoneware and beeswax. Small runs. No hurry.
        </p>
        <p className="mt-10 max-w-xl text-base opacity-75">
          Each piece is one small addition. Present it, live with it, and the room
          begins — quietly — to change.
        </p>
        <div className="mt-14">
          <Link to="/collection" className="text-sm uppercase tracking-[0.22em] link-quiet">
            Walk through the collection
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
