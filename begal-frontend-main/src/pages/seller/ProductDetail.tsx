import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon, MinusIcon, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "@/lib/axios";
import dummyImg from "@/assets/hero-slider.png";
import { Badge } from "@/components/ui/badge";
import { addToCart } from "../../store/cartActions";

interface ProductType {
  id: string;
  name: string;
  seller_id: string;
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
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setError(null);
      try {
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

  const addToCartHandler = () => {
    if (product) {
      const cartItem = {
        id: product.id,
        name: product.name,
        seller_id: product.seller_id,
        description: product.description,
        price: product.price,
        stock: product.stock,
        quantity,
        image_url: product.image_url,
      };
      dispatch(addToCart(cartItem));
    }
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

  const buyProduct = async () => {
    try {
      const response = await instance.post(
        "orders",
        {
          seller_id: product?.seller_id,
          products: [
            {
              product_id: product?.id,
              quantity,
            },
          ],
          payment_method: "transfer",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success && response.status === 201) {
        const { order_id, redirect_url, payment_method } = response.data.data;

        console.log(
          `Transaction Successful!\nOrder ID: ${order_id}\nPayment Method: ${payment_method}\nRedirect URL: ${redirect_url}`
        );
      } else {
        setError("Transaction failed. Please try again.");
      }
    } catch (error) {
      console.error("Error creating Order:", error);
      setError("Failed to order product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <main className="container mx-auto mt-40 px-4 py-8">
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
            <p className="mb-4 text-muted-foreground">{product.description}</p>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-2xl font-semibold">
                Rp. {product.price.toLocaleString("id-ID")}
              </span>
              <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
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
                onClick={addToCartHandler}
              >
                Add to Cart
                <span className="text-xl font-semibold">{quantity}</span>
              </Button>
              <Button onClick={buyProduct}>Buy Now</Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                <PlusIcon />
              </Button>
            </div>
            <Link to="/seller">{product.seller_id}</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
