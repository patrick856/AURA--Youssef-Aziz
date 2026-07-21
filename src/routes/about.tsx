import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/SiteChrome";
import studio from "@/assets/studio.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Studio — AURA" },
      {
        name: "description",
        content:
          "AURA is a small studio making candles, vases and clocks by hand, in short runs.",
      },
      { property: "og:title", content: "The Studio — AURA" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <section className="mx-auto max-w-[1200px] px-6 md:px-12">
        <p className="text-xs uppercase tracking-[0.28em] opacity-60">The studio</p>
        <h1 className="mt-4 font-display text-4xl md:text-6xl max-w-3xl leading-[1.02]">
          A room where objects are made slowly.
        </h1>
      </section>

      <section className="mx-auto mt-20 grid max-w-[1400px] grid-cols-12 gap-y-16 px-6 md:mt-32 md:gap-x-16 md:px-12">
        <div className="col-span-12 md:col-span-6">
          <img src={studio} alt="Inside the AURA studio" className="w-full h-auto" loading="lazy" />
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 md:pt-8">
          <h2 className="font-display text-2xl md:text-3xl">Quality of attention.</h2>
          <p className="mt-6 text-base opacity-85 leading-relaxed">
            Each piece begins at a bench. Walnut is jointed by hand. Stoneware is
            thrown, then rested, then fired. Wax is poured in short pours to keep
            the surface even. Nothing is rushed, because rushing shows.
          </p>
          <p className="mt-6 text-base opacity-85 leading-relaxed">
            We make in runs of ten or twelve. When a run is finished, the bench is
            cleared, and we begin the next. No two pieces are identical — but each
            one carries the same measure of care.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-[1000px] px-6 md:mt-48 md:px-12">
        <p className="font-display text-2xl leading-[1.35] md:text-4xl md:leading-[1.2]">
          "A room becomes a home slowly — by hand, one small piece at a time. We
          make the additions."
        </p>
      </section>

      <section className="mx-auto mt-32 max-w-[1000px] px-6 md:px-12">
        <p className="text-sm opacity-75 max-w-lg">
          To enquire about a piece, use the collection. For anything else — press,
          trade, or a conversation — please write to us.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm uppercase tracking-[0.22em]">
          <Link to="/collection" className="link-quiet">Collection</Link>
          <Link to="/contact" className="link-quiet">Contact</Link>
        </div>
      </section>
    </PageShell>
  );
}
