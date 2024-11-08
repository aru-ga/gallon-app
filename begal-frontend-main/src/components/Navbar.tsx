import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkModeToggle from "./DarkToggle";

interface NavbarProps {
  activePath: string;
}

export default function Navbar({ activePath }: NavbarProps) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <NavigationMenu className="py-5 fixed top-0 left-0 w-full bg-white dark:bg-gray-900 z-50">
      <NavigationMenuList className="flex flex-row items-center px-5 w-screen justify-between">
        <NavigationMenuItem>
          <NavigationMenuLink>
            <Link to="/">
              <img src={logo} alt="logo" width="200px" />
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <div className="flex space-x-5">
          {["/", "/depot-list", "/transaction", "/about"].map((path) => (
            <NavigationMenuItem key={path}>
              <NavigationMenuLink>
                <Link to={path}>
                  <Button
                    variant="ghost"
                    className={
                      activePath === path ? "text-blue-600 font-semibold" : "dark:text-white"
                    }
                  >
                    {path === "/"
                      ? "Home"
                      : path === "/depot-list"
                      ? "Depot List"
                      : path === "/about"
                      ? "About"
                      : path === "/transaction"
                      ? "Transaction"
                      : ""}
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
              <Input placeholder="Search" className="rounded w-72" />
              <Button variant="ghost" type="submit" className="-ml-12">
                <SearchIcon />
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center space-x-2">
          <NavigationMenuItem>
            <NavigationMenuLink className="flex" href="#">
              <DarkModeToggle />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </div>

        {/* User Authentication Buttons */}
        <div className="flex space-x-5">
          {loggedIn ? (
            <>
              <div className="flex flex-row items-center gap-5">
                <NavigationMenuItem>
                  <NavigationMenuLink>
                    <Link to="/cart">
                      <ShoppingCartIcon className="text-gray-600 dark:text-white" />
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink>
                    <Link to="/profile">
                      <Avatar className="w-9 h-9">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>user</AvatarFallback>
                      </Avatar>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </div>
            </>
          ) : (
            <>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link to="/login">
                    <Button className="dark:bg-slate-900 border-2 border-blue-600 bg-transparent text-blue-600 font-semibold rounded hover:bg-slate-200 dark:text-white  dark:hover:bg-gray-800">
                      Sign In
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink>
                  <Link to="/register">
                    <Button className="bg-blue-600 rounded font-semibold dark:text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
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
