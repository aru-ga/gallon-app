import { SidebarProvider } from "@/components/ui/sidebar";
import Dashboard from "./Dashboard";

export default function Layout({ }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Dashboard />
    </SidebarProvider>
  );
}
