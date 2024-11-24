import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarUser from "../user-profile/SidebarUser";
import SidebarApp from "../seller/SidebarApp";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isUserPath = location.pathname.startsWith("/user-profile");
  const isSellerPath = location.pathname.startsWith("/seller");

  return (
    <SidebarProvider>
      {isUserPath && <SidebarUser comps={children} />}
      {isSellerPath && <SidebarApp comps={children} />}
      {!isUserPath && !isSellerPath && <div>{children}</div>}
    </SidebarProvider>
  );
}
