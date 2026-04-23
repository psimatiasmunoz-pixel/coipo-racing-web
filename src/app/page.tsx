import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { getCategories } from "@/services/categories.service";
import { getProducts } from "@/services/products.service";
import { ShoppingBag, LayoutDashboard, Phone } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  // Fetch data for the home page
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getProducts({ featured: true, limit: 4 })
  ]);

  return (
    <main className="min-h-screen bg-brand-black">
      {/* 1. Hero Section (DARK) */}
      <HeroSection />

      {/* 2. Resumen de la Propuesta (WHITE SECTION) */}
      <section className="section-white border-y border-zinc-100 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-black text-brand-black md:text-5xl">
              Resumen <span className="text-brand-red">de la Experiencia</span>
            </h2>
            <p className="mt-6 text-lg tracking-tight text-zinc-600">
              En <span className="font-bold text-brand-black">Coipo Racing</span> nuestro ecosistema digital te permite acceder a suplementación deportiva de forma profesional, rápida y con asesoría directa.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="card-shadow flex flex-col items-center rounded-3xl border border-zinc-100 bg-white p-10 text-center transition hover:scale-105">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red/5 text-brand-red">
                <ShoppingBag size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-brand-black uppercase tracking-tight">Catálogo digital</h3>
              <p className="mt-4 text-sm font-medium text-zinc-500">
                Presentación ordenada y atractiva de nuestros productos con fotos, descripciones y stock siempre actualizado.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card-shadow flex flex-col items-center rounded-3xl border border-zinc-100 bg-white p-10 text-center transition hover:scale-105">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red/5 text-brand-red">
                <LayoutDashboard size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-brand-black uppercase tracking-tight">Panel admin</h3>
              <p className="mt-4 text-sm font-medium text-zinc-500">
                Gestión total desde WordPress: agrega, edita y elimina productos de forma sencilla y en tiempo real.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card-shadow flex flex-col items-center rounded-3xl border border-zinc-100 bg-white p-10 text-center transition hover:scale-105">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red/5 text-brand-red">
                <Phone size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-brand-black uppercase tracking-tight">Ventas por WhatsApp</h3>
              <p className="mt-4 text-sm font-medium text-zinc-500">
                Botones directos a nuestro equipo en cada producto para consultas técnicas y ventas rápidas con un toque humano.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Objetivos (Sub-section in White) */}
        <div className="container mx-auto mt-32 px-4">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black text-brand-black decoration-brand-red decoration-4 underline-offset-8">Objetivos:</h2>
              <div className="mt-10 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white">1</div>
                  <p className="font-bold text-zinc-700">Aumentar la visibilidad de nuestros productos en línea con una imagen premium.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white">2</div>
                  <p className="font-bold text-zinc-700">Facilitar la gestión de inventario y catálogo para el administrador.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white">3</div>
                  <p className="font-bold text-zinc-700">Fomentar las ventas directas y el engagement con WhatsApp.</p>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
               <div className="h-full w-full rounded-3xl bg-zinc-50 border-2 border-dashed border-zinc-200 flex items-center justify-center">
                  <img src="/logo.png" className="opacity-10 grayscale w-48" alt="" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Categorías & Destacados (BACK TO DARK) */}
      <section className="py-24">
        <CategoryGrid categories={categories} />
      </section>

      <section className="py-24 bg-zinc-900/50">
        <FeaturedProducts products={featuredProducts} />
      </section>

      {/* 5. CTA Final */}
      <section className="bg-brand-red py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-white md:text-5xl uppercase tracking-tighter">¿Listo para subir de nivel?</h2>
          <p className="mt-4 text-xl font-medium text-white/80">Explora nuestro catálogo y potencia tu entrenamiento.</p>
          <div className="mt-10">
            <Link href="/catalogo" className="inline-block rounded-full bg-white px-10 py-4 font-black uppercase tracking-widest text-brand-red transition hover:scale-105 hover:bg-zinc-100">
              Ir al catálogo 🏁
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
