import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import CardAddress from "@/components/CardAddress";
import { useSelector } from "react-redux";

export default function Address() {
  const userSelector = useSelector((state) => state.user);

  return (
    <>
      <SidebarInset className="dark:bg-gray-900 dark:text-white">
        <div className="flex flex-row items-center space-x-2 p-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <h1>Address</h1>
        </div>
        <div>
          <div className="space-y-4 p-4">
            <h1 className="text-2xl font-bold mb-4">Your Address</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start auto-rows-auto">
              <CardAddress
                name={userSelector.user.name}
                phone={userSelector.user.phone}
                address={{
                  province: userSelector.user.address.province || "",
                  regency: userSelector.user.address.regency || "",
                  district: userSelector.user.address.district || "",
                  village: userSelector.user.address.village || "",
                  street: userSelector.user.address.street || "",
                  detail: userSelector.user.address.detail || "",
                }}
                onChangeAddress={() => {
                  console.log("Change address clicked");
                }}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
