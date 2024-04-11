export interface Order {
  id: string;
  user_id: string;
  address_id: string;
  payment_id: string;
  amount: number;
  status: string;
  paid: boolean;
  products: OrderProduct[];
  created_at: string;
  updated_at: string;
}

declare interface OrderProduct {
  product_id: string;
  quantity: number;
}
