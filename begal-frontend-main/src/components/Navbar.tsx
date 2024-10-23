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

export default function Navbar() {
  return (
    <>
      <NavigationMenu className="pt-5 border-b ">
        <NavigationMenuList className="flex flex-row items-center px-5 w-screen justify-between">
          <NavigationMenuItem>
            <NavigationMenuLink href="#">
              <img src={logo} alt="logo" width="200px" />
            </NavigationMenuLink>
          </NavigationMenuItem>

          <div className="flex">
            <NavigationMenuItem>
              <NavigationMenuLink href="#">
                <Button variant="ghost">Home</Button>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#">
                <Button variant="ghost">Contact</Button>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#">
                <Button variant="ghost">About Us</Button>
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
                <Button className="border-2 border-blue-600 bg-transparent text-blue-600 font-semibold rounded">
                  Sign In
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#">
                <Button className="bg-blue-600 rounded font-semibold">
                  Sign Up
                </Button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
