import Link from "next/link";
import Image from "next/image";
import { buildWhatsAppUrl, buildGeneralMessage } from "@/lib/whatsapp";

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralMessage());

  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Marca */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src="/logo.png" alt="Coipo Racing" fill className="object-cover" />
              </div>
              <div>
                <span className="block text-base font-extrabold tracking-widest text-white uppercase">Coipo Racing</span>
                <span className="block text-xs font-medium text-red-500 uppercase tracking-widest">Suplementos Deportivos</span>
              </div>
            </div>
            <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
              Suplementación deportiva, hidratación y energía para mejorar tu rendimiento antes, durante y después del entrenamiento.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 rounded-full bg-green-600/20 border border-green-600/30 hover:bg-green-600/30 px-4 py-2 text-sm font-semibold text-green-400 transition"
            >
              +56 9 6596 7077
            </a>
          </div>

          {/* Catálogo */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Catálogo</h3>
            <ul className="space-y-2">
              {[
                { href: "/categorias/proteinas", label: "Proteínas" },
                { href: "/categorias/creatinas", label: "Creatinas" },
                { href: "/categorias/hidratacion", label: "Hidratación" },
                { href: "/categorias/energia", label: "Energía" },
                { href: "/categorias/accesorios", label: "Accesorios" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Información</h3>
            <ul className="space-y-2">
              {[
                { href: "/catalogo", label: "Ver catálogo completo" },
                { href: "/contacto", label: "Contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-white transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="divider-red my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Coipo Racing. Todos los derechos reservados.
          </p>
          <p className="text-xs text-zinc-600">
            Hecho con ❤️ para atletas de alto rendimiento 🏁
          </p>
        </div>
      </div>
    </footer>
  );
}
