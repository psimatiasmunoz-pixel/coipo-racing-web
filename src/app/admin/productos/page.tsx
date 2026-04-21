import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Productos — Admin Coipo Racing" };

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Productos</h1>
          <p className="text-zinc-400 mt-1">{products?.length ?? 0} productos en total</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 px-5 py-2.5 text-sm font-bold text-white transition"
        >
          ➕ Nuevo producto
        </Link>
      </div>

      {products && products.length > 0 ? (
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Producto</th>
                <th className="hidden sm:table-cell px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Categoría</th>
                <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Precio</th>
                <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Stock</th>
                <th className="hidden md:table-cell px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-white line-clamp-1">{product.name}</p>
                      <p className="text-xs text-zinc-500">{product.brand}</p>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-4 py-3 text-sm text-zinc-400">
                    {(product.category as { name: string } | null)?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-white">
                    ${Number(product.price).toLocaleString("es-CL")}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      product.stock > 0
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      product.is_active
                        ? "bg-blue-500/15 text-blue-400"
                        : "bg-zinc-500/15 text-zinc-400"
                    }`}>
                      {product.is_active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/productos/${product.id}`}
                      className="text-xs font-semibold text-red-400 hover:text-red-300 transition"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-white mb-2">No hay productos</h3>
          <p className="text-zinc-400 mb-6">Comienza creando tu primer producto.</p>
          <Link
            href="/admin/productos/nuevo"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white hover:bg-red-500 transition"
          >
            ➕ Crear primer producto
          </Link>
        </div>
      )}
    </div>
  );
}
