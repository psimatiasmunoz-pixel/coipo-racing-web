export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-center px-4">
      <div>
        <div className="text-8xl mb-6">🏁</div>
        <h1 className="text-6xl font-black text-white mb-4">404</h1>
        <p className="text-xl text-zinc-400 mb-8">Esta página no existe o fue movida.</p>
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 hover:bg-red-500 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}
