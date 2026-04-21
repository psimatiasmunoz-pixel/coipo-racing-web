export type ProductCategory =
  | "proteinas"
  | "creatinas"
  | "barras"
  | "hidratacion"
  | "energia"
  | "vitaminas"
  | "accesorios";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category_id: string | null;
  category?: Category;
  short_description: string;
  description: string;
  price: number;
  stock: number;
  sku?: string | null;
  image_url: string;
  gallery?: string[];
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFormData {
  name: string;
  slug: string;
  brand: string;
  category_id: string;
  short_description: string;
  description: string;
  price: number;
  stock: number;
  sku?: string;
  image_url: string;
  is_active: boolean;
  is_featured: boolean;
}
