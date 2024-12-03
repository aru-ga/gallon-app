type CartItemProps = {
  id: any;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  imgUrl: string;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  seller_id: string;
  seller_name: string;
};

export type { CartItemProps };
