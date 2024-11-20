import { ClipboardCheckIcon } from "lucide-react";
import { Hourglass } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import CardProduct from "@/components/CardProduct";
import { products } from "@/lib/DummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  const [count, setCount] = useState(0);
  return (
    <>
      <SidebarInset className="dark:bg-gray-900 dark:text-white">
        <div className="flex flex-row items-center space-x-2 p-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <h1>Dashboard</h1>
        </div>
        <div className=" flex flex-1 flex-col items-center space-y-10 gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <p className="text-3xl font-semibold">
                Hello User, <br />
                Atur dan lihat track toko anda disini
              </p>
            </div>
            <div className="flex justify-center">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="flex flex-row bg-blue-800 text-white rounded-lg h-40 mx-auto p-10 space-x-5 items-center  justify-center">
            <div className="flex flex-row items-center space-x-3">
              <ClipboardCheckIcon size={70} />
              <p>{count}</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-row items-center space-x-3">
              <Hourglass size={70} />
              <p>lorem</p>
            </div>
          </div>

          <div className="min-h-[100vh]  flex-1 rounded-xl md:min-h-min">
            <div className="flex flex-row justify-between">
              <p>Catalogue</p>
              <Button variant="link">
                <Link to="/seller/dashboard/edit-catalogue">
                  Edit Catalogue
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {products.map((product) => (
                <CardProduct
                  key={product.id}
                  id={product.id}
                  image_url={product.image_url}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  stock={product.stock}
                  seller_id={""}
                />
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
