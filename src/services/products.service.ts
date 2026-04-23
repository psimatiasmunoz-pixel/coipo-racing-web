import { Product, Category } from "@/types/product";

const WP_URL = process.env.WORDPRESS_URL;
const CK = process.env.WC_CONSUMER_KEY;
const CS = process.env.WC_CONSUMER_SECRET;

async function wcFetch(endpoint: string) {
  const auth = Buffer.from(`${CK}:${CS}`).toString("base64");
  const response = await fetch(`${WP_URL}/wp-json/wc/v3/${endpoint}`, {
    headers: {
      Authorization: `Basic ${auth}`,
    } as any,
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    console.error(`WC API Error: ${response.status} ${response.statusText}`);
    return null;
  }

  return response.json();
}

function transformProduct(wcProduct: any): Product {
  // Find brand in attributes
  const brandAttr = wcProduct.attributes?.find((a: any) => a.name.toLowerCase() === "marca");
  
  return {
    id: String(wcProduct.id),
    name: wcProduct.name,
    slug: wcProduct.slug,
    brand: brandAttr ? brandAttr.options[0] : "Coipo Racing", // Default brand if not found
    category_id: wcProduct.categories?.[0]?.id ? String(wcProduct.categories[0].id) : null,
    category: wcProduct.categories?.[0] ? {
      id: String(wcProduct.categories[0].id),
      name: wcProduct.categories[0].name,
      slug: wcProduct.categories[0].slug,
      created_at: new Date().toISOString()
    } : undefined,
    short_description: wcProduct.short_description.replace(/<[^>]*>/g, ""), // Strip HTML
    description: wcProduct.description,
    price: parseFloat(wcProduct.price || "0"),
    stock: wcProduct.stock_quantity || 0,
    sku: wcProduct.sku || null,
    image_url: wcProduct.images?.[0]?.src || "/logo.png",
    gallery: wcProduct.images?.slice(1).map((img: any) => img.src) || [],
    is_active: wcProduct.status === "publish",
    is_featured: wcProduct.featured || false,
    created_at: wcProduct.date_created,
    updated_at: wcProduct.date_modified,
  };
}

export async function getProducts(options?: {
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
}): Promise<Product[]> {
  let endpoint = "products?per_page=" + (options?.limit || 20);
  
  if (options?.featured) {
    endpoint += "&featured=true";
  }
  
  if (options?.categorySlug) {
    // We need to find category ID first in WC
    const cats = await wcFetch(`products/categories?slug=${options.categorySlug}`);
    if (cats && cats.length > 0) {
      endpoint += `&category=${cats[0].id}`;
    }
  }

  const data = await wcFetch(endpoint);
  if (!data) return [];
  
  return data.map(transformProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await wcFetch(`products?slug=${slug}`);
  if (!data || data.length === 0) return null;
  
  return transformProduct(data[0]);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return getProducts({ categorySlug });
}
