import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-height-[85vh] w-full overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Suplementos Coipo Racing"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black" />
      </div>

      <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 py-20 text-center">
        {/* Logo Area */}
        <div className="mb-8 animate-fade-in scale-110 md:scale-125">
          <Image
            src="/logo.png"
            alt="Coipo Racing Logo"
            width={300}
            height={300}
            className="drop-shadow-[0_0_30px_rgba(190,30,45,0.3)]"
          />
        </div>

        {/* Text Content */}
        <div className="max-w-4xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="inline-block bg-brand-red px-6 py-1 text-xs font-black uppercase tracking-[0.3em] text-white md:text-sm">
            CALIDAD Y RENDIMIENTO
          </div>
          
          <h1 className="mt-8 text-4xl font-black leading-tight text-white md:text-7xl">
            Desarrollo de Tu <br />
            <span className="text-brand-red">Rendimiento Máximo</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-zinc-300 md:text-xl">
            Potenciamos tu pasión con suplementación de alto nivel y asesoría experta para que alcances tu meta más ambiciosa.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/catalogo" className="btn-primary">
              Ver Catálogo
            </Link>
            <Link 
              href="/contacto" 
              className="rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
            >
              Contactar
            </Link>
          </div>
        </div>
      </div>
      
      {/* Red accent bar at bottom of hero */}
      <div className="absolute bottom-0 h-1.5 w-full bg-brand-red shadow-[0_0_20px_rgba(190,30,45,0.5)]" />
    </section>
  );
}
