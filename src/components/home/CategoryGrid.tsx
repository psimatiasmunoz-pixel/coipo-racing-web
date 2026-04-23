import Link from "next/link";
import { Category } from "@/types/product";
import { CATEGORY_ICONS } from "@/lib/constants/categories";

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-20 bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Explora por categoría
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Todo lo que necesitas para llevar tu rendimiento al siguiente nivel
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories?.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/categorias/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-800/50 p-6 text-center
                  hover:border-red-600/50 hover:bg-zinc-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-900/20"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {CATEGORY_ICONS[category.slug] || "🏋️"}
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base">{category.name}</h3>
                {category.description && (
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{category.description}</p>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-zinc-500 italic">No hay categorías disponibles</p>
          )}
        </div>
      </div>
    </section>
  );
}
