import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { refetchUserData } from "@/api/user";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [img, setImg] = useState(null);
  const { toast } = useToast();

  const userData = sessionStorage.getItem("user_session");
  let parsedUserData;

  try {
    parsedUserData = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error parsing user session data:", error);
    parsedUserData = null;
  }

  const [editableUser, setEditableUser] = useState({
    name: parsedUserData?.user?.name || "",
    phone: parsedUserData?.user?.phone || "",
    email: parsedUserData?.user?.email || "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setEditableUser((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    const userDataToSend = {
      name: editableUser.name,
      email: editableUser.email,
      phone: editableUser.phone,
    };

    try {
      toast({
        title: "Saving...",
        description: "Please wait...",
      });

      const token = sessionStorage.getItem("authToken");
      const response = await fetch(
        "https://api-beli-galon.vercel.app/api/users/profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userDataToSend),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      await refetchUserData();

      toast({
        title: "Profile updated successfully!",
        description: "Your profile has been updated.",
      });

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to update profile.",
        description: "Please try again.",
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

    const token = sessionStorage.getItem("authToken");
    if (!token) {
      toast({
        title: "Unauthorized.",
        description: "You must be logged in to update your profile picture.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", img);

      const response = await fetch(
        "https://api-beli-galon.vercel.app/api/users/profile",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      await refetchUserData();

      toast({
        title: "Profile picture updated successfully!",
        description: "Your profile picture has been updated.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error.",
        description: "Failed to update profile picture. Please try again.",
      });
    }
  };

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
                    src={parsedUserData?.user?.profile_picture_url || ""}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Input
                  type="file"
                  id="profile-picture"
                  onChange={(e: any) => setImg(e.target.files[0])}
                  accept="image/*"
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg"
                />
              </div>
              <Button onClick={saveImg}>Save img</Button>
              <div>
                <h1 className="text-xl font-semibold">
                  Welcome, {editableUser.name}
                </h1>
                <p className="text-gray-600">
                  Informasi mengenai profile dan transaksi kamu di layanan Begal
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={editableUser.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address">Alamat</Label>
                <Input
                  id="address"
                  value={parsedUserData?.user?.address?.detail || ""}
                  readOnly
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">No. Hp</Label>
                <Input
                  id="phone"
                  value={editableUser.phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={editableUser.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className="mt-1"
                />
              </div>
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
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
