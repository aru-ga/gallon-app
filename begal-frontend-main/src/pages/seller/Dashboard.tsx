import { ClipboardCheckIcon } from "lucide-react";
import { Hourglass } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import CardProduct from "@/components/CardProduct";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchProducts, fetchOrders } from "@/api/depot";
import { productType } from "@/types/productType";
import { orderType } from "@/types/orderType";

export default function Dashboard() {
  const [products, setProducts] = useState<productType>();
  const [orders, setOrders] = useState([]);

  const token = sessionStorage.getItem("authToken");
  const userData = sessionStorage.getItem("seller_session");

  const user = userData ? JSON.parse(userData) : null;

  const fetchCatalogue = async () => {
    const data = await fetchProducts(token);
    setProducts(data.data);
  };

  const fetchOrder = async () => {
    if (token) {
      const response = await fetchOrders(token);
      if (response.success) {
        setOrders(response.data);
      } else {
        console.error("Failed to fetch orders", response);
      }
    } else {
      console.error("No token found");
    }
  };

  const completedTransactions = orders.filter(
    (order: orderType) => order.status === "confirmed"
  ).length;

  const pendingTransactions = orders.filter(
    (order: orderType) => order.status === "pending"
  ).length;

  useEffect(() => {
    fetchCatalogue();
    fetchOrder();
  }, []);

  return (
    <>
      <SidebarInset className="dark:bg-gray-900 dark:text-white">
        <div className="flex flex-row items-center space-x-2 p-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <h1>Dashboard</h1>
        </div>
        <div className="flex flex-1 flex-col items-center space-y-10 gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <p className="text-3xl ">
                Hello, <span className="font-semibold">{user.seller.name}</span>
                <br />
                Atur dan lihat track toko anda disini
              </p>
            </div>
            <div className="flex justify-center">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="flex flex-row bg-blue-800 text-white rounded-lg h-40 mx-auto p-10 space-x-5 items-center justify-center">
            <div className="flex flex-row items-center space-x-3">
              <ClipboardCheckIcon size={70} />
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Berhasil</span>
                <span className="text-2xl font-bold">
                  {completedTransactions} Transaksi
                </span>
              </div>
            </div>
            <Separator orientation="vertical" className="bg-white/20 h-20" />
            <div className="flex flex-row items-center space-x-3">
              <Hourglass size={70} />
              <div className="flex flex-col">
                <span className="text-xl font-semibold">Proses</span>
                <span className="text-2xl font-bold">
                  {pendingTransactions} Transaksi
                </span>
              </div>
            </div>
          </div>

          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <div className="flex flex-row justify-between">
              <p>Catalogue</p>
              <Button variant="link">
                <Link to="/seller/dashboard/edit-catalogue">
                  Edit Catalogue
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {products &&
                Array.isArray(products) &&
                products.map((product: productType) => (
                  <CardProduct
                    key={product.id}
                    id={product.id}
                    image_url={product.image_url}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    stock={product.stock}
                    seller_id={""}
                    className={""}
                    created_at={"string"}
                    updated_at={"string"}
                    quantity={"string"}
                    seller_name={""}
                    product_id={""}
                    image={""}
                  />
                ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
