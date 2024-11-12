import { ChevronLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Illustration from "../assets/unlog-transaction.png";
import { Button } from "@/components/ui/button";

export default function Transaction() {
  const token = localStorage.getItem("authToken");
  return (
    <>
      {token ? (
        <h1>Logged in</h1>
      ) : (
        <div className="h-screen w-screen absolute">
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
