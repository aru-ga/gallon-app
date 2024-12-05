import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import logo from "@/assets/logo.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon, ShoppingCartIcon, MenuIcon } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkModeToggle from "./DarkToggle";
import { useSelector } from "react-redux";

export default function Navbar() {
  const location = useLocation();
  const activePath = location.pathname;
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/products?keyword=${encodeURIComponent(searchTerm)}`);
    }
  };

  const userSelector = useSelector((state: any) => state.user);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="py-5 fixed top-0 left-0 w-full bg-white dark:bg-gray-900 z-50 border-b">
      <NavigationMenu>
        <NavigationMenuList className="flex flex-row items-center w-screen px-10 justify-between">
          <NavigationMenuItem>
            <Link to="/">
              <img src={logo} alt="logo" width="200px" />
            </Link>
          </NavigationMenuItem>

          <div className="md:hidden">
            <Button onClick={toggleMenu} variant="ghost">
              <MenuIcon />
            </Button>
          </div>

          <div className={`hidden md:flex`}>
            {["/", "/depot-list", "/transaction", "/about"].map((path) => (
              <NavigationMenuItem key={path}>
                <Link to={path}>
                  <Button
                    variant="ghost"
                    className={
                      activePath === path
                        ? "text-blue-600 font-semibold"
                        : "dark:text-white"
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
              </NavigationMenuItem>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <NavigationMenuItem>
              <NavigationMenuLink>
                <form onSubmit={handleSearch} className="flex">
                  <Input
                    placeholder="Search"
                    className="rounded xl:w-40 md:w-36 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="ghost" type="submit" className="-ml-12">
                    <SearchIcon className="text-blue-600" />
                  </Button>
                </form>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <NavigationMenuItem>
              <NavigationMenuLink className="flex">
                <DarkModeToggle />
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>

          <div className="hidden md:flex space-x-5">
            {loggedIn ? (
              <>
                <div className="flex flex-row items-center gap-10">
                  <NavigationMenuItem>
                    <Link to="/cart">
                      <ShoppingCartIcon className="text-gray-600 dark:text-white" />
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link to="/user-profile/profile">
                      <div className="flex flex-row-reverse gap-2 items-center">
                        <p className="dark:text-white">
                          {userSelector.user.name}
                        </p>
                        <Avatar className="w-9 h-9">
                          <AvatarImage
                            src={userSelector.user.profile_picture_url}
                          />
                          <AvatarFallback>user</AvatarFallback>
                        </Avatar>
                      </div>
                    </Link>
                  </NavigationMenuItem>
                </div>
              </>
            ) : (
              <>
                <NavigationMenuItem>
                  <Link to="/login">
                    <Button className="dark:bg-slate-900 border-2 border-blue-600 bg-transparent text-blue-600 font-semibold rounded hover:bg-slate-200 dark:text-white dark:hover:bg-gray-800">
                      Sign In
                    </Button>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/register">
                    <Button className="bg-blue-600 rounded font-semibold dark:text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                      Sign Up
                    </Button>
                  </Link>
                </NavigationMenuItem>
              </>
            )}
          </div>
        </NavigationMenuList>

        {menuOpen && (
          <div
            className={`absolute top-full left-0 w-full bg-white dark:bg-gray-900 transition-transform duration-300 ease-in-out`}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <Input placeholder="Search" className="rounded w-full mb-2" />
              <Button variant="ghost" type="submit" className="-ml-12 mb-2">
                <SearchIcon />
              </Button>
            </div>
            <div className="p-4 items-center justify-center flex border-b border-gray-200 dark:border-gray-700">
              <DarkModeToggle />
            </div>

            {["/", "/depot-list", "/transaction", "/about"].map((path) => (
              <div
                key={path}
                className="p-4 border-b border-gray-200 dark:border-gray-700"
              >
                <Link to={path}>
                  <Button
                    variant="ghost"
                    className={
                      activePath === path
                        ? "text-blue-600 font-semibold w-full text-left"
                        : "dark:text-white w-full text-left"
                    }
                    onClick={() => setMenuOpen(false)}
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
              </div>
            ))}

            {loggedIn ? (
              <>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <Link to="/cart">
                    <ShoppingCartIcon className="text-gray-600 dark:text-white w-full text-left" />
                  </Link>
                </div>

                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <Link to="/profile">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <Link to="/login">
                    <Button className="dark:bg-slate-900 border-blue-600 bg-transparent text-blue-600 font-semibold rounded hover:bg-slate-200 dark:text-white dark:hover:bg-gray-800 w-full text-left mb-2">
                      Sign In
                    </Button>
                  </Link>
                </div>

                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <Link to="/register">
                    <Button className="bg-blue-600 rounded font-semibold dark:text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 w-full text-left mb-2">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </NavigationMenu>
    </nav>
  );
}
