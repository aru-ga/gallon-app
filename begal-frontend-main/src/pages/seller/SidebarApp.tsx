import {
  HomeIcon,
  UserCircle2,
  DollarSign,
  ShoppingBagIcon,
  Star,
  Package2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import DarkModeToggle from "@/components/DarkToggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
interface SidebarAppProps {
  comps: React.ReactNode;
}
import { sellerType } from "@/lib/Interface";

export default function SidebarApp({ comps }: SidebarAppProps) {
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sellerSelector = useSelector((state: sellerType) => state.seller);

  const links = {
    navMain: [
      {
        items: [
          {
            title: "Dashboard",
            url: "/seller/dashboard",
            icon: <HomeIcon />,
          },
          {
            title: "Catalogue",
            url: "/seller/catalogue",
            icon: <Package2 />,
          },
          {
            title: "Profile",
            url: "/seller/profile",
            icon: <UserCircle2 />,
          },
          {
            title: "Transaction",
            url: "/seller/transaction",
            icon: <DollarSign />,
          },
          {
            title: "Order",
            url: "/seller/order",
            icon: <ShoppingBagIcon />,
          },
          {
            title: "Review",
            url: "/seller/review",
            icon: <Star />,
          },
        ],
      },
    ],
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user_session");
    navigate("/");
    window.location.reload();
  };

  const confirmSignOut = () => {
    setShowSignOutDialog(true);
  };

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>
            <h1 className="font-semibold">{sellerSelector.seller.name}</h1>
            <DarkModeToggle />
          </SidebarHeader>
          {links.navMain.map((group) => (
            <SidebarGroup key="main-group">
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => {
                    const isActive = location.pathname === item.url;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive}>
                          <Link to={item.url}>
                            {item.icon}
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <Link to="/">Back to Home</Link>
          <p className="text-xs text-gray-300 font-publicSans">© 2024 Begal</p>
          <Button
            className="w-full bg-red-500 hover:bg-red-300 text-white mt-3"
            variant="link"
            onClick={confirmSignOut}
          >
            Sign Out
          </Button>
        </SidebarFooter>
      </Sidebar>
      {comps}
      <Dialog open={showSignOutDialog} onOpenChange={setShowSignOutDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="dark:text-white">
              Confirm Sign Out
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to sign out? You will be redirected to the
              home page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="dark:text-white"
              variant="outline"
              onClick={() => setShowSignOutDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSignOut} variant="destructive">
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
