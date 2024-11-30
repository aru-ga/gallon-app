interface depotType {
  id: string;
  className: string;
  name: string;
  owner_name: string;
  email: string;
  phone: string;
  role: string;
  profile_picture_url: string;
  address: {
    province: string;
    regency: string;
    district: string;
    village: string;
    street: string;
    detail: string;
  };
  operational_hours: {
    open: string;
    close: string;
  };
  rating: number;
  reviews_count: string;
  created_at: string;
  updated_at: string;
}


export interface OrderCardProps {
  order: {
    _id: string;
    user_id: string;
    seller_id: string;
    total_price: number;
    payment_method: string;
    status: string;
    payment_status: string;
    transaction_id: string;
    payment_response: {
      va_numbers: Array<{
        va_number: string;
        bank: string;
      }>;
      transaction_time: string;
      transaction_status: string;
      payment_type: string;
      order_id: string;
      gross_amount: string;
    };
    payment_expiry: string;
    products: Array<{
      product_id: string;
      name: string;
      image_url: string;
      quantity: number;
      price: number;
    }>;
    delivery_address: {
      province: string;
      regency: string;
      district: string;
      village: string;
      street: string;
      detail: string;
    };
    created_at: string;
    updated_at: string;
  };
  onConfirm: (orderId: string) => void;
}

export default depotType;
