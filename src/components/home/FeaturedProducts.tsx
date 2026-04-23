import Link from "next/link";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/catalog/ProductCard";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/10 px-3 py-1 text-xs font-medium text-red-400 mb-3">
              ⭐ Más populares
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Productos destacados
            </h2>
          </div>
          <Link
            href="/catalogo"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-red-400 hover:text-red-300 transition"
          >
            Ver todos
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 rounded-full border border-red-600/40 px-6 py-3 text-sm font-semibold text-red-400 hover:bg-red-600/10 transition"
          >
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  );
}
