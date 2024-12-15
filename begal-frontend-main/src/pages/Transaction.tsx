import { ChevronLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import instance from "@/lib/axios";
import { useEffect, useState } from "react";
import CardTransaction from "@/components/CardTransaction";
import AnimTransUnlog from "@/components/AnimTransactionUnlog";
import AnimNoTrans from "@/components/AnimNoTrans";
import { productDelivered, cancelOrder } from "@/api/user";
import { Skeleton } from "@/components/ui/skeleton";
import { getTransaction } from "@/api/user";

export default function Transaction() {
  interface Order {
    _id: string;
  }

  const [transaction, setTransaction] = useState<Order[]>([]);

  const fetchTransaction = async () => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      try {
        const data = await getTransaction();
        setTransaction(data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
      }
    }
  };

  const token = sessionStorage.getItem("authToken");
  useEffect(() => {
    fetchTransaction();
  }, []);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  const handleDelivered = async (orderID: string) => {
    try {
      const sendDelivered = await productDelivered(orderID);
      console.log(sendDelivered);
    } catch (error) {
      console.error("Error marking order as delivered:", error);
    } finally {
      getTransaction();
    }
  };

  const handleCancel = async (orderID: string) => {
    try {
      const sendCancel = await cancelOrder(orderID);
      console.log(sendCancel);
    } catch (error) {
      console.error("Error cancelling order:", error);
    } finally {
      getTransaction();
    }
  };

  return (
    <>
      {token ? (
        <div className="min-h-screen flex justify-center mt-40">
          <div className="space-y-4 p-4 w-full max-w-7xl">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">
              Your Orders
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start auto-rows-auto">
              {transaction.length === 0
                ? Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="w-full h-72" />
                  ))
                : transaction.map((order) => (
                    <CardTransaction
                      key={order._id}
                      order={order}
                      onDelivered={() => handleDelivered(order._id)}
                      isExpanded={expandedId === order._id}
                      toggleExpand={() => toggleExpand(order._id)}
                      onCancel={() => handleCancel(order._id)}
                      refreshTransactions={fetchTransaction}
                    />
                  ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen min-w-screen">
          <Link
            to="/"
            className="flex flex-row hover:text-gray-500 items-center gap-5 m-10 w-min"
          >
            <ChevronLeftCircle size="40" />
            <h1 className="text-2xl">Keranjang</h1>
          </Link>

          <div className="flex flex-col justify-center items-center w-full rounded-lg gap-10 ">
            <AnimTransUnlog />
            <div className="flex flex-col items-center gap-5">
              <h3 className="text-xl dark:text-white">
                Silakan login untuk melanjutkan akses ke halaman ini.
              </h3>
              <Button variant="ghost" className="bg-blue-600 px-10 text-white">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
