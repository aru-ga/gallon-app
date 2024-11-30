import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";
import { DataTable } from "./transactions/data-table";
import { columns, Payment } from "./transactions/columns";
import { fetchOrders } from "@/api/depot";
import { OrderCardProps } from "@/types/depotType";

const token = localStorage.getItem("token");

async function getData(): Promise<OrderCardProps[]> {
  const orders = await fetchOrders(token);
  // Fetch data from your API here.
  // return [
  //   {
  //     id: "728ed52f",
  //     amount: 100,
  //     status: "pending",
  //     email: "m@example.com",
  //   },
  // ];
}
const data = await getData();

export default function SellerTransaction() {
  return (
    <>
      <SidebarInset>
        <div className="flex flex-row items-center space-x-2 p-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <h1>Transaction</h1>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <p>Hello User, Atur dan lihat track toko anda disini</p>
            </div>
            <div className="flex justify-center">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="container mx-auto py-10">
            {/* <DataTable columns={columns} data={data} /> */}
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
