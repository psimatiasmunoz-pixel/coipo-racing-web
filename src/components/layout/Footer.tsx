import { Globe, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-black pt-20 border-t border-white/5">
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Image src="/logo.png" alt="Coipo Racing" width={150} height={150} />
            <p className="mt-6 max-w-sm text-zinc-500 leading-relaxed">
              Líderes en suplementación deportiva de alta calidad. 
              Comprometidos con tu rendimiento y metas personales.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white">Navegación</h4>
            <ul className="mt-6 space-y-3 text-sm text-zinc-500">
              <li><Link href="/" className="hover:text-brand-red transition">Inicio</Link></li>
              <li><Link href="/catalogo" className="hover:text-brand-red transition">Catálogo</Link></li>
              <li><Link href="/contacto" className="hover:text-brand-red transition">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-white">Legal</h4>
            <ul className="mt-6 space-y-3 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-brand-red transition">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-brand-red transition">Políticas de privacidad</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar matching the commercial proposal image */}
      <div className="bg-gradient-to-r from-brand-black via-brand-red/90 to-brand-black py-4">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-xs font-bold text-white uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-white/70" />
            <span>www.coiporacing.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-white/70" />
            <span>info@coiporacing.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-white/70" />
            <span>+56 9 6655 9988</span>
          </div>
        </div>
      </div>
      
      <div className="bg-black py-4 text-center text-[10px] text-zinc-600 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Coipo Racing. Todos los derechos reservados.
      </div>
    </footer>
  );
}
