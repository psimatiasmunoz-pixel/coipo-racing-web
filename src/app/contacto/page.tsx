import { buildWhatsAppUrl, buildGeneralMessage } from "@/lib/whatsapp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto — Coipo Racing",
  description: "Contáctanos por WhatsApp para consultar por nuestros productos de suplementación deportiva.",
};

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralMessage());

  return (
    <main className="min-h-screen bg-zinc-950 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-6xl mb-6">🏁</div>
        <h1 className="text-4xl font-black text-white mb-4">Contáctanos</h1>
        <p className="text-zinc-400 mb-10 max-w-xl mx-auto">
          Estamos disponibles para asesorarte en tu plan de suplementación.
          Escríbenos directamente por WhatsApp y te respondemos a la brevedad.
        </p>

        <div className="glass rounded-2xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">WhatsApp</p>
              <p className="text-xl font-bold text-white">+56 9 6596 7077</p>
            </div>
            <div className="h-px sm:h-10 w-full sm:w-px bg-white/10" />
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Instagram</p>
              <p className="text-xl font-bold text-white">@coiporacing</p>
            </div>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-green-600 hover:bg-green-500 px-10 py-4 text-base font-bold text-white transition-all hover:scale-105 shadow-lg shadow-green-900/30"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.112 1.532 5.836L.057 23.994l6.302-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.385l-.36-.214-3.732.979.996-3.637-.235-.374A9.818 9.818 0 1112 21.818z" />
          </svg>
          Abrir WhatsApp ahora
        </a>
      </div>
    </main>
  );
}
