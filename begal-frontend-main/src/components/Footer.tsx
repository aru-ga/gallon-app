import Logo from "../assets/logo.png";
import { Heart, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-10 sm:mt-20">
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row justify-between">
            <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
              <p className="text-xl sm:text-2xl lg:text-3xl mb-4">
                Begal - Solusi Praktis untuk kebutuhan air anda dirumah
              </p>
              <div className="flex flex-row space-x-4 mt-3">
                <a
                  href="https://www.instagram.com/beli_galon?igsh=ajI2NG5wcWtpYXJn&utm_source=qr"
                  className="text-xl sm:text-2xl"
                >
                  <Instagram />
                </a>
                <a
                  href="https://www.facebook.com/share/1B2AEFCQt8/?mibextid=kFxxJD"
                  className="text-xl sm:text-2xl"
                >
                  <Facebook />
                </a>
              </div>
            </div>
            <div className="mt-6 sm:mt-0">
              <ul>
                <li className="flex flex-col space-y-2">
                  <Link to="#" className="text-sm sm:text-base">
                    Kebijakan Privasi
                  </Link>
                  <Link to="#" className="text-sm sm:text-base">
                    Syarat dan Ketentuan
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-b mt-8 sm:mt-12 lg:mt-20 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between">
            <img
              src={Logo}
              alt="Begal Logo"
              className="h-8 sm:h-10 mb-4 sm:mb-0"
            />
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10 text-center sm:text-left">
              <Link
                to="#"
                className="text-base sm:text-lg lg:text-xl font-semibold"
              >
                Terms of Use
              </Link>
              <Link
                to="#"
                className="text-base sm:text-lg lg:text-xl font-semibold"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-base sm:text-lg lg:text-xl font-semibold"
              >
                Security
              </Link>
            </div>
          </div>

          <div className="text-center sm:text-left py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-10">
            <p className="text-sm sm:text-base mb-2 sm:mb-0">
              © 2024 Begal. All rights reserved.
            </p>
            <p className="flex flex-row items-center text-sm sm:text-base">
              Made with{" "}
              <Heart className="mx-2 text-blue-500 animate-pulse w-4 h-4 sm:w-5 sm:h-5" />{" "}
              from Kelompok 4
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
