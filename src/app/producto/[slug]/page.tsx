import { getProductBySlug, getProducts } from "@/services/products.service";
import { buildWhatsAppUrl, buildProductInquiryMessage } from "@/lib/whatsapp";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };

  return {
    title: `${product.name} — Coipo Racing`,
    description: product.short_description || product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const whatsappUrl = buildWhatsAppUrl(buildProductInquiryMessage(product.name, product.brand));

  return (
    <main className="min-h-screen bg-zinc-950 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-white transition">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-white transition">Catálogo</Link>
          <span>/</span>
          <span className="text-zinc-300">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagen */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-900 border border-white/10">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-8xl">🏋️</div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <span className="text-sm font-bold text-red-400 uppercase tracking-widest">{product.brand}</span>
              {product.category && (
                <Link
                  href={`/categorias/${product.category.slug}`}
                  className="ml-3 rounded-full border border-white/10 px-2 py-0.5 text-xs text-zinc-400 hover:text-white transition"
                >
                  {product.category.name}
                </Link>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white">{product.name}</h1>

            {product.short_description && (
              <p className="text-zinc-400">{product.short_description}</p>
            )}

            <div className="flex items-center gap-4">
              <span className="text-4xl font-black text-white">
                ${product.price.toLocaleString("es-CL")}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  product.stock > 0
                    ? "bg-green-500/15 text-green-400 border border-green-500/20"
                    : "bg-red-500/15 text-red-400 border border-red-500/20"
                }`}
              >
                {product.stock > 0 ? `✓ Disponible (${product.stock} unidades)` : "Sin stock"}
              </span>
            </div>

            {product.description && (
              <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Descripción</h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 hover:bg-green-500 px-6 py-4 text-base font-bold text-white transition-all hover:scale-[1.02] shadow-lg shadow-green-900/30"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.112 1.532 5.836L.057 23.994l6.302-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.385l-.36-.214-3.732.979.996-3.637-.235-.374A9.818 9.818 0 1112 21.818z" />
                </svg>
                Consultar disponibilidad por WhatsApp
              </a>
              <Link
                href="/catalogo"
                className="flex w-full items-center justify-center rounded-2xl border border-white/10 hover:bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-400 hover:text-white transition"
              >
                ← Volver al catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
