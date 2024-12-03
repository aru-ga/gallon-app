import { Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productType } from "@/types/productType";
import { searchProducts } from "@/api/public";

export default function Search() {
  const { productName } = useParams<{ productName: string }>();
  const [product, setProduct] = useState<productType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchProducts(productName || "");
      setProduct(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [productName]);

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
      <h1>Searched products</h1>
      <p>
        {product.name} - {product.price}
      </p>
    </main>
  );
}
