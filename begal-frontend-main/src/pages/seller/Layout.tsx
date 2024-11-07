import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarApp from "./SidebarApp";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <SidebarApp comps={children} />
    </SidebarProvider>
  );
}
