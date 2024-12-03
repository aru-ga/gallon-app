import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import CardAddress from "@/components/CardAddress";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboxAddress } from "@/components/ComboxAddress";
import { ChangeEvent } from "react";
import { UserProfile } from "@/types/userTypes";
import { Location } from "@/types/locationTypes";
import { reqChangeAddress } from "@/api/user";
import { toast } from "@/hooks/use-toast";

export default function Address() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: {
      detail: "",
      district: "",
      province: "",
      regency: "",
      street: "",
      village: "",
    },
  });

  const [selectedAddress, setSelectedAddress] = useState<{
    province: Location | null;
    regency: Location | null;
    district: Location | null;
    village: Location | null;
  }>({
    province: null,
    regency: null,
    district: null,
    village: null,
  });
  const userSelector = useSelector((state: any) => state.user);

  const handleAddressChange = (addressData: {
    province: Location | null;
    regency: Location | null;
    district: Location | null;
    village: Location | null;
  }) => {
    setSelectedAddress(addressData);
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        province: addressData.province?.name || "",
        regency: addressData.regency?.name || "",
        district: addressData.district?.name || "",
        village: addressData.village?.name || "",
      },
    }));
  };

  const handleChange =
    (field: keyof UserProfile | `address.${keyof UserProfile["address"]}`) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      if (field.startsWith("address.")) {
        const addressField = field.split(
          "."
        )[1] as keyof UserProfile["address"];
        setFormData((prevData) => ({
          ...prevData,
          address: {
            ...prevData.address,
            [addressField]: event.target.value,
          },
        }));
      } else {
        setFormData({ ...formData, [field]: event.target.value });
      }
    };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        address: {
          detail: formData.address.detail,
          district: formData.address.district,
          province: formData.address.province,
          regency: formData.address.regency,
          street: formData.address.street,
          village: formData.address.village,
        },
      };

      const response = await reqChangeAddress(payload.address);
      if (response) {
        toast({
          title: "Success",
          description: "Address updated successfully",
        });
      }
    } catch (error) {
      console.error("Failed to update address:", error);
    } finally {
      setLoading(false);
    }
  };

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
                buttonTag={
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="ghost">
                        Edit Adress
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="">
                      <DialogHeader>
                        <DialogTitle>Edit Address</DialogTitle>
                        <DialogDescription>
                          Make changes to your Address here, click save when
                          done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="address-form">
                        <h2>Select Address</h2>
                        <ComboxAddress onChange={handleAddressChange} />
                        <div className="hidden">
                          {selectedAddress.province?.name}
                          {selectedAddress.regency?.name}
                          {selectedAddress.district?.name}
                          {selectedAddress.village?.name}
                        </div>
                        <Label htmlFor="detail" className="mb-3">
                          Detail
                        </Label>
                        <Input
                          id="detail"
                          type="text"
                          placeholder="Masukkan Detail"
                          value={formData.address.detail}
                          onChange={handleChange("address.detail")}
                          className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <Label htmlFor="email" className="mb-3">
                          Street
                        </Label>
                        <Input
                          id="street"
                          type="text"
                          placeholder="Masukkan Street"
                          value={formData.address.street}
                          onChange={handleChange("address.street")}
                          className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          disabled={loading}
                          onClick={handleSubmit}
                          type="submit"
                        >
                          {loading ? "Loading..." : "Save"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                }
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
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
