import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/layout/SiteChrome";
import { findProduct } from "@/data/products";

export const Route = createFileRoute("/request/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `Request ${loaderData.product.name} — AURA` : "Request — AURA" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RequestPage,
});

function RequestPage() {
  const { product } = Route.useLoaderData();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Client-side only — hook up EmailJS later.
    setSubmitted(true);
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-[900px] px-6 md:px-12">
        <Link
          to="/piece/$slug"
          params={{ slug: product.slug }}
          className="text-xs uppercase tracking-[0.28em] opacity-60 link-quiet border-b-0"
        >
          ← {product.name}
        </Link>

        <h1 className="mt-8 font-display text-4xl md:text-5xl">Request this piece.</h1>
        <p className="mt-6 max-w-lg text-lg opacity-80">
          Leave a few details. We'll be in touch by hand — usually within a day.
        </p>

        <div className="mt-14 flex items-center gap-6 border-t border-b border-[color-mix(in_oklab,var(--color-espresso)_15%,transparent)] py-6">
          <img src={product.images[0]} alt={product.name} className="h-24 w-20 object-cover" />
          <div>
            <p className="font-display text-xl">{product.name}</p>
            <p className="mt-1 text-sm opacity-70">{product.materials.join(", ")}</p>
          </div>
          <p className="ml-auto text-sm opacity-70">${product.price}</p>
        </div>

        {submitted ? (
          <div className="mt-16">
            <p className="text-xs uppercase tracking-[0.28em] opacity-60">Received</p>
            <p className="mt-6 font-display text-3xl md:text-4xl max-w-xl">
              Thank you. We'll be in touch shortly to discuss this piece.
            </p>
            <Link to="/collection" className="mt-12 inline-block text-sm uppercase tracking-[0.22em] link-quiet">
              Return to the collection
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />
            <Field label="Piece" name="piece" defaultValue={product.name} readOnly />
            <div className="md:col-span-2">
              <Field label="A note (optional)" name="message" as="textarea" />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center border border-[var(--color-espresso)] px-10 py-4 text-xs uppercase tracking-[0.24em] transition-colors hover:bg-[var(--color-espresso)] hover:text-[var(--color-linen)]"
              >
                Send request
              </button>
            </div>
          </form>
        )}
      </section>
    </PageShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  readOnly,
  as,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  readOnly?: boolean;
  as?: "textarea";
}) {
  const shared =
    "w-full bg-transparent border-b border-[color-mix(in_oklab,var(--color-espresso)_25%,transparent)] py-3 text-base outline-none focus:border-[var(--color-espresso)] transition-colors placeholder:opacity-40";
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.22em] opacity-60">{label}</span>
      {as === "textarea" ? (
        <textarea name={name} rows={4} className={shared + " mt-2 resize-none"} />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          readOnly={readOnly}
          className={shared + " mt-2"}
        />
      )}
    </label>
  );
}
