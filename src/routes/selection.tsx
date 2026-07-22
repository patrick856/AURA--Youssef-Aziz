import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/layout/SiteChrome";
import { useSelection } from "@/context/selection";

export const Route = createFileRoute("/selection")({
  head: () => ({
    meta: [
      { title: "Selection — AURA" },
      { name: "description", content: "A shortlist of pieces to enquire about." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SelectionPage,
});

function SelectionPage() {
  const { items, remove, clear } = useSelection();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    clear();
  };

  return (
    <PageShell>
      <section className="mx-auto max-w-[1200px] px-6 md:px-12">
        <p className="text-xs uppercase tracking-[0.28em] opacity-60">Selection</p>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl md:text-6xl max-w-2xl leading-[1.05] md:leading-[1.02]">
          A few pieces you're considering.
        </h1>
        <p className="mt-6 md:mt-8 max-w-lg text-sm sm:text-base md:text-lg opacity-80">
          Send them across and we'll be in touch to discuss.
        </p>
      </section>

      <section className="mx-auto mt-20 max-w-[1200px] px-6 md:px-12">
        {items.length === 0 && !submitted ? (
          <div className="border-t border-[color-mix(in_oklab,var(--color-espresso)_15%,transparent)] pt-16 text-center">
            <p className="font-display text-2xl md:text-3xl opacity-75">
              Nothing chosen yet.
            </p>
            <Link
              to="/collection"
              className="mt-8 inline-block text-sm uppercase tracking-[0.22em] link-quiet"
            >
              Walk through the collection
            </Link>
          </div>
        ) : submitted ? (
          <div className="border-t border-[color-mix(in_oklab,var(--color-espresso)_15%,transparent)] pt-16">
            <p className="text-xs uppercase tracking-[0.28em] opacity-60">Received</p>
            <p className="mt-6 font-display text-3xl md:text-4xl max-w-xl">
              Thank you. We'll be in touch to discuss these pieces.
            </p>
            <Link to="/collection" className="mt-12 inline-block text-sm uppercase tracking-[0.22em] link-quiet">
              Return to the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-[color-mix(in_oklab,var(--color-espresso)_15%,transparent)] border-t border-b border-[color-mix(in_oklab,var(--color-espresso)_15%,transparent)]">
              {items.map((i) => (
                <li key={i.id} className="flex items-center gap-6 py-6">
                  <img src={i.image} alt={i.name} className="h-24 w-20 object-cover" />
                  <div className="flex-1">
                    <Link to="/piece/$slug" params={{ slug: i.slug }} className="font-display text-xl link-quiet border-b-0">
                      {i.name}
                    </Link>
                    <p className="mt-1 text-sm opacity-70">{i.materials.join(", ")}</p>
                  </div>
                  <button
                    onClick={() => remove(i.id)}
                    className="text-xs uppercase tracking-[0.22em] opacity-60 hover:opacity-100 transition-opacity"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <form onSubmit={onSubmit} className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <div className="md:col-span-2">
                <Field label="A note (optional)" name="message" as="textarea" />
              </div>
              <div className="md:col-span-2">
                <p className="text-sm opacity-70 max-w-md">
                  We'll be in touch to discuss these pieces.
                </p>
                <button
                  type="submit"
                  className="mt-8 inline-flex items-center border border-[var(--color-espresso)] px-10 py-4 text-xs uppercase tracking-[0.24em] transition-colors hover:bg-[var(--color-espresso)] hover:text-[var(--color-linen)]"
                >
                  Send enquiry
                </button>
              </div>
            </form>
          </>
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
  as,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "textarea";
}) {
  const shared =
    "w-full bg-transparent border-b border-[color-mix(in_oklab,var(--color-espresso)_25%,transparent)] py-3 text-base outline-none focus:border-[var(--color-espresso)] transition-colors";
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.22em] opacity-60">{label}</span>
      {as === "textarea" ? (
        <textarea name={name} rows={4} className={shared + " mt-2 resize-none"} />
      ) : (
        <input name={name} type={type} required={required} className={shared + " mt-2"} />
      )}
    </label>
  );
}
