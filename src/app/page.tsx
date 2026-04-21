import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { getCategories } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";
import Link from "next/link";
import { buildWhatsAppUrl, buildGeneralMessage } from "@/lib/whatsapp";

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getProducts({ featured: true, limit: 8 }),
  ]);

  const whatsappUrl = buildWhatsAppUrl(buildGeneralMessage());

  return (
    <>
      <HeroSection />

      <CategoryGrid categories={categories} />

      <FeaturedProducts products={featuredProducts} />

      {/* Sección de beneficios */}
      <section className="py-20 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-white text-center mb-12">
            ¿Por qué elegir Coipo Racing?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: "🏆",
                title: "Calidad premium",
                desc: "Solo trabajamos con marcas y productos de calidad comprobada.",
              },
              {
                icon: "💬",
                title: "Asesoría personalizada",
                desc: "Te ayudamos a elegir el suplemento ideal para tu objetivo deportivo.",
              },
              {
                icon: "🚀",
                title: "Entrega rápida",
                desc: "Recibe tus pedidos en el menor tiempo posible.",
              },
            ].map((b) => (
              <div key={b.title} className="glass rounded-2xl p-6 text-center hover:border-red-600/30 transition">
                <div className="text-5xl mb-4">{b.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                <p className="text-sm text-zinc-400">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-gradient-to-r from-red-900/30 via-zinc-950 to-red-900/30">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            ¿Listo para rendir más?
          </h2>
          <p className="text-zinc-400 mb-8">
            Habla con un asesor ahora mismo o explora todo nuestro catálogo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 hover:bg-green-500 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105"
            >
              Hablar con un asesor
            </a>
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 hover:bg-white/5 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
