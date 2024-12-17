import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign } from "lucide-react";

interface Order {
  created_at: string | number | Date;
  _id: string;
  status: string;
  total_price: number;
}

interface OrderSummaryCardProps {
  orders?: Order[];
}

export default function OrderSummaryCard({
  orders = [],
}: OrderSummaryCardProps) {
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  );
  const totalDeliveredPrice = deliveredOrders.reduce(
    (sum, order) => sum + order.total_price,
    0
  );

  const thisMonthDeliveredOrders = deliveredOrders.filter((order) => {
    const orderDate = new Date(order.created_at);

    const currentUTCDate = new Date();
    const currentMonth = currentUTCDate.getUTCMonth();
    const currentYear = currentUTCDate.getUTCFullYear();

    return (
      orderDate.getUTCMonth() === currentMonth &&
      orderDate.getUTCFullYear() === currentYear
    );
  });

  console.log("Delivered Orders:", deliveredOrders);
  console.log("This Month Delivered Orders:", thisMonthDeliveredOrders);

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-white shadow-lg">
      <CardHeader className="border-b border-blue-100 pb-6">
        <CardTitle className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          Transaksi selesai
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium text-blue-600">
              Total pendapatan bulan ini
            </p>
            <p className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Package className="w-8 h-8 text-blue-600" />
              {thisMonthDeliveredOrders
                .reduce((sum, order) => sum + order.total_price, 0)
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
            </p>
          </div>
          <div className="space-y-2 bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium text-blue-600">
              Total pendapatan dari transaksi selesai
            </p>
            <p className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <DollarSign className="w-8 h-8 text-blue-600" />
              {totalDeliveredPrice.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
