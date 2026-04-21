import { ProductForm } from "@/components/admin/ProductForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Editar producto — Admin Coipo Racing" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">Editar producto</h1>
        <p className="text-zinc-400 mt-1">Modifica la información de este producto.</p>
      </div>
      <div className="glass rounded-2xl p-6">
        <ProductForm productId={id} />
      </div>
    </div>
  );
}
