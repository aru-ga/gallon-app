import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import PaymentModal from "@/components/PaymentModal";
import { formatDate } from "@/lib/utils";
import { orderType } from "@/types/orderType";
import { productType } from "@/types/productType";

function CardTransaction({
  order,
  isExpanded,
  toggleExpand,
  onDelivered,
  onCancel,
  refreshTransactions,
}: {
  order: orderType;
  isExpanded: boolean;
  toggleExpand: () => void;
  onDelivered: (id: string) => void;
  onCancel: (id: string) => void;
  refreshTransactions: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isExpanded]);

  const handlePaymentClick = () => {
    setPaymentUrl(order.payment_response.redirect_url);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPaymentUrl("");
    refreshTransactions();
  };

  return (
    <>
      <Card className="relative w-full max-w-md border-2 border-blue-500 rounded-2xl overflow-visible mb-4">
        <CardContent className="p-4 space-y-4 dark:bg-slate-950">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              Total Rp{order.total_price.toLocaleString()}
            </h2>
            <Button
              variant="outline"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              {order.status}
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">{formatDate(order.created_at)}</p>
            <p>{order.products.length} item(s)</p>
          </div>
          <p>Payment method: {order.payment_method}</p>
          <p>Payment status: {order.payment_status}</p>
          {(order.status === "pending" || order.status === "confirmed") && (
            <Button
              className="mt-2 w-full bg-red-600 text-white font-semibold"
              onClick={() => onCancel(order._id)}
            >
              Cancel
            </Button>
          )}

          {order.payment_status === "pending" &&
            order.payment_method === "transfer" && (
              <Button
                className="mt-2 w-full dark:bg-blue-600 bg-blue-600 dark:text-white text-white"
                onClick={handlePaymentClick}
              >
                Lanjutkan Pembayaran
              </Button>
            )}
          {order.status === "shipped" && (
            <div>
              <Button
                className="w-full my-3 bg-blue-600 text-white font-semibold"
                onClick={() => onDelivered(order._id)}
                disabled={
                  order.status !== "shipped" ||
                  order.payment_status === "pending"
                }
              >
                {order.status === "shipped" ? "Delivered" : "Mark as Delivered"}
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            className="w-full flex items-center justify-between p-0 h-auto hover:bg-transparent"
            onClick={toggleExpand}
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
            className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
              isExpanded ? "bg-white border-t border-gray-200" : ""
            }`}
            style={{
              maxHeight: isExpanded
                ? `${contentRef.current?.scrollHeight}px`
                : "0px",
            }}
          >
            <div className="p-4 space-y-2 dark:bg-slate-950">
              <h3 className="font-semibold">Detail Pesanan:</h3>
              {order.products.map((product: productType, index: number) => (
                <p key={index} className="text-sm">
                  {index + 1}. {product.name} - {product.quantity}x - Rp
                  {product.price.toLocaleString()} each
                </p>
              ))}
              <p className="text-sm">
                Subtotal: Rp{order.total_price.toLocaleString()}
              </p>
              <p className="text-sm">Biaya Pengiriman: Included in total</p>
              <p className="font-semibold text-sm">
                Total: Rp{order.total_price.toLocaleString()}
              </p>
              <p className="text-sm">
                Metode Pembayaran: {order.payment_method}
              </p>
              <p className="text-sm">
                Alamat Pengiriman:{" "}
                {`${order.delivery_address.district}, ${order.delivery_address.regency}, ${order.delivery_address.province}`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isModalOpen && (
        <PaymentModal redirectUrl={paymentUrl} closeModal={handleCloseModal} />
      )}
    </>
  );
}

export default CardTransaction;
