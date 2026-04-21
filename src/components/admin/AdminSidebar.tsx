"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/admin/productos", label: "Productos", icon: "📦" },
  { href: "/admin/productos/nuevo", label: "Nuevo producto", icon: "➕" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-zinc-900 border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-full">
            <Image src="/logo.png" alt="Coipo Racing" fill className="object-cover" />
          </div>
          <div>
            <p className="text-sm font-black text-white uppercase tracking-wider">Coipo Racing</p>
            <p className="text-xs text-red-500">Panel Admin</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-red-600/20 text-white border border-red-600/30"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-600/10 transition"
        >
          <span>🚪</span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
