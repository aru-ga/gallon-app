import productType from "./productType";

interface Order {
  _id: string;
  user_id: string;
  seller_id: string;
  created_at: string;
  delivery_address: {
    province: string;
    regency: string;
    district: string;
  };
  payment_method: string;
  payment_response: {
    token: string;
    redirect_url: string;
  };
  payment_status: string;
  products: productType[];
  status: string;
  total_price: number;
  transaction_id: string;
  updated_at: string;
}

export default Order;
