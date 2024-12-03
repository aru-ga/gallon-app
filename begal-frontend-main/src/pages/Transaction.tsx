import { ChevronLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import instance from "@/lib/axios";
import { useEffect, useState } from "react";
import CardTransaction from "@/components/CardTransaction";
import AnimTransUnlog from "@/components/AnimTransactionUnlog";
import AnimNoTrans from "@/components/AnimNoTrans";

export default function Transaction() {
  interface Order {
    _id: string;
  }

  const [transaction, setTransaction] = useState<Order[]>([]);

  const token = localStorage.getItem("authToken");

  const getTransaction = async () => {
    try {
      const response = await instance.get("orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data.data);
      setTransaction(response.data.data);
      console.log(transaction);
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      {token ? (
        <div className="min-h-screen flex justify-center mt-40">
          <div className="space-y-4 p-4">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">
              Your Orders
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start auto-rows-auto">
              {transaction.length === 0 ? (
                <AnimNoTrans />
              ) : (
                transaction.map((order) => (
                  <CardTransaction
                    key={order._id}
                    //@ts-ignore
                    order={order}
                    isExpanded={expandedId === order._id}
                    toggleExpand={() => toggleExpand(order._id)}
                  />
                ))
              )}
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
