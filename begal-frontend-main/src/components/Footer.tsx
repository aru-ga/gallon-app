import Logo from "../assets/logo.png";
import { Heart, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="bg-black text-white">
        <div className="container mx-auto px-6 py-4 pt-20">
          <div className="flex flex-row justify-between">
            <div className="w-1/2">
              <p className="text-3xl">
                Begal - Solusi Praktis untuk kebutuhan air anda dirumah
              </p>
              <div className="flex flex-row space-x-4 mt-3">
                <a href="#" className="text-2xl">
                  <Instagram />
                </a>
                <a href="#" className="text-2xl">
                  <Facebook />
                </a>
              </div>
            </div>
            <div>
              <ul>
                <li className="flex flex-col">
                  <Link to="#">Kebijakan Privasi</Link>
                  <Link to="#">Syarat dan Ketentuan</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-b mt-20 h-min py-5 flex flex-row items-center justify-between">
            <img src={Logo} alt="" />
            <div className="flex flex-row gap-10">
              <Link to="#" className="text-2xl font-semibold">
                Terms of Use
              </Link>
              <Link to="#" className="text-2xl font-semibold">
                Privacy Policy
              </Link>
              <Link to="#" className="text-2xl font-semibold">
                Security
              </Link>
            </div>
          </div>

          <div className="text-center py-5 flex flex-row justify-between mt-10">
            <p>© 2024 Begal. All rights reserved.</p>
            <p className="flex flex-row">
              Made with <Heart className="mx-2 text-blue-500 animate-pulse" />{" "}
              from Kelompok 4
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
