interface productType {
  className: string;
  id: string;
  seller_id: string;
  name: string;
  description: "string";
  price: "number";
  stock: "string";
  image_url: "string";
  created_at: "string";
  updated_at: "string";
  quantity: "string";
  onClickEdit?: () => void;
}

interface payloadProductType {
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