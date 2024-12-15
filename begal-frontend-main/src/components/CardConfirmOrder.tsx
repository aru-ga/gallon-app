import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { productType } from "@/types/productType";
import { orderType } from "@/types/orderType";

export function CardConfirmOrder({
  order,
  onConfirm,
  onCancel,
  onCash,
  onShipped,
}: {
  order: orderType;
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  onCash: (id: string) => void;
  onShipped: (id: string) => void;
}) {
  const formattedDate = formatDate(order.created_at);
  const formattedExpiryDate = formatDate(order.payment_expiry);

  const statusStyles = {
    pending: {
      className: "px-3 py-1 bg-yellow-400 text-black",
      variant: "secondary",
    },
    confirmed: {
      className: "px-3 py-1 bg-blue-400 text-white",
      variant: "default",
    },
    shipped: {
      className: "px-3 py-1 bg-purple-400 text-white",
      variant: "default",
    },
    delivered: {
      className: "px-3 py-1 bg-green-400 text-white",
      variant: "default",
    },
    cancelled: {
      className: "px-3 py-1 bg-red-400 text-white",
      variant: "secondary",
    },
  };

  function isConfirmDisabled(orderStatus: string) {
    return orderStatus !== "pending";
  }

  function isShipDisabled(order: { status: string; payment_status: string }) {
    return !(
      order.status === "confirmed" && order.payment_status === "success"
    );
  }

  function isCancelDisabled(orderStatus: string) {
    return orderStatus === "delivered" || orderStatus === "shipped";
  }

  return (
    <Card className="max-w-2xl mb-4 w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{order.payment_method}</span>
          <Badge
            className={statusStyles[order.status]?.className || ""}
            variant={statusStyles[order.status]?.variant || "secondary"}
          >
            {order.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-semibold">Order Details</div>
          <div className="text-sm">Created: {formattedDate}</div>
          <div className="text-sm">
            Total: Rp{order.total_price.toLocaleString()}
          </div>
          <div className="text-sm">Payment Method: {order.payment_method}</div>
          <div className="text-sm">Payment Status: {order.payment_status}</div>
          <div className="text-sm">Expiry: {formattedExpiryDate}</div>
        </div>
        <Separator />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Delivery Address</AccordionTrigger>
            <AccordionContent>
              <div className="text-sm">
                {order.delivery_address.street},{" "}
                {order.delivery_address.village},{" "}
                {order.delivery_address.district},{" "}
                {order.delivery_address.regency},{" "}
                {order.delivery_address.province}
              </div>
              <div className="text-sm">{order.delivery_address.detail}</div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Payment Details</AccordionTrigger>
            <AccordionContent>
              <div className="text-sm">
                Transaction ID: {order.transaction_id}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Products</AccordionTrigger>
            <AccordionContent>
              {order.products.map((product: productType) => (
                <div
                  key={product.product_id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {product.name} x{product.quantity}
                  </span>
                  <span>Rp{product.price.toLocaleString()}</span>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      {order.status !== "cancelled" && order.status !== "delivered" && (
        <CardFooter>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Action</AccordionTrigger>
              <AccordionContent>
                {order.payment_method === "transfer" ? (
                  <div className="w-full flex flex-col gap-4">
                    <Button
                      className="w-full bg-blue-400"
                      onClick={() => onConfirm(order._id)}
                      disabled={
                        isConfirmDisabled(order.status) ||
                        order.payment_status !== "success"
                      }
                    >
                      {order.status === "confirmed"
                        ? "Confirmed"
                        : "Confirm Order"}
                    </Button>

                    <Button
                      className="w-full bg-blue-400"
                      onClick={() => onShipped(order._id)}
                      disabled={isShipDisabled(order)}
                    >
                      Ship Now
                    </Button>

                    <Button
                      className="w-full bg-red-400"
                      onClick={() => onCancel(order._id)}
                      disabled={isCancelDisabled(order.status)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 w-full">
                    <Button
                      className="w-full bg-blue-400"
                      onClick={() => onConfirm(order._id)}
                      disabled={isConfirmDisabled(order.status)}
                    >
                      {order.status === "confirmed"
                        ? "Confirmed"
                        : "Confirm Order"}
                    </Button>
                    <Button
                      className="w-full bg-blue-400"
                      onClick={() => onShipped(order._id)}
                      disabled={order.status !== "confirmed"}
                    >
                      Ship Now
                    </Button>
                    <Button
                      className="w-full bg-blue-400"
                      onClick={() => onCash(order._id)}
                      disabled={
                        !(
                          order.status === "shipped" &&
                          order.payment_status === "pending"
                        )
                      }
                    >
                      Sudah Dibayar
                    </Button>

                    <Button
                      className="w-full bg-red-400"
                      onClick={() => onCancel(order._id)}
                      disabled={isCancelDisabled(order.status)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardFooter>
      )}
    </Card>
  );
}
