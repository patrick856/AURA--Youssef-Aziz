import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useSelection } from "@/context/selection";

const nav = [
  { to: "/collection", label: "Collection" },
  { to: "/about", label: "The Studio" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { items } = useSelection();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 " +
        (scrolled
          ? "bg-[color-mix(in_oklab,var(--color-linen)_92%,transparent)] backdrop-blur-sm"
          : "bg-transparent")
      }
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <Link
          to="/"
          className="font-display text-2xl tracking-[0.28em] uppercase text-espresso"
          style={{ color: "var(--color-espresso)" }}
        >
          Aura
        </Link>
        <nav className="hidden items-center gap-10 text-[0.78rem] uppercase tracking-[0.22em] md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="link-quiet border-b-0 hover:opacity-70 transition-opacity"
              activeProps={{ style: { opacity: 0.55 } }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/selection"
            className="text-[0.78rem] uppercase tracking-[0.22em] hover:opacity-70 transition-opacity"
          >
            Selection {items.length > 0 ? `— ${items.length}` : ""}
          </Link>
        </nav>
        {/* Mobile: just a single Selection link */}
        <Link
          to="/selection"
          className="md:hidden text-[0.72rem] uppercase tracking-[0.22em]"
        >
          Selection{items.length > 0 ? ` · ${items.length}` : ""}
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[color-mix(in_oklab,var(--color-espresso)_15%,transparent)]">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl tracking-[0.24em] uppercase">Aura</p>
            <p className="mt-4 max-w-xs text-sm opacity-70">
              Handcrafted objects, made slowly, in small runs.
            </p>
          </div>
          <div className="text-sm">
            <p className="mb-3 uppercase tracking-[0.22em] text-xs opacity-60">Wander</p>
            <ul className="space-y-2">
              <li><Link to="/collection" className="link-quiet border-b-0">Collection</Link></li>
              <li><Link to="/selection" className="link-quiet border-b-0">Selection</Link></li>
              <li><Link to="/about" className="link-quiet border-b-0">The Studio</Link></li>
              <li><Link to="/contact" className="link-quiet border-b-0">Contact</Link></li>
            </ul>
          </div>
          <div className="text-sm">
            <p className="mb-3 uppercase tracking-[0.22em] text-xs opacity-60">Studio</p>
            <p className="opacity-80">
              By appointment.<br />
              Correspondence welcomed.
            </p>
            <p className="mt-4 opacity-80">studio@aura.example</p>
          </div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-2 text-xs opacity-50 md:flex-row">
          <p>© {new Date().getFullYear()} AURA</p>
          <p>Made by hand.</p>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 md:pt-32">{children}</main>
      <Footer />
    </div>
  );
}
