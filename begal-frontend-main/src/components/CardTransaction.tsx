import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import transactionType from "@/types/transactionType";

function CardTransaction({ order }: { order: transactionType }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isExpanded]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="w-full max-w-md border-2 border-blue-500 rounded-2xl overflow-hidden mb-4">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Order ID: {order._id.slice(-6)}</h2>
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            {order.payment_status === "pending"
              ? "Menunggu Pembayaran"
              : order.status}
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-gray-600">{formatDate(order.created_at)}</p>
          <p>{order.products.length} item(s)</p>
          <p className="font-semibold">
            Total Rp{order.total_price.toLocaleString("id-ID")}
          </p>
        </div>

        <Button
          variant="ghost"
          className="w-full flex items-center justify-between p-0 h-auto hover:bg-transparent"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={`order-details-${order._id}`}
        >
          <span className="text-gray-600">Lihat Detail</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-600 transition-transform duration-300" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-600 transition-transform duration-300" />
          )}
        </Button>

        <div
          id={`order-details-${order._id}`}
          ref={contentRef}
          className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: "0px" }}
        >
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <h3 className="font-semibold">Detail Pesanan:</h3>
            {order.products.map((product, index) => (
              <p key={index}>
                {index + 1}. {product.name} - {product.quantity}x - Rp
                {product.price.toLocaleString("id-ID")} each
              </p>
            ))}
            <p>Subtotal: Rp{order.total_price.toLocaleString("id-ID")}</p>
            <p>Biaya Pengiriman: Included in total</p>
            <p className="font-semibold">
              Total: Rp{order.total_price.toLocaleString("id-ID")}
            </p>
            <p>Metode Pembayaran: {order.payment_method}</p>
            <p>
              Alamat Pengiriman:{" "}
              {`${order.delivery_address.district}, ${order.delivery_address.regency}, ${order.delivery_address.province}`}
            </p>
            {order.payment_status === "pending" &&
              order.payment_method === "transfer" && (
                <Button
                  className="mt-2 w-full bg-blue-600"
                  onClick={() =>
                    window.open(order.payment_response.redirect_url, "_blank")
                  }
                >
                  Lanjutkan Pembayaran
                </Button>
              )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardTransaction;
