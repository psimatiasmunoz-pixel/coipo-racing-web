"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, buildGeneralMessage } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralMessage());

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-[60] flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      {/* Pulse effect */}
      <div className="absolute h-full w-full animate-ping rounded-full bg-brand-red opacity-40 duration-1000" />
      
      {/* Label (Hidden on small, appears on hover) */}
      <span className="absolute right-full mr-4 translate-x-2 rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-red opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 whitespace-nowrap">
        ¿Necesitas ayuda?
      </span>

      {/* Main Button */}
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_10px_20px_rgba(190,30,45,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:bg-red-700">
        <MessageCircle size={28} strokeWidth={2.5} />
      </div>
    </a>
  );
}
