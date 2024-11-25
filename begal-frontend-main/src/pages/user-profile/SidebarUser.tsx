import { MapIcon, UserCircle2, DollarSign, LockIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
import DarkModeToggle from "@/components/DarkToggle";
interface SidebarAppProps {
  comps: React.ReactNode;
}
import { useSelector } from "react-redux";

export default function SidebarUser({ comps }: SidebarAppProps) {
  const location = useLocation();
  const userSelector = useSelector((state) => state.user);
  console.log("userSelector", userSelector);

  const links = {
    navMain: [
      {
        items: [
          {
            title: "My Profile",
            url: "/user-profile/profile",
            icon: <UserCircle2 />,
          },
          {
            title: "Address",
            url: "/user-profile/address",
            icon: <MapIcon />,
          },
          {
            title: "Transaction",
            url: "/user-profile/transaction",
            icon: <DollarSign />,
          },
          {
            title: "Change Password",
            url: "/user-profile/change-password",
            icon: <LockIcon />,
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
            <h1 className="text-2xl font-semibold">
              Hello, {userSelector.user.name}
            </h1>
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
          <p className="text-sm text-gray-500">© 2021 Begal</p>
        </SidebarFooter>
      </Sidebar>
      {comps}
    </>
  );
}
