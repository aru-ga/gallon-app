interface WishlistProduct {
  id: number;
  product: {
    id: number;
    image_url: string;
    name: string;
    description: string;
    price: number;
    stock: number;
  };
}
export default WishlistProduct;
