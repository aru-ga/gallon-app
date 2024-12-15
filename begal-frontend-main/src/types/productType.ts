interface productType {
  product_id: string;
  seller_name: string;
  className: string;
  id: string;
  seller_id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  quantity: number;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
}



interface payloadProductType {
  image: string;
  className: string;
  id: string;
  seller_id: string;
  name: string;
  description: "string";
  price: "number";
  stock: "string";
  created_at: "string";
  updated_at: "string";
  quantity: "string";
  onClickEdit?: () => void;
}

export type { productType, payloadProductType }