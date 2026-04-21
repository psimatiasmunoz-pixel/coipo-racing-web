import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types/product";

export async function getProducts(options?: {
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Product[]> {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select("*, category:categories(id, name, slug)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (options?.featured) {
    query = query.eq("is_featured", true);
  }

  if (options?.categorySlug) {
    query = query.eq("categories.slug", options.categorySlug);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as Product[]) || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(id, name, slug)")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data as Product;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  if (!category) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(id, name, slug)")
    .eq("is_active", true)
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as Product[]) || [];
}
