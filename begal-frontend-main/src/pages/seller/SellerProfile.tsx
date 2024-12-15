import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { refetchSellerData } from "@/api/depot";

export default function SellerProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [img, setImg] = useState<File | null>(null);
  const { toast } = useToast();
  const [parsedSellerData, setParsedSellerData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      await refetchSellerData();
      const sellerData = sessionStorage.getItem("seller_session");
      try {
        const parsed = sellerData ? JSON.parse(sellerData) : null;
        setParsedSellerData(parsed);
      } catch (error) {
        console.error("Error parsing seller session data:", error);
      }
    };
    fetchData();
  }, []);

  const [editableSeller, setEditableSeller] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (parsedSellerData) {
      setEditableSeller({
        name: parsedSellerData.seller.name || "",
        phone: parsedSellerData.seller.phone || "",
        email: parsedSellerData.seller.email || "",
      });
    }
  }, [parsedSellerData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setEditableSeller((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      toast({
        title: "Saving...",
        description: "Please wait...",
      });

      const token = sessionStorage.getItem("authToken");
      const response = await fetch(
        "https://api-beli-galon.vercel.app/api/sellers/profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editableSeller),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save updated seller data.");
      }

      await refetchSellerData();
      toast({
        title: "Success",
        description: "Seller data updated successfully",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating seller data:", error);
      toast({
        title: "Error",
        description: "Failed to update seller data",
      });
    }
  };

  const saveImg = async () => {
    if (!img) {
      toast({
        title: "No image selected.",
        description: "Please choose an image to upload.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", img);

    try {
      toast({
        title: "Saving...",
        description: "Please wait...",
      });

      const token = sessionStorage.getItem("authToken");
      const response = await fetch(
        "https://api-beli-galon.vercel.app/api/sellers/profile",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save image.");
      }

      await refetchSellerData();
      toast({
        title: "Success",
        description: "Image updated successfully",
      });
    } catch (error) {
      console.error("Error updating image:", error);
      toast({
        title: "Error",
        description: "Failed to update image",
      });
    }
  };

  if (!parsedSellerData) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarInset className="dark:bg-gray-900 dark:text-white">
      <div className="flex flex-row items-center space-x-2 p-3">
        <SidebarTrigger />
        <Separator orientation="vertical" />
        <h1>Profile</h1>
      </div>

      <div className="flex items-center space-x-4 mt-8">
        {isEditing ? (
          <div>
            <Button onClick={handleSave}>Save</Button>
            <Button variant="secondary" onClick={handleEditToggle}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button onClick={handleEditToggle}>Edit</Button>
        )}
      </div>

      <div className="dark:text-white flex flex-col rounded-lg p-5 w-5/6 mx-auto">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="-mt-28 ml-20">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={parsedSellerData.seller?.profile_picture_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <Input
                type="file"
                id="profile-picture"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImg(e.target.files?.[0] || null)
                }
                accept="image/*"
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg"
              />
            </div>
            <Button onClick={saveImg}>Save img</Button>
            <div>
              <h2 className="text-2xl font-bold">
                {parsedSellerData.seller.name}
              </h2>
              <h2>{parsedSellerData.seller.address.province}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-600 p-6 rounded-xl min-h-[572px] min-w-[1000px] mx-auto space-y-4 text-white">
        <div className="grid grid-cols-2 gap-10">
          <div>
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              value={editableSeller.name}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="mt-1 text-black dark:text-white"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="jam">Jam Operasional</Label>
            <Input
              type="text"
              id="jam"
              value={`${parsedSellerData.seller.operational_hours.open}-${parsedSellerData.seller.operational_hours.close} WIB`}
              readOnly
              className="mt-1 text-black dark:text-white"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">No.HP</Label>
            <Input
              type="tel"
              id="phone"
              value={editableSeller.phone}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="mt-1 text-black dark:text-white"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={editableSeller.email}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="mt-1 text-black dark:text-white"
            />
          </div>
          <div className="space-y-1 col-span-2">
            <Label htmlFor="address">Alamat</Label>
            <Input
              id="address"
              value={parsedSellerData.seller?.address?.detail || ""}
              readOnly
              className="mt-1 text-black dark:text-white"
            />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
