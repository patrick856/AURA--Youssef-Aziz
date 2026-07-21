import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { useSelection } from "@/context/selection";

export function ProductCard({ product, tall = false }: { product: Product; tall?: boolean }) {
  const { add, has } = useSelection();
  const selected = has(product.id);

  return (
    <article className="group">
      <Link
        to="/piece/$slug"
        params={{ slug: product.slug }}
        className="block overflow-hidden"
        aria-label={product.name}
      >
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: tall ? "3 / 4" : "4 / 5" }}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          />
        </div>
      </Link>
      <div className="mt-6 flex items-baseline justify-between gap-6">
        <div>
          <h3 className="font-display text-xl md:text-2xl">
            <Link to="/piece/$slug" params={{ slug: product.slug }} className="link-quiet border-b-0">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm opacity-70">{product.materials.join(", ")}</p>
        </div>
        <p className="text-sm opacity-70 whitespace-nowrap">${product.price}</p>
      </div>
      <button
        type="button"
        onClick={() =>
          add({
            id: product.id,
            name: product.name,
            slug: product.slug,
            materials: product.materials,
            image: product.images[0],
          })
        }
        className="mt-4 text-[0.72rem] uppercase tracking-[0.22em] opacity-70 hover:opacity-100 transition-opacity"
        disabled={selected}
      >
        {selected ? "In Selection" : "Add to Selection"}
      </button>
    </article>
  );
}
