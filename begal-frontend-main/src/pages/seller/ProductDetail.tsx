import instance from "@/lib/axios";
import { useState, useEffect } from "react";
import productType from "@/types/productType";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import dummyImg from "@/assets/hero-slider.png";

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<productType | null>(null);
  const token = localStorage.getItem("authToken");
  const getProduct = async () => {
    try {
      const response = await instance.get(`products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <main className="mt-20 max-w-[50vw] mx-auto h-screen grid grid-cols-2 items-center justify-center">
      {product ? (
        <>
          <div>
            <img
              src={product.image_url || dummyImg}
              alt="product image"
              className=""
            />
          </div>
          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.stock}</p>
            <div>
              <Button>Add to Cart</Button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
