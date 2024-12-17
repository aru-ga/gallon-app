import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Product {
  product_id: string;
  name: string;
  image_url: string;
  quantity: number;
  price: number;
  _id: string;
}

interface Order {
  status: string;
  products: Product[];
  total_price: number;
  created_at: string;
}

interface ChartPieSellingProps {
  orders: Order[];
}

const chartConfig = {
  //@ts-expect-error outside comps
  label: "Top Selling Products",
} satisfies ChartConfig;

export function ChartPieSelling({ orders }: ChartPieSellingProps) {
  const blueShades = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

  const productSales = React.useMemo(() => {
    const sales: Record<string, { name: string; quantity: number }> = {};

    orders.forEach((order) => {
      if (order.status === "delivered") {
        order.products.forEach((product) => {
          if (sales[product.product_id]) {
            sales[product.product_id].quantity += product.quantity;
          } else {
            sales[product.product_id] = {
              name: product.name,
              quantity: product.quantity,
            };
          }
        });
      }
    });

    return Object.values(sales);
  }, [orders]);

  const totalSales = React.useMemo(() => {
    return productSales.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [productSales]);

  return (
    <Card className="w-1/2 mx-auto bg-gradient-to-br from-blue-50 to-white shadow-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>Overview of the top-selling products</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          //@ts-expect-error outside comps
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={productSales}
              dataKey="quantity"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {productSales.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={blueShades[index % blueShades.length]}
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalSales.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Sold Products
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing top-selling products of all time.
        </div>
      </CardFooter>
    </Card>
  );
}
