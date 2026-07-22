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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useSelection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 " +
        (scrolled || isMenuOpen
          ? "bg-[color-mix(in_oklab,var(--color-linen)_92%,transparent)] backdrop-blur-sm border-[color-mix(in_oklab,var(--color-walnut)_25%,transparent)]"
          : "bg-transparent border-transparent")
      }
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-12 md:py-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="font-display text-[1.25rem] md:text-2xl tracking-[0.20em] md:tracking-[0.28em] uppercase text-espresso"
          style={{ color: "var(--color-espresso)" }}
        >
          Aura
        </Link>

        {/* Desktop Nav */}
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

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-espresso focus:outline-none"
        >
          <div className="relative w-5 h-3.5 flex flex-col justify-between">
            <span
              className="block w-full h-[1.5px] bg-[#2E2520] transition-transform duration-300 ease-in-out origin-center"
              style={{
                transform: isMenuOpen ? "translateY(6.25px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-full h-[1.5px] bg-[#2E2520] transition-opacity duration-300 ease-in-out"
              style={{
                opacity: isMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-full h-[1.5px] bg-[#2E2520] transition-transform duration-300 ease-in-out origin-center"
              style={{
                transform: isMenuOpen ? "translateY(-6.25px) rotate(-45deg)" : "none",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={
          "fixed inset-x-0 top-full h-[calc(100vh-100%)] z-40 bg-[#F7F3EE] md:hidden flex flex-col justify-between px-6 py-8 transition-all duration-300 ease-in-out " +
          (isMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-2")
        }
      >
        <nav className="flex flex-col space-y-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={closeMenu}
              className="min-h-[44px] flex items-center text-[0.88rem] uppercase tracking-[0.24em] border-b border-[color-mix(in_oklab,var(--color-espresso)_10%,transparent)] text-espresso"
              activeProps={{ style: { opacity: 0.55 } }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/selection"
            onClick={closeMenu}
            className="min-h-[44px] flex items-center justify-between text-[0.88rem] uppercase tracking-[0.24em] border-b border-[color-mix(in_oklab,var(--color-espresso)_10%,transparent)] text-espresso"
          >
            <span>Selection</span>
            {items.length > 0 && (
              <span className="text-[0.78rem] opacity-75">{items.length}</span>
            )}
          </Link>
        </nav>

        <div className="pt-8 text-xs opacity-60 tracking-wider">
          <p>© {new Date().getFullYear()} AURA</p>
          <p className="mt-1 font-display italic text-xs">Objects made slowly.</p>
        </div>
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
            <p className="font-display text-xl md:text-3xl tracking-[0.20em] md:tracking-[0.24em] uppercase">Aura</p>
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
