import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import transactionType from "@/types/transactionType";

const dummyOrders: transactionType[] = [
  {
    _id: "673a2750477815bfaf589783",
    user_id: "6739899b13379cc207e5b9df",
    seller_id: "671d3d9a928bd15c1420e343",
    created_at: "2024-11-17T17:26:40.447Z",
    delivery_address: {
      province: "DI YOGYAKARTA",
      regency: "KABUPATEN SLEMAN",
      district: "NGEMPLAK",
    },
    payment_method: "transfer",
    payment_response: {
      token: "1a9f9ce7-9014-4469-bce2-d15dbaa430c4",
      redirect_url:
        "https://app.sandbox.midtrans.com/snap/v4/redirection/1a9f9ce7-9014-4469-bce2-d15dbaa430c4",
    },
    payment_status: "pending",
    products: [
      {
        product_id: "672abd55e7d8123bd3cf4fe3",
        name: "Aqua Botol 600ml",
        image_url:
          "https://res.cloudinary.com/dftnz5baq/image/upload/v1730854587/uploads/wzi1jn3ct3btsvczjgql.png",
        price: 18000,
        quantity: 1,
      },
      {
        product_id: "671da472fddde61ed5ad45ad",
        name: "Galon Air Mineral 19L",
        image_url: null,
        price: 20000,
        quantity: 1,
      },
    ],
    status: "pending",
    total_price: 38000,
    transaction_id: "",
    updated_at: "2024-11-17T17:26:42.225Z",
  },
  {
    _id: "673a2795477815bfaf589792",
    user_id: "6739899b13379cc207e5b9df",
    seller_id: "671d3d9a928bd15c1420e343",
    created_at: "2024-11-17T17:27:49.123Z",
    delivery_address: {
      province: "DI YOGYAKARTA",
      regency: "KOTA YOGYAKARTA",
      district: "GONDOKUSUMAN",
    },
    payment_method: "cash",
    payment_response: {
      token: "",
      redirect_url: "",
    },
    payment_status: "paid",
    products: [
      {
        product_id: "671da472fddde61ed5ad45ad",
        name: "Galon Air Mineral 19L",
        image_url: null,
        price: 20000,
        quantity: 2,
      },
    ],
    status: "processing",
    total_price: 40000,
    transaction_id: "TRX123456",
    updated_at: "2024-11-17T17:28:00.000Z",
  },
  {
    _id: "673a2b0f0d7586d70c319b34",
    user_id: "6739899b13379cc207e5b9df",
    seller_id: "671d3d9a928bd15c1420e343",
    created_at: "2024-11-17T17:30:15.789Z",
    delivery_address: {
      province: "DI YOGYAKARTA",
      regency: "KABUPATEN BANTUL",
      district: "SEWON",
    },
    payment_method: "transfer",
    payment_response: {
      token: "2b0f9ce7-9014-4469-bce2-d15dbaa430c5",
      redirect_url:
        "https://app.sandbox.midtrans.com/snap/v4/redirection/2b0f9ce7-9014-4469-bce2-d15dbaa430c5",
    },
    payment_status: "pending",
    products: [
      {
        product_id: "672abd55e7d8123bd3cf4fe3",
        name: "Aqua Botol 600ml",
        image_url:
          "https://res.cloudinary.com/dftnz5baq/image/upload/v1730854587/uploads/wzi1jn3ct3btsvczjgql.png",
        price: 18000,
        quantity: "3",
      },
    ],
    status: "pending",
    total_price: 54000,
    transaction_id: "",
    updated_at: "2024-11-17T17:30:20.000Z",
  },
];
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
                  className="mt-2 w-full"
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

export default function Component() {
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {dummyOrders.map((order) => (
        <CardTransaction key={order._id} order={order} />
      ))}
    </div>
  );
}
