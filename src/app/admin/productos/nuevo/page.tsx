import { ProductForm } from "@/components/admin/ProductForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Nuevo producto — Admin Coipo Racing" };

export default function NewProductPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">Nuevo producto</h1>
        <p className="text-zinc-400 mt-1">Agrega un nuevo producto al catálogo.</p>
      </div>
      <div className="glass rounded-2xl p-6">
        <ProductForm />
      </div>
    </div>
  );
}
