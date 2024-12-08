import { getWishlist } from "@/api/user";
import CardProduct from "@/components/CardProduct";
import { useState, useEffect } from "react";
import CardWishlist from "@/components/CardWishlist";
import { removeWishlist } from "@/api/user";

// Define a type for the product data
interface Product {
  id: number;
  image_url: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  quantity: number;
  seller_name: string;
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const handleRemove = async (productId: number) => {
    try {
      await removeWishlist(productId);
      fetchWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist();
      if (Array.isArray(response.data)) {
        setWishlist(response.data);
      } else {
        console.error("Unexpected response structure:", response.data);
        setWishlist([]);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlist([]); // Set to an empty array in case of an error
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <main className="container mx-auto px-4 pt-40">
      <h1>wishlist</h1>
      <div>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <CardWishlist
                key={product.product.id}
                image_url={product.product.image_url}
                name={product.product.name}
                description={product.product.description}
                price={product.product.price}
                stock={product.product.stock}
                className={""}
                onDelete={() => handleRemove(product.id)}
              />
            ))}
          </div>
        ) : (
          <p>No items in wishlist</p>
        )}
      </div>
    </main>
  );
}