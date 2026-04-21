import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard — Admin Coipo Racing" };

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // Stats básicos
  const [{ count: totalProducts }, { count: outOfStock }, { count: featured }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("is_active", true).eq("stock", 0),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("is_active", true).eq("is_featured", true),
  ]);

  const stats = [
    { label: "Productos activos", value: totalProducts ?? 0, icon: "📦", color: "text-blue-400" },
    { label: "Sin stock", value: outOfStock ?? 0, icon: "⚠️", color: "text-yellow-400" },
    { label: "Destacados", value: featured ?? 0, icon: "⭐", color: "text-red-400" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">Dashboard</h1>
        <p className="text-zinc-400 mt-1">Bienvenido al panel de administración de Coipo Racing.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-zinc-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/productos/nuevo"
          className="glass rounded-2xl p-6 hover:border-red-600/40 transition group"
        >
          <div className="text-2xl mb-2">➕</div>
          <h3 className="font-bold text-white group-hover:text-red-400 transition">Agregar producto</h3>
          <p className="text-sm text-zinc-500">Crear un nuevo producto en el catálogo</p>
        </Link>
        <Link
          href="/admin/productos"
          className="glass rounded-2xl p-6 hover:border-red-600/40 transition group"
        >
          <div className="text-2xl mb-2">📋</div>
          <h3 className="font-bold text-white group-hover:text-red-400 transition">Gestionar productos</h3>
          <p className="text-sm text-zinc-500">Ver, editar o eliminar productos</p>
        </Link>
        <Link
          href="/"
          target="_blank"
          className="glass rounded-2xl p-6 hover:border-green-600/40 transition group"
        >
          <div className="text-2xl mb-2">🌐</div>
          <h3 className="font-bold text-white group-hover:text-green-400 transition">Ver sitio público</h3>
          <p className="text-sm text-zinc-500">Abrir la web en una nueva pestaña</p>
        </Link>
        <Link
          href="/catalogo"
          target="_blank"
          className="glass rounded-2xl p-6 hover:border-blue-600/40 transition group"
        >
          <div className="text-2xl mb-2">🛒</div>
          <h3 className="font-bold text-white group-hover:text-blue-400 transition">Ver catálogo</h3>
          <p className="text-sm text-zinc-500">Ver el catálogo como lo ven los clientes</p>
        </Link>
      </div>
    </div>
  );
}
