import { ClipboardCheckIcon } from "lucide-react";
import { Hourglass } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";
import { useState, useEffect } from "react";
import { fetchOrders } from "@/api/depot";
import { orderType } from "@/types/orderType";
import OrderSummaryCard from "@/components/CardSumTransaction";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartSelling } from "@/components/ChartSelling";
import { ChartPieSelling } from "@/components/ChartPieSelling";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  const token = sessionStorage.getItem("authToken");
  const userData = sessionStorage.getItem("seller_session");

  const user = userData ? JSON.parse(userData) : null;

  const fetchOrder = async () => {
    if (token) {
      const response = await fetchOrders();
      if (response.success) {
        setOrders(response.data);
      } else {
        console.error("Failed to fetch orders", response);
      }
    } else {
      console.error("No token found");
    }
  };

  const completedTransactions = orders.filter(
    (order: orderType) => order.status === "delivered"
  ).length;

  const pendingTransactions = orders.filter(
    (order: orderType) =>
      order.status === "pending" ||
      order.status === "shipped" ||
      order.status === "confirmed"
  ).length;

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <SidebarInset className="dark:bg-gray-900 dark:text-white">
        <div className="flex flex-row items-center space-x-2 p-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <h1>Dashboard</h1>
        </div>
        <div className="flex flex-1 flex-col items-center space-y-10 gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <p className="text-3xl ">
                Hello, <span className="font-semibold">{user.seller.name}</span>
                <br />
                Atur dan lihat track toko anda disini
              </p>
            </div>
            <div className="flex justify-center">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg">
            <CardHeader className="border-b border-white/20 pb-6">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                Transaksi
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-6">
                <div className="bg-white/10 p-6 rounded-lg flex items-center space-x-4 flex-1">
                  <ClipboardCheckIcon size={60} className="text-blue-200" />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-blue-200">
                      Berhasil
                    </span>
                    <span className="text-3xl font-bold">
                      {completedTransactions} Transaksi
                    </span>
                  </div>
                </div>
                <Separator
                  orientation="vertical"
                  className="bg-white/20 h-20 hidden md:block"
                />
                <div className="bg-white/10 p-6 rounded-lg flex items-center space-x-4 flex-1">
                  <Hourglass size={60} className="text-blue-200" />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-blue-200">
                      Proses
                    </span>
                    <span className="text-3xl font-bold">
                      {pendingTransactions} Transaksi
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <OrderSummaryCard orders={orders} />
          <div className="flex flex-row gap-10 justify-between max-w-4xl mx-auto">
            <ChartSelling orders={orders} />
            <ChartPieSelling orders={orders} />
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
