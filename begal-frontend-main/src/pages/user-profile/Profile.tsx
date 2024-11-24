import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Camera } from "lucide-react";
import { useSelector } from "react-redux";

export default function Profile() {
  const userSelector = useSelector((state) => state.user);
  return (
    <>
      <SidebarInset className="dark:bg-gray-900 dark:text-white">
        <div className="flex flex-row items-center space-x-2 p-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <h1>Profile</h1>
        </div>
        <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={
                      userSelector.user.profile_picture_url ||
                      "/placeholder.svg"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg">
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <h1 className="text-xl font-semibold">
                  Welcome, {userSelector.user.name}
                </h1>
                <p className="text-gray-600">
                  Informasi mengenai profile dan transaksi kamu di layanan Begal
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input
                  id="fullName"
                  value={userSelector.user.name}
                  readOnly
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address">Alamat</Label>
                <Input
                  id="address"
                  value={userSelector.user.address?.detail}
                  readOnly
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">No.Hp</Label>
                <Input
                  id="phone"
                  value={userSelector.user.phone}
                  readOnly
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="gender">Jenis Kelamin</Label>
                <Input
                  id="gender"
                  value="Laki-laki"
                  readOnly
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={userSelector.user.email}
                  readOnly
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
