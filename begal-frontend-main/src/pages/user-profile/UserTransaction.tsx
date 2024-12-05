import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import instance from "@/lib/axios";
import { useEffect, useState } from "react";
import CardTransaction from "@/components/CardTransaction";
import { productDelivered } from "@/api/user";

export default function UserTransaction() {
  const [transaction, setTransaction] = useState([]);
  const token = sessionStorage.getItem("authToken");

  const getTransaction = async () => {
    try {
      const response = await instance.get("orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransaction(response.data.data);
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

  const handleDelivered = async (id: string) => {
    try {
      await productDelivered(id);
      getTransaction();
    } catch (error) {
      console.error("Error marking product as delivered:", error);
    } finally {
      getTransaction();
    }
  };

  return (
    <>
      <SidebarInset className="dark:bg-gray-900 dark:text-white">
        <div className="flex flex-row items-center space-x-2 p-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <h1>Transaction</h1>
        </div>
        <div className="min-h-screen flex justify-center">
          <div className="space-y-4 p-4">
            <h1 className="text-2xl font-bold mb-4">Your Transaction</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start auto-rows-auto">
              {transaction.map((order: any) => (
                <CardTransaction
                  key={order._id}
                  order={order}
                  isExpanded={expandedId === order._id}
                  toggleExpand={() => toggleExpand(order._id)}
                  onDelivered={() => handleDelivered(order._id)}
                />
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
