import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  activePath: string;
}

export default function Navbar({ activePath }: NavbarProps) {
  return (
    <>
      <NavigationMenu className="py-3 fixed top-0 left-0 w-full bg-white z-50">
        <NavigationMenuList className="flex flex-row items-center px-5 w-screen justify-between">
          <NavigationMenuItem>
            <NavigationMenuLink>
              <Link to="/">
                <img src={logo} alt="logo" width="200px" />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <div className="flex">
            <NavigationMenuItem>
              <NavigationMenuLink>
                <Link to="/">
                  <Button
                    variant="ghost"
                    className={
                      activePath === "/" ? "text-blue-600 font-semibold" : ""
                    }
                  >
                    Home
                  </Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink>
                <Link to="/contact">
                  <Button
                    variant="ghost"
                    className={
                      activePath === "/contact"
                        ? "text-blue-600 font-semibold"
                        : ""
                    }
                  >
                    Contact
                  </Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#">
                <Link to="/about">
                  <Button
                    variant="ghost"
                    className={
                      activePath === "/about"
                        ? "text-blue-600 font-semibold"
                        : ""
                    }
                  >
                    About
                  </Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>

          <div className="flex space-x-5">
            <NavigationMenuItem>
              <NavigationMenuLink className="flex" href="#">
                <Input placeholder="Search" className="rounded w-96" />
                <Button variant="ghost" type="submit" className="-ml-12">
                  <SearchIcon />
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#">
                <Link to="/login">
                  <Button className="border-2 border-blue-600 bg-transparent text-blue-600 font-semibold rounded hover:bg-slate-200">
                    Sign In
                  </Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#">
                <Link to="/register">
                  <Button className="bg-blue-600 rounded font-semibold hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
