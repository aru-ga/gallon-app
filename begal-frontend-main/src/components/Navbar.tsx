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
import { useState } from "react";

interface NavbarProps {
  activePath: string;
}

export default function Navbar({ activePath }: NavbarProps) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationMenu className="py-3 fixed top-0 left-0 w-full bg-white z-50">
      <NavigationMenuList className="flex flex-row items-center px-5 w-screen justify-between">
        <NavigationMenuItem>
          <NavigationMenuLink>
            <Link to="/">
              <img src={logo} alt="logo" width="200px" />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <div className="flex space-x-5">
          {["/", "/depot-list", "/about"].map((path) => (
            <NavigationMenuItem key={path}>
              <NavigationMenuLink>
                <Link to={path}>
                  <Button
                    variant="ghost"
                    className={
                      activePath === path ? "text-blue-600 font-semibold" : ""
                    }
                  >
                    {path === "/"
                      ? "Home"
                      : path === "/depot-list"
                      ? "Depot List"
                      : "About"}
                  </Button>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </div>

        {/* Search Input */}
        <div className="flex items-center space-x-2">
          <NavigationMenuItem>
            <NavigationMenuLink className="flex" href="#">
              <Input placeholder="Search" className="rounded w-96" />
              <Button variant="ghost" type="submit" className="-ml-12">
                <SearchIcon />
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </div>

        {/* User Authentication Buttons */}
        <div className="flex space-x-5">
          {loggedIn ? (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link to="/profile">
                    <Button className="border-2 border-blue-600 bg-transparent text-blue-600 font-semibold rounded hover:bg-slate-200">
                      Profile
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          ) : (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link to="/login">
                    <Button className="border-2 border-blue-600 bg-transparent text-blue-600 font-semibold rounded hover:bg-slate-200">
                      Sign In
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link to="/register">
                    <Button className="bg-blue-600 rounded font-semibold hover:bg-blue-700">
                      Sign Up
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          )}
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
