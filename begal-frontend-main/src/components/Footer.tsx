import Logo from "../assets/logo.png";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="bg-black text-white">
        <div className="container mx-auto px-6 py-4 pt-20">
          <div className="flex flex-row justify-between">
            <div className="w-1/2">
              <div className="text-3xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
                quidem natus necessitatibus recusandae libero.
              </div>
              <div className="flex flex-row">
                <p>icon</p>
                <p>icon</p>
                <p>icon</p>
              </div>
            </div>
            <div>
              <ul>
                <li className="flex flex-col">
                  <a href="#">Lorem ipsum</a>
                  <a href="#">Lorem ipsum</a>
                  <a href="#">Lorem ipsum</a>
                  <a href="#">Lorem ipsum</a>
                  <a href="#">Lorem ipsum</a>
                  <a href="#">Lorem ipsum</a>
                  <a href="#">Lorem ipsum</a>
                  <a href="#">Lorem ipsum</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-b mt-20 h-min py-5 flex flex-row items-center justify-between">
            <img src={Logo} alt="" />
            <div className="flex flex-row gap-10">
              <a href="#" className="text-2xl font-semibold">
                Terms of Use
              </a>
              <a href="#" className="text-2xl font-semibold">
                Privacy Policy
              </a>
              <a href="#" className="text-2xl font-semibold">
                Security
              </a>
            </div>
          </div>

          <div className="text-center py-5 flex flex-row justify-between mt-10">
            <p>© 2021 Begal. All rights reserved.</p>
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
