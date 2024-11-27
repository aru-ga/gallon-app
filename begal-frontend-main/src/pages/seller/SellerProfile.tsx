import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import dummyImg from "@/assets/hero-slider.png";
import { sellerProfile } from "@/api/depot";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SellerProfile() {
  const [sellerData, setSellerData] = useState({
    owner_name: "",
    name: "",
    email: "",
    profile_picture_url: "",
    phone: "",
    address: {
      province: "",
      regency: "",
      district: "",
      village: "",
      street: "",
      detail: "",
    },
    operational_hours: {
      open: "",
      close: "",
    },
  });

  const fetchProfile = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const data = await sellerProfile(token);
      setSellerData(data.data);
      console.log(data.data);
    } else {
      console.error("No auth token found");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <>
      <SidebarInset className="dark:bg-gray-900 dark:text-white">
        <div className="flex flex-row items-center space-x-2 p-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <h1>Profile</h1>
        </div>

        <div className=" dark:text-white flex flex-col rounded-lg p-5 w-5/6 mx-auto">
          <img
            src={sellerData.profile_picture_url || dummyImg}
            className="object-cover rounded-xl h-96 mx-auto w-5/6"
            alt=""
          />
          <div className="flex flex-row items-center justify-between w-full">
            <div className="-mt-28 ml-20">
              <Avatar>
                <AvatarImage
                  className="rounded-full w-40"
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
                <Button variant="link">Change Image</Button>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{sellerData.name}</h2>
                <h2>{sellerData.address.province}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-600 p-6 rounded-xl min-h-[572px] min-w-[1000px] mx-auto space-y-4 text-white">
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-1">
              <Label htmlFor="nama" className="block text-sm">
                Nama
              </Label>
              <Input
                type="text"
                id="nama"
                value={sellerData.owner_name}
                readOnly
                className="w-full rounded-full px-3 py-1.5 p-5 bg-white text-black text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="jam" className="block text-sm">
                Jam Operasional
              </label>
              <Input
                type="text"
                id="jam"
                value={`${sellerData.operational_hours.open}-${sellerData.operational_hours.close} WIB`}
                readOnly
                className="w-full rounded-full px-3 py-1.5 p-5 bg-white text-black text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="phone" className="block text-sm">
                No.HP
              </label>
              <Input
                type="tel"
                id="phone"
                value={sellerData.phone}
                readOnly
                className="w-full rounded-full px-3 py-1.5 p-5 bg-white text-black text-sm"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={sellerData.email}
                readOnly
                className="w-full rounded-full px-3 py-1.5 p-5 bg-white text-black text-sm"
              />
            </div>
            <div className="space-y-1 col-span-2">
              <label htmlFor="alamat" className="block text-sm">
                Alamat
              </label>
              <Input
                type="text"
                id="alamat"
                value={
                  sellerData.address.regency +
                  ", " +
                  sellerData.address.district +
                  ", " +
                  sellerData.address.village +
                  ", " +
                  sellerData.address.street +
                  ", " +
                  sellerData.address.detail
                }
                readOnly
                className="w-full rounded-full px-3 py-1.5 p-5 bg-white text-black text-sm"
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
