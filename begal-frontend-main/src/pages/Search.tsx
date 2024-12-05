import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchProducts } from "@/api/public";
import CardProduct from "@/components/CardProduct";
import { productType } from "@/types/productType";

export default function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [products, setProducts] = useState<productType[]>([]);

  const search = async () => {
    try {
      const response = await searchProducts(keyword);
      setProducts(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  useEffect(() => {
    if (keyword) {
      search();
    }
  }, [keyword]);

  return (
    <main className="container mx-auto px-4 pt-40">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      {keyword ? (
        <div>
          <p className="text-lg mb-4">
            Showing results for:
            <span className="font-semibold"> {keyword}</span>
            <p className="font-semibold">Found {products.length} product(s).</p>
          </p>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <CardProduct
                  key={product.id}
                  id={product.id}
                  image_url={product.image_url}
                  name={product.name}
                  price={product.price}
                  seller_id={product.seller_id}
                  description={product.description}
                  stock={product.stock}
                  created_at={product.created_at}
                  updated_at={product.updated_at}
                  quantity={product.quantity}
                  seller_name={product.seller_name}
                  className={""}
                />
              ))}
            </div>
          ) : (
            <p className="text-lg">No products found for this search.</p>
          )}
        </div>
      ) : (
        <div>
          <p className="text-lg">
            Please enter a keyword to search for products.
          </p>
        </div>
      )}
    </main>
  );
}
