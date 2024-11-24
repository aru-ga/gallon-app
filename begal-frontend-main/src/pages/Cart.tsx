import { useDispatch, useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { removeFromCart, updateCartItem } from "../store/cartActions";
import CartItem from "@/components/CartItem";
import instance from "@/lib/axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const token = localStorage.getItem("authToken");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateCartItem({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleProductCheckboxChange = (id: string) => {
    setSelectedProductIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const buyItemsFromCart = async () => {
    const selectedProductData = cartItems
      .filter((item: { id: string }) => selectedProductIds.includes(item.id))
      .map((item: { id: string; quantity: string }) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

    if (selectedProductData.length === 0) {
      setError("Please select at least one product to purchase.");
      return;
    }

    const sellerId = cartItems.find((item: { id: string }) =>
      selectedProductIds.includes(item.id)
    )?.seller_id;

    const allItemsFromSameSeller = selectedProductData.every(
      (item: { product_id: string }) =>
        cartItems.find(
          (cartItem: { id: string }) => cartItem.id === item.product_id
        )?.seller_id === sellerId
    );

    if (!allItemsFromSameSeller) {
      setError("You can only buy items from a single seller at a time.");
      return;
    }

    const payload = {
      seller_id: sellerId,
      products: selectedProductData,
      payment_method: "transfer",
    };

    console.log("Order Payload:", payload);

    try {
      setLoading(true);
      const response = await instance.post("orders", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  return (
    <main className="min-h-screen max-w-screen-lg dark:text-white mx-auto px-4 mt-40">
      <h1 className="text-3xl font-bold">Cart</h1>
      <div className="mt-10">
        <Separator />
        {cartItems.length === 0 ? (
          <p className="text-center mt-8">
            Your cart is empty, start <Link to="/">shopping</Link>
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-8 my-8">
            <div className="col-span-7 gap-6 flex flex-col">
              {cartItems.map(
                (item: {
                  id: string | null | undefined;
                  name: string;
                  price: number;
                  stock: number;
                  quantity: number;
                  image_url: string;
                }) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <CartItem
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      stock={item.stock}
                      quantity={item.quantity}
                      imgUrl={item.image_url}
                      onRemove={handleRemoveItem}
                      onQuantityChange={handleQuantityChange}
                    />
                    <input
                      type="checkbox"
                      checked={selectedProductIds.includes(item.id)}
                      onChange={() => handleProductCheckboxChange(item.id)}
                      className="h-5 w-5"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center mt-8">
            <p className="text-lg font-semibold text-primary">Processing...</p>
          </div>
        )}

        {error && (
          <div className="text-center mt-8 text-destructive">
            <p className="text-lg font-semibold">{error}</p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Button
            onClick={buyItemsFromCart}
            className="px-8 py-2 bg-blue-400 hover:bg-blue-600 rounded-md hover:bg-primary-dark disabled:bg-gray-400"
            disabled={loading || selectedProductIds.length === 0}
          >
            {loading ? "Processing..." : "Buy Selected Items"}
          </Button>
        </div>
      </div>
    </main>
  );
}
