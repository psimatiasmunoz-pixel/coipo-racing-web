import { getProductsByCategory } from "@/services/products.service";
import { getCategoryBySlug, getCategories } from "@/services/categories.service";
import { ProductCard } from "@/components/catalog/ProductCard";
import { CATEGORY_ICONS } from "@/lib/constants/categories";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Categoría no encontrada" };
  return {
    title: `${category.name} — Coipo Racing`,
    description: category.description || `Productos de ${category.name} en Coipo Racing.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [category, products, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
    getCategories(),
  ]);

  if (!category) notFound();

  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-5xl mb-3">{CATEGORY_ICONS[category.slug] || "🏋️"}</div>
          <h1 className="text-4xl font-black text-white mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-zinc-400 max-w-xl">{category.description}</p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Otras categorías */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allCategories
            .filter((c) => c.slug !== slug)
            .map((cat) => (
              <Link
                key={cat.id}
                href={`/categorias/${cat.slug}`}
                className="rounded-full border border-white/20 px-3 py-1 text-xs text-zinc-400 hover:text-white hover:border-white/40 transition flex items-center gap-1"
              >
                {CATEGORY_ICONS[cat.slug]} {cat.name}
              </Link>
            ))}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-white mb-2">Sin productos en esta categoría</h3>
            <p className="text-zinc-400 mb-6">Próximamente agregaremos productos aquí.</p>
            <Link href="/catalogo" className="rounded-full bg-red-600 px-6 py-2 text-sm font-bold text-white hover:bg-red-500 transition">
              Ver catálogo completo
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-zinc-500 mb-6">{products.length} producto{products.length !== 1 ? "s" : ""}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
