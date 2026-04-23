import { Category } from "@/types/product";

const WP_URL = process.env.WORDPRESS_URL;
const CK = process.env.WC_CONSUMER_KEY;
const CS = process.env.WC_CONSUMER_SECRET;

async function wcFetch(endpoint: string) {
  const auth = Buffer.from(`${CK}:${CS}`).toString("base64");
  const response = await fetch(`${WP_URL}/wp-json/wc/v3/${endpoint}`, {
    headers: {
      Authorization: `Basic ${auth}`,
    } as any,
    next: { revalidate: 3600 }, // Cache categories longer
  });

  if (!response.ok) return null;
  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const data = await wcFetch("products/categories?hide_empty=true");
  if (!data) return [];

  return data.map((cat: any) => ({
    id: String(cat.id),
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    image_url: cat.image?.src || null,
    created_at: new Date().toISOString(),
  }));
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await wcFetch(`products/categories?slug=${slug}`);
  if (!data || data.length === 0) return null;

  const cat = data[0];
  return {
    id: String(cat.id),
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    image_url: cat.image?.src || null,
    created_at: new Date().toISOString(),
  };
}
