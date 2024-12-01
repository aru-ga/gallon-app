// app/transactions/columns.tsx
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

// Define the type of the data we are working with (Order)
export type Order = {
  order_id: string;
  status: string;
  payment_method: string;
  total_price: number;
  transaction_id: string;
  created_at: string;
  products: [
    {
      name: string;
    }
  ];
  delivery_address: {
    province: string;
    regency: string;
    district: string;
  };
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorFn: (row) => row.products[0]?.name,
    header: "Product",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
  },
  {
    accessorKey: "total_price",
    header: "Amount",
    cell: (info) => `IDR ${info.getValue()}`,
  },
  {
    accessorFn: (row) =>
      `${row.delivery_address?.province}, ${row.delivery_address?.regency}, ${row.delivery_address?.district}`,
    header: "Delivery Address",
  },
  {
    accessorFn: (row) => formatDate(row.created_at),
    header: "Date",
  },
];
