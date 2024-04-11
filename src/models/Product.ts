export interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  discount_rate: number;
  images_url: string[];
  tags: string[];
  available: boolean;
  created_at: number;
  updated_at: number;
}
