import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2, PlusIcon, MinusIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import instance from "@/lib/axios";
import dummyImg from "@/assets/hero-slider.png";

interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
}

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("authToken");
        const response = await instance.get<{ data: ProductType }>(
          `products/${productId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) =>
      Math.max(1, Math.min(prev + change, product?.stock || 1))
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <p className="text-lg font-semibold text-destructive">{error}</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <main className="container mx-auto mt-40 px-4 py-8">
      <Card className="overflow-hidden dark:bg-gray-950 border-none dark:text-white">
        <CardContent className="p-0">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative aspect-square flex items-center justify-center w-full overflow-hidden">
              <img
                src={product.image_url || dummyImg}
                alt={product.name}
                className="transition-transform bg-cover duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-6">
              <div>
                <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
                <p className="mb-4 text-muted-foreground">
                  {product.description}
                </p>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-2xl font-semibold">
                    Rp. {product.price.toLocaleString("id-ID")}
                  </span>
                  <Badge
                    variant={product.stock > 0 ? "secondary" : "destructive"}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <MinusIcon />
                  </Button>
                  <Button
                    className="max-w-[300px]"
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                    <span className="text-xl font-semibold">{quantity}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
