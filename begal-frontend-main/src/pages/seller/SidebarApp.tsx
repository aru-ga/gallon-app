import {
  HomeIcon,
  UserCircle2,
  DollarSign,
  ShoppingBagIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import DarkModeToggle from "@/components/DarkToggle";
interface SidebarAppProps {
  comps: React.ReactNode;
}

export default function SidebarApp({ comps }: SidebarAppProps) {
  const location = useLocation();
  const sellerSelector = useSelector((state) => state.seller);

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
        ],
      },
    ],
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
      </Sidebar>
      {comps}
    </>
  );
}
