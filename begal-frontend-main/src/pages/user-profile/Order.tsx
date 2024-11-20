import { ClipboardCheckIcon } from "lucide-react";
import { Hourglass } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";

export default function Order() {
  return (
    <>
      <SidebarInset>
        <div className="flex flex-row items-center space-x-2 p-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <h1>Order</h1>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
              <p>Hello User, Atur dan lihat track toko anda disini</p>
            </div>
            <div className="flex justify-center">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="flex flex-row bg-blue-800 text-white rounded-lg h-40 mx-auto p-10 space-x-5 items-center  justify-center">
            <div className="flex flex-row items-center space-x-3">
              <ClipboardCheckIcon size={70} />
              <p>lorem</p>
            </div>
            <Separator orientation="vertical" />
            <div className="flex flex-row items-center space-x-3">
              <Hourglass size={70} />
              <p>lorem</p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
