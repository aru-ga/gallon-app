import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

interface Order {
  status: string;
  total_price: number;
  created_at: string;
}

interface ChartSellingProps {
  orders: Order[];
}

const chartConfig = {
  desktop: {
    label: "Total Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function ChartSelling({ orders }: ChartSellingProps) {
  const processedData = orders
    .filter((order) => order.status === "delivered")
    .reduce((acc, order) => {
      const date = new Date(order.created_at);
      const day = daysOfWeek[date.getDay()];
      acc[day] = (acc[day] || 0) + order.total_price;
      return acc;
    }, {} as Record<string, number>);

  const chartData = daysOfWeek.map((day) => ({
    day,
    desktop: processedData[day] || 0,
  }));

  return (
    <Card className="w-full mx-auto bg-gradient-to-br from-blue-50 to-white shadow-lg">
      <CardHeader>
        <CardTitle>Overview Pendapatan</CardTitle>
        <CardDescription>
          Menunjukan pendapatan paling banyak di hari tertentu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 24,
              right: 24,
              top: 12,
              bottom: 36,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="rgb(37, 99, 235)"
              fillOpacity={0.4}
              stroke="rgb(37, 99, 235)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Sunday - Saturday
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
