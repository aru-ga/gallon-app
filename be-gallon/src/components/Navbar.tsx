import {
  NavigationMenu,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Dark } from "@/components/DarkMode";
import logo from "../app/public/images/logo.png";
import { UserCircle } from "lucide-react";
import { Bell } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Searchbar } from "@/components/Searchbar";

export const Navbar = () => {
  return (
    <NavigationMenu className="shadow-md">
      <NavigationMenuList className="flex justify-between w-screen px-3 ">
        <NavigationMenuItem>
          <NavigationMenuLink href="#">
            <Image src={logo} alt="123" width={200} />
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Searchbar />
        </NavigationMenuItem>

        <div className="flex flex-row items-center gap-3">
          <NavigationMenuItem>
            <NavigationMenuLink href="/">
              <ShoppingCart />
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">
              <Bell />
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/">
              <ClipboardList />
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="#">
              <UserCircle />
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Dark />
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
