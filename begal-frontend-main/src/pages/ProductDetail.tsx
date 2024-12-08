import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  PlusIcon,
  MinusIcon,
  AlertCircle,
  HeartIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dummyImg from "@/assets/hero-slider.png";
import { Badge } from "@/components/ui/badge";
import { addToCart } from "../store/cartActions";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { productType } from "@/types/productType";
import { getProductByID } from "@/api/public";
import { addToWishlist } from "@/api/user";

export default function ProductDetail() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<productType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    const getProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const product = await getProductByID(productId);
        setProduct(product.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to get product");
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  const handleAddWishlist = async () => {
    try {
      const response = await addToWishlist(productId);
      console.log("adding to wishlist=======", response);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

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
        seller_name: product.seller_name,
      };
      dispatch(addToCart(cartItem));
    }

    toast({
      title: "Berhasil ditambahkan!",
      description: "Silakan cek keranjang Anda.",
      action: (
        <ToastAction altText="cart">
          <Link to="/cart">Lanjut Checkout </Link>
        </ToastAction>
      ),
    });
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
    <main className="container mx-auto mt-40 px-4 py-8 dark:text-white">
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

          {loggedIn ? (
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
                  className="max-w-[300px] dark:bg-blue-600 bg-blue-600 text-white dark:text-white hover:bg-blue-700 duration-300"
                  disabled={product.stock === 0}
                  onClick={addToCartHandler}
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

              <div className="flex flex-row items-center justify-between">
                <Link
                  className="text-blue-500 hover:text-blue-400 font-bold"
                  to={`/depot-detail/${product.seller_id}`}
                >
                  {product.seller_name}
                </Link>
                <Button
                  onClick={() => handleAddWishlist()}
                  className="bg-transparent p-0 text-blue-500 hover:text-blue-400 font-bold"
                >
                  <span>
                    <HeartIcon fill="blue" />
                  </span>
                  add to wish list
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Link to="/login-user">
                <Button className="bg-blue-400 hover:bg-blue-600">
                  Login to Buy
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
