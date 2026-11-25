export type CategoryRecord = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_active: boolean;
};

export type ProductImageRecord = {
  id: string;
  product_id: string;
  storage_path: string;
  alt_text: string;
  url?: string;
  sort_order: number;
  is_primary: boolean;
  created_at?: string;
};

export type ProductRecord = {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  short_description: string;
  description: string;
  materials: string[];
  applications: string[];
  customization_options: string[];
  finish_options: string[];
  specifications: Record<string, string>;
  care_instructions: string | null;
  warranty: string | null;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  focus_keyword: string | null;
  canonical_url: string | null;
  image_alt: string | null;
  category?: CategoryRecord;
  images: ProductImageRecord[];
  created_at?: string;
  updated_at?: string;
};

export type UploadedProductImage = {
  storage_path: string;
  alt_text: string;
};

export type BlogPostRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  image_alt: string | null;
  seo_title: string | null;
  seo_description: string | null;
  focus_keyword: string | null;
  canonical_url: string | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at?: string;
  updated_at?: string;
};
