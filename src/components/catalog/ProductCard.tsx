import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { buildWhatsAppUrl, buildProductInquiryMessage } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = buildWhatsAppUrl(buildProductInquiryMessage(product.name));

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/5 dark:bg-zinc-900/50">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-950">
        <Image
          src={product.image_url || "/logo.png"}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
            <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black">
              Agotado
            </span>
          </div>
        )}
        {product.is_featured && (
          <div className="absolute left-3 top-3 z-10">
            <span className="rounded-full bg-brand-red px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-brand-red/30">
              Top Ventas
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-red">
            {product.brand}
          </p>
          <h3 className="line-clamp-2 min-h-[2.5rem] mt-1 text-sm font-bold text-zinc-900 group-hover:text-brand-red transition-colors dark:text-white">
            {product.name}
          </h3>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <p className="text-lg font-black text-zinc-900 dark:text-white">
            ${Number(product.price).toLocaleString("es-CL")}
          </p>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white transition-all hover:bg-brand-red hover:scale-110"
            title="Pedir por WhatsApp"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
          </a>
        </div>
      </div>
      
      {/* Quick link to detail */}
      <Link href={`/producto/${product.slug}`} className="absolute inset-x-0 top-0 aspect-square" aria-hidden="true" />
    </div>
  );
}
