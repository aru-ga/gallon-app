import { productType } from "./productType";

interface orderType {
  payment_response: {
    redirect_url: string;
  };
  _id: string;
  id: string;
  product_id: string;
  quantity: string;
  status: string;
  seller_id: string;
  created_at: string;
  updated_at: string;
  payment_status: string;
  payment_expiry: string;
  payment_method: string;
  total_price: string;
  delivery_address: {
    street: string;
    village: string;
    district: string;
    regency: string;
    province: string;
    detail: string;
  };
  transaction_id: string;
  products: productType[];
}

export type { orderType };
