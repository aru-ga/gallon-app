import { ChevronLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Illustration from "../assets/unlog-transaction.png";
import { Button } from "@/components/ui/button";
import instance from "@/lib/axios";
import transactionType from "@/types/transactionType";
import { useEffect, useState } from "react";
import CardTransaction from "@/components/CardTransaction";

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

export default function Transaction() {
  const [transaction, setTransaction] = useState([{}]);
  const token = localStorage.getItem("authToken");

  const getTransaction = async () => {
    try {
      const response = await instance.get("orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data.data);
      setTransaction(response.data);
      console.log(transaction);
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <>
      {token ? (
        <div className="min-h-screen flex items-center justify-center"></div>
      ) : (
        <div className="min-h-screen min-w-screen">
          <Link
            to="/"
            className="flex flex-row hover:text-gray-500 items-center gap-5 m-10 w-min"
          >
            <ChevronLeftCircle size="40" />
            <h1 className="text-2xl">Keranjang</h1>
          </Link>

          <div className="flex flex-row justify-center items-center w-full rounded-lg gap-10 ">
            <img src={Illustration} alt="" />
            <div className="flex flex-col items-center gap-5">
              <h3 className="text-xl">
                Silakan login untuk melanjutkan akses ke halaman ini.
              </h3>
              <Button variant="default" className="bg-blue-600 px-10">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
