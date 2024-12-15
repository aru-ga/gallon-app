interface WishlistProduct {
  id: number;
  product: {
    id: string;
    image_url: string;
    name: string;
    description: string;
    price: string;
    stock: string;
  };
}
export default WishlistProduct;
