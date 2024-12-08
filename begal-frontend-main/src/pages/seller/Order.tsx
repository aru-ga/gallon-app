import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";
import { fetchOrders } from "@/api/depot";
import { useEffect, useState } from "react";
import { CardConfirmOrder } from "@/components/CardConfirmOrder";
import {
  confirmOrder,
  confirmCashPayment,
  cancelOrder,
  shippedOrder,
} from "@/api/depot";

export default function Order() {
  const [orders, setOrders] = useState([]);
  const token: string | null = sessionStorage.getItem("authToken");
  const fetchOrder = async () => {
    if (token) {
      const data = await fetchOrders(token);
      setOrders(data.data);
      console.log(data);
    }
  };

  const handleShippedOrder = async (orderId: string) => {
    console.log("shipping order", orderId);
    try {
      await shippedOrder(token, orderId);
      fetchOrder();
    } catch (error) {
      console.error("Error shipping order:", error);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    console.log("cancelling order", orderId);
    try {
      await cancelOrder(token, orderId);
      fetchOrder();
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const handleConfirmOrder = async (orderId: string) => {
    console.log("confirming order by transfer", orderId);
    try {
      await confirmOrder(token, orderId);
      fetchOrder();
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  const handleCashOrder = async (orderId: string) => {
    console.log("confirming order by cash", orderId);
    try {
      await confirmCashPayment(token, orderId);
      fetchOrder();
    } catch (error) {
      console.error("Error confirming cash order:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <SidebarInset>
        <div className="flex flex-row items-center space-x-2 p-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <h1>Order</h1>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <p>Hello User, Atur dan lihat track toko anda disini</p>
            </div>
            <div className="flex justify-center">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {orders.map((order: any) => (
              <CardConfirmOrder
                key={order._id}
                onShipped={() => handleShippedOrder(order._id)}
                order={order}
                onConfirm={() => handleConfirmOrder(order._id)}
                onCash={() => handleCashOrder(order._id)}
                onCancel={() => handleCancelOrder(order._id)}
              />
            ))}
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
