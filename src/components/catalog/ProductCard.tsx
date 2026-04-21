import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { buildWhatsAppUrl, buildProductInquiryMessage } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = buildWhatsAppUrl(
    buildProductInquiryMessage(product.name, product.brand)
  );

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 hover:border-red-600/40 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/20 flex flex-col">
      {/* Badge destacado */}
      {product.is_featured && (
        <div className="absolute top-3 left-3 z-10 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
          ⭐ Destacado
        </div>
      )}

      {/* Imagen */}
      <Link href={`/producto/${product.slug}`} className="block relative aspect-square overflow-hidden bg-zinc-800">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-6xl">
            🏋️
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 space-y-3">
        <div>
          <p className="text-xs font-medium text-red-400 uppercase tracking-wider">{product.brand}</p>
          <Link href={`/producto/${product.slug}`}>
            <h3 className="text-sm font-bold text-white mt-1 line-clamp-2 hover:text-red-300 transition">
              {product.name}
            </h3>
          </Link>
          {product.short_description && (
            <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{product.short_description}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-black text-white">
            ${product.price.toLocaleString("es-CL")}
          </span>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              product.stock > 0
                ? "bg-green-500/15 text-green-400 border border-green-500/20"
                : "bg-red-500/15 text-red-400 border border-red-500/20"
            }`}
          >
            {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 hover:bg-green-500 px-4 py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.02]"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.112 1.532 5.836L.057 23.994l6.302-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.385l-.36-.214-3.732.979.996-3.637-.235-.374A9.818 9.818 0 1112 21.818z" />
          </svg>
          Pedir por WhatsApp
        </a>
      </div>
    </article>
  );
}
