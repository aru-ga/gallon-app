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
import { OrderCardProps } from "@/types/depotType";


export function CardConfirmOrder({ order, onConfirm }: OrderCardProps) {
  const formattedDate = formatDate(order.created_at);
  const formattedExpiryDate = formatDate(order.payment_expiry);

  return (
    <Card className="max-w-2xl mb-4 w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Order ID: {order._id.slice(0, 6)}</span>
          <Badge
          className={order.status === "confirmed" ? "bg-green-400" : "bg-red-400"}
            variant={order.status === "confirmed" ? "default" : "secondary"}
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
            <AccordionContent >
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
            <AccordionContent >
              <div className="text-sm">
                Transaction ID: {order.transaction_id}
              </div>
              {order.payment_response.va_numbers.map((va, index) => (
                <div key={index} className="text-sm">
                  {va.bank.toUpperCase()} VA: {va.va_number}
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Products</AccordionTrigger>
            <AccordionContent >
              {order.products.map((product) => (
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
      <CardFooter>
        <Button
          className="w-full bg-blue-400"
          onClick={() => onConfirm(order._id)}
          disabled={order.status === "confirmed"}
        >
          {order.status === "confirmed" ? "Confirmed" : "Confirm Order"}
        </Button>
      </CardFooter>
    </Card>
  );
}
