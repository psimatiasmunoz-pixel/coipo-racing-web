import { getProducts } from "@/services/products.service";
import { getCategories } from "@/services/categories.service";
import { ProductCard } from "@/components/catalog/ProductCard";
import Link from "next/link";
import { CATEGORY_ICONS } from "@/lib/constants/categories";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo — Coipo Racing",
  description: "Explora todo nuestro catálogo de suplementos deportivos: proteínas, creatinas, hidratación, energía y más.",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts({ categorySlug: categoria }),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Header de sección */}
      <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-white mb-2">Catálogo</h1>
          <p className="text-zinc-400">
            Explora suplementos, hidratación y nutrición deportiva de alta calidad.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Filtros por categoría */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/catalogo"
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              !categoria
                ? "bg-red-600 text-white"
                : "border border-white/20 text-zinc-400 hover:text-white hover:border-white/40"
            }`}
          >
            Todos
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/catalogo?categoria=${cat.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition flex items-center gap-1.5 ${
                categoria === cat.slug
                  ? "bg-red-600 text-white"
                  : "border border-white/20 text-zinc-400 hover:text-white hover:border-white/40"
              }`}
            >
              <span>{CATEGORY_ICONS[cat.slug]}</span>
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Grid de productos */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4">🏋️</div>
            <h3 className="text-xl font-bold text-white mb-2">No hay productos disponibles</h3>
            <p className="text-zinc-400 mb-6">
              {categoria ? "No encontramos productos en esta categoría." : "El catálogo está vacío por ahora."}
            </p>
            <Link href="/catalogo" className="rounded-full bg-red-600 px-6 py-2 text-sm font-bold text-white hover:bg-red-500 transition">
              Ver todo el catálogo
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-zinc-500 mb-6">
              {products.length} producto{products.length !== 1 ? "s" : ""} encontrado{products.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
