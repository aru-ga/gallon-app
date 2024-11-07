import { useState } from "react";
import { ChevronLeftCircle } from "lucide-react";
import CardProductCart from "../components/CardProductCart";
import dummyImg from "../assets/feature-slider.png";
import { Link } from "react-router-dom";

export default function Cart() {
  const products = [
    { id: "1", name: "Air isi ulang", price: 6000, depot: "RO. Sejahtera" },
    { id: "2", name: "Air Mineral", price: 21000, depot: "RO. Sejahtera" },
    { id: "3", name: "Air isi ulang", price: 6000, depot: "RO. Segar Water" },
    { id: "4", name: "Air Mineral", price: 21000, depot: "RO. Segar Water" },
  ];

  const [cart, setCart] = useState(
    products.map((product) => ({ ...product, quantity: 1, selected: false }))
  );

  const toggleSelect = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleCheckout = async () => {
    console.log("Checkout button clicked");
    const selectedItems = cart.filter((item) => item.selected);
    const totalAmount = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const checkoutData = {
      items: selectedItems,
      total: totalAmount,
    };

    console.log("Checkout data:", checkoutData);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        throw new Error("Failed to checkout");
      }

      const result = await response.json();
      console.log("Order placed:", result);
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const total = cart
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="h-screen w-screen bg-gray-100 absolute">
        <Link
          to="/"
          className="flex flex-row hover:text-gray-500 items-center gap-5 m-20 w-min"
        >
          <ChevronLeftCircle size="40" />
          <h1 className="text-2xl">Keranjang</h1>
        </Link>

        <div className="flex flex-row justify-between bg-white p-20 rounded-lg gap-10  mx-20">
          <div className="w-1/2">
            {["RO. Sejahtera", "RO. Segar Water"].map((depot) => (
              <div key={depot}>
                <h3 className="font-bold text-lg my-3">{depot}</h3>
                {cart
                  .filter((item) => item.depot === depot)
                  .map((item) => (
                    <CardProductCart
                      key={item.id}
                      imageUrl={dummyImg}
                      item={item}
                      onToggleSelect={() => toggleSelect(item.id)}
                      onIncrement={() => updateQuantity(item.id, 1)}
                      onDecrement={() => updateQuantity(item.id, -1)}
                    />
                  ))}
              </div>
            ))}
          </div>

          <div className="bg-blue-600 text-white rounded-lg p-5 w-1/3">
            <h3 className="text-xl font-bold mb-3">Total</h3>
            {cart
              .filter((item) => item.selected)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm">Rp{item.price.toLocaleString()}</p>
                  </div>
                  <p>{item.quantity} item</p>
                </div>
              ))}
            <div className="flex justify-between items-center mt-5 font-bold">
              <p>Total</p>
              <p>Rp{total.toLocaleString()}</p>
            </div>
            <button
              className="mt-5 w-full bg-white text-blue-600 py-2 rounded-lg"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
