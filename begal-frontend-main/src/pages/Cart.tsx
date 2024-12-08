import { useDispatch, useSelector } from "react-redux";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { removeFromCart, updateCartItem } from "../store/cartActions";
import CartItem from "@/components/CartItem";
import instance from "@/lib/axios";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CartType from "@/schemas/cartSchema";
import { Input } from "@/components/ui/input";

export default function Cart() {
  const dispatch = useDispatch();
  const [payMethod, setPayMethod] = useState("");
  const cartItems = useSelector((state: any) => state.cart.items);
  const token = sessionStorage.getItem("authToken");
  const { toast } = useToast();

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
      payment_method: payMethod,
    };

    try {
      setLoading(true);
      const response = await instance.post("orders", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success && response.status === 201) {
        toast({
          title: "Order created successfully",
          description: `Thank You!`,
          action: <Link to="/transaction">Check Transaction</Link>,
        });
      } else {
        setError("Transaction failed. Please try again.");
        toast({
          title: "Transaction failed",
          description: "Please try again.",
        });
      }
    } catch (error) {
      setError("Failed to order product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const allItemsFromSameSeller =
    selectedProductIds.length > 0 &&
    selectedProductIds.every((id) => {
      const sellerId = cartItems.find(
        (item: CartType) => item.id === id
      )?.seller_id;
      return (
        sellerId ===
        cartItems.find((item: CartType) => selectedProductIds[0] === item.id)
          ?.seller_id
      );
    });

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
                  seller_name: string;
                  id: string;
                  name: string;
                  price: number;
                  stock: number;
                  quantity: number;
                  image_url: string;
                  seller_id: string;
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
                      seller_id={item.seller_id}
                      seller_name={item.seller_name}
                    />
                    <Input
                      type="checkbox"
                      checked={selectedProductIds.includes(item?.id)}
                      onChange={() => handleProductCheckboxChange(item?.id)}
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
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                disabled={
                  loading ||
                  selectedProductIds.length === 0 ||
                  !allItemsFromSameSeller
                }
              >
                Buy Selected Items
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="dark:text-white">
                  Payment Method
                </DialogTitle>
                <DialogDescription>
                  Please select your payment method.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 dark:text-white">
                <div className="grid grid-cols-4 items-center gap-4">
                  <RadioGroup
                    value={payMethod}
                    onValueChange={(value: string) => setPayMethod(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="transfer" id="tf" />
                      <Label htmlFor="tf">Transfer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Cash</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="bg-blue-600"
                  type="submit"
                  onClick={buyItemsFromCart}
                >
                  {loading ? "Processing..." : "Buy Selected Items"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
}
