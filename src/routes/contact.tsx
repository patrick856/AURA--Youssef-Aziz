import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/layout/SiteChrome";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildSeoMeta({
      title: "Contact — Press, Trade & Custom Enquiries | AURA Studio",
      description:
        "Get in touch with AURA Studio for press, trade, wholesale, or custom handcrafted home decor enquiries.",
      path: "/contact",
    }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageShell>
      <section className="mx-auto max-w-[1000px] px-6 md:px-12">
        <p className="text-xs uppercase tracking-[0.28em] opacity-60">Contact</p>
        <h1 className="mt-4 font-display text-2xl sm:text-3xl md:text-6xl max-w-2xl leading-[1.05] md:leading-[1.02]">
          Press, trade, and correspondence.
        </h1>
        <p className="mt-6 md:mt-8 max-w-lg text-sm sm:text-base md:text-lg opacity-80">
          For piece enquiries, please use the collection. For everything else,
          write to us here or at studio@aura.example.
        </p>

        {submitted ? (
          <div className="mt-20 border-t border-[color-mix(in_oklab,var(--color-espresso)_15%,transparent)] pt-16">
            <p className="text-xs uppercase tracking-[0.28em] opacity-60">Received</p>
            <p className="mt-6 font-display text-3xl md:text-4xl max-w-xl">
              Thank you. We'll write back soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2"
          >
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Subject" name="subject" />
            <Field label="Organisation (optional)" name="org" />
            <div className="md:col-span-2">
              <Field label="Message" name="message" as="textarea" required />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center border border-[var(--color-espresso)] px-10 py-4 text-xs uppercase tracking-[0.24em] transition-colors hover:bg-[var(--color-espresso)] hover:text-[var(--color-linen)]"
              >
                Send
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
        <textarea name={name} rows={5} required={required} className={shared + " mt-2 resize-none"} />
      ) : (
        <input name={name} type={type} required={required} className={shared + " mt-2"} />
      )}
    </label>
  );
}
