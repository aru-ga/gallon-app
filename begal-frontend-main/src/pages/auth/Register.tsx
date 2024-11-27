import Illustration from "@/assets/img-sign.png";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <main className="flex flex-row h-screen mt-20 dark:text-white">
      <div>
        <img src={Illustration} className="h-screen" alt="" />
      </div>

      <div className="p-20 flex flex-col justify-around items-center">
        <div>
          <h3 className="text-5xl">Selamat Datang!</h3>
          <h4 className="text-5xl">
            Silakan daftar untuk menggunakan aplikasi kami
          </h4>
        </div>
        <div className="flex flex-col border-2 border-blue-600 py-20 mt-10 gap-20 px-36 rounded-3xl">
          <Link
            to="/register-user"
            className="px-16 py-3 text-white rounded bg-blue-600 font-semibold hover:bg-blue-700"
          >
            Register as User
          </Link>
          <Link
            to="/register-seller"
            className="px-16 py-3 rounded bg-white border border-blue-600 text-blue-600 font-semibold"
          >
            Register as Seller
          </Link>
        </div>
      </div>
    </main>
  );
}
