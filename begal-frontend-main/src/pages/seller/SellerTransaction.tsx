import { Order, columns } from "@/components/DatatableTransaction/columns";
import { DataTable } from "@/components/DatatableTransaction/TableTransaction";
import { fetchOrders } from "@/api/depot"; // Assuming fetchOrders returns Order[]
import { useEffect, useState } from "react";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

export default function SellerTransaction() {
  const [data, setData] = useState<Order[]>([]);

  const token = sessionStorage.getItem("authToken");

  const getData = async () => {
    try {
      if (token) {
        const orders = await fetchOrders();
        setData(orders.data);
        console.log("Orders fetched:", orders);
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getData();
    } else {
      console.log("No token available at mount");
    }
  }, []);

  return (
    <SidebarInset className="dark:bg-gray-900 dark:text-white">
      <div className="flex flex-row items-center space-x-2 p-3">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <h1>Transaction</h1>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </SidebarInset>
  );
}
