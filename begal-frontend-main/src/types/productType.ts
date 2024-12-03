interface productType {
  seller_name: any;
  className: string;
  id: string;
  seller_id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  quantity: string;
  onClickEdit?: () => void;
}



interface payloadProductType {
  image: any;
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