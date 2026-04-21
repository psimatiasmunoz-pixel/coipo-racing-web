import Link from "next/link";
import Image from "next/image";
import { buildWhatsAppUrl, buildGeneralMessage } from "@/lib/whatsapp";

export function HeroSection() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralMessage());

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-red-950/30" />

      {/* Patrón de fondo */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #dc2626,
            #dc2626 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
      />

      {/* Círculos decorativos */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-red-600/10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-red-800/10 blur-2xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Texto */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/10 px-4 py-2 text-sm font-medium text-red-400">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Suplementos Deportivos Chile 🏁
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight">
              <span className="block text-white">Entrena</span>
              <span className="block text-gradient">más fuerte.</span>
              <span className="block text-white">Rinde más.</span>
            </h1>

            <p className="text-lg text-zinc-400 max-w-lg leading-relaxed">
              Suplementación deportiva, hidratación y energía para mejorar tu rendimiento
              antes, durante y después del entrenamiento. Calidad garantizada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 hover:bg-red-500 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 shadow-lg shadow-red-600/30"
              >
                Ver catálogo completo
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-green-600/40 bg-green-600/10 hover:bg-green-600/20 px-8 py-4 text-base font-bold text-green-400 transition-all hover:scale-105"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.557 4.112 1.532 5.836L.057 23.994l6.302-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.034-1.385l-.36-.214-3.732.979.996-3.637-.235-.374A9.818 9.818 0 1112 21.818z" />
                </svg>
                Consultar por WhatsApp
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              {[
                { value: "100%", label: "Calidad garantizada" },
                { value: "⚡", label: "Entrega rápida" },
                { value: "💪", label: "Asesoría experta" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Logo / imagen héroe */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-red-600/20 blur-3xl scale-110" />
              <div className="relative h-72 w-72 sm:h-96 sm:w-96 rounded-full overflow-hidden border-2 border-red-600/30 shadow-2xl shadow-red-900/50 animate-float">
                <Image
                  src="/logo.png"
                  alt="Coipo Racing — Suplementos Deportivos"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
