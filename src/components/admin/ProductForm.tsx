"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Category } from "@/types/product";

interface ProductFormProps {
  productId?: string;
}

export function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = !!productId;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    brand: "",
    category_id: "",
    short_description: "",
    description: "",
    price: "",
    stock: "",
    sku: "",
    image_url: "",
    is_active: true,
    is_featured: false,
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data: cats } = await supabase.from("categories").select("*").order("name");
      if (cats) setCategories(cats as Category[]);

      if (productId) {
        const { data: prod } = await supabase.from("products").select("*").eq("id", productId).single();
        if (prod) {
          setForm({
            name: prod.name,
            slug: prod.slug,
            brand: prod.brand,
            category_id: prod.category_id ?? "",
            short_description: prod.short_description ?? "",
            description: prod.description ?? "",
            price: String(prod.price),
            stock: String(prod.stock),
            sku: prod.sku ?? "",
            image_url: prod.image_url ?? "",
            is_active: prod.is_active,
            is_featured: prod.is_featured,
          });
        }
      }
      setLoading(false);
    }
    load();
  }, [productId]);

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "name" && !isEdit ? { slug: generateSlug(value) } : {}),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      name: form.name,
      slug: form.slug,
      brand: form.brand,
      category_id: form.category_id || null,
      short_description: form.short_description,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      sku: form.sku || null,
      image_url: form.image_url,
      is_active: form.is_active,
      is_featured: form.is_featured,
    };

    let queryError;
    if (isEdit) {
      const { error } = await supabase.from("products").update(payload).eq("id", productId);
      queryError = error;
    } else {
      const { error } = await supabase.from("products").insert(payload);
      queryError = error;
    }

    if (queryError) {
      setError(queryError.message);
    } else {
      setSuccess(isEdit ? "Producto actualizado correctamente." : "Producto creado correctamente.");
      if (!isEdit) {
        setTimeout(() => router.push("/admin/productos"), 1500);
      }
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!productId) return;
    if (!confirm("¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.")) return;
    const { error } = await supabase.from("products").delete().eq("id", productId);
    if (error) {
      setError(error.message);
    } else {
      router.push("/admin/productos");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-zinc-400">Cargando...</div>
      </div>
    );
  }

  const inputClass = "w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white placeholder-zinc-600 focus:border-red-600/50 focus:outline-none focus:ring-1 focus:ring-red-600/30 transition";
  const labelClass = "block text-sm font-medium text-zinc-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Errores / success */}
      {error && (
        <div className="rounded-xl bg-red-900/30 border border-red-600/30 px-4 py-3 text-sm text-red-400">{error}</div>
      )}
      {success && (
        <div className="rounded-xl bg-green-900/30 border border-green-600/30 px-4 py-3 text-sm text-green-400">{success}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Nombre del producto *</label>
          <input name="name" required value={form.name} onChange={handleChange} className={inputClass} placeholder="Ej: ISO-XP Whey Protein" />
        </div>
        <div>
          <label className={labelClass}>Slug (URL)</label>
          <input name="slug" required value={form.slug} onChange={handleChange} className={inputClass} placeholder="iso-xp-whey-protein" />
        </div>
        <div>
          <label className={labelClass}>Marca *</label>
          <input name="brand" required value={form.brand} onChange={handleChange} className={inputClass} placeholder="Ej: Applied Nutrition" />
        </div>
        <div>
          <label className={labelClass}>Categoría</label>
          <select name="category_id" value={form.category_id} onChange={handleChange} className={inputClass}>
            <option value="">Sin categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Precio (CLP) *</label>
          <input name="price" type="number" min="0" required value={form.price} onChange={handleChange} className={inputClass} placeholder="39990" />
        </div>
        <div>
          <label className={labelClass}>Stock *</label>
          <input name="stock" type="number" min="0" required value={form.stock} onChange={handleChange} className={inputClass} placeholder="10" />
        </div>
        <div>
          <label className={labelClass}>SKU</label>
          <input name="sku" value={form.sku} onChange={handleChange} className={inputClass} placeholder="SKU-001" />
        </div>
        <div>
          <label className={labelClass}>URL de imagen</label>
          <input name="image_url" type="url" value={form.image_url} onChange={handleChange} className={inputClass} placeholder="https://..." />
        </div>
      </div>

      <div>
        <label className={labelClass}>Descripción corta</label>
        <input name="short_description" value={form.short_description} onChange={handleChange} className={inputClass} placeholder="Una línea descriptiva del producto" />
      </div>

      <div>
        <label className={labelClass}>Descripción completa</label>
        <textarea name="description" rows={4} value={form.description} onChange={handleChange} className={inputClass} placeholder="Descripción detallada del producto, ingredientes, beneficios..." />
      </div>

      {/* Switches */}
      <div className="flex gap-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} className="h-4 w-4 rounded border-white/20 bg-zinc-800 accent-red-600" />
          <span className="text-sm text-zinc-300">Producto activo</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} className="h-4 w-4 rounded border-white/20 bg-zinc-800 accent-red-600" />
          <span className="text-sm text-zinc-300">Destacado en home</span>
        </label>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 px-8 py-3 text-sm font-bold text-white transition"
        >
          {saving ? "Guardando..." : isEdit ? "Actualizar producto" : "Crear producto"}
        </button>
        <Link href="/admin/productos" className="text-sm text-zinc-400 hover:text-white transition">
          Cancelar
        </Link>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="ml-auto rounded-xl bg-zinc-800 hover:bg-red-900/50 border border-red-600/20 hover:border-red-600/50 px-6 py-3 text-sm font-bold text-red-400 transition"
          >
            Eliminar producto
          </button>
        )}
      </div>
    </form>
  );
}
