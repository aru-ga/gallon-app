import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Label } from "@radix-ui/react-label";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { updateProfile, updateProfilePicture } from "@/api/user";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const userSelector = useSelector((state: any) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [img, setImg] = useState(null);
  const [editableUser, setEditableUser] = useState({
    name: userSelector.user.name,
    phone: userSelector.user.phone,
    email: userSelector.user.email,
  });

  const { toast } = useToast();

  useEffect(() => {
    setEditableUser({
      name: userSelector.user.name,
      phone: userSelector.user.phone,
      email: userSelector.user.email,
    });
  }, [userSelector]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setEditableUser((prev) => ({
      ...prev,
      [id]: value,
    }));
    console.log("Updated editableUser:", { ...editableUser, [id]: value });
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
      await updateProfile(userDataToSend);
      toast({
        title: "Profile updated successfully!",
        description: "Your profile has been updated.",
      });

      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Failed to update profile.",
        description: "Please try again.",
      });
    }
  };

  const saveImg = async () => {
    try {
      const data = new FormData();
      data.append("image", img);
      await updateProfilePicture(data);
      toast({
        title: "Profile picture updated successfully!",
        description: "Your profile picture has been updated.",
      });
    } catch (error) {
      toast({
        title: "Failed to update profile picture.",
        description: "Please try again.",
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
                    src={
                      userSelector.user.profile_picture_url ||
                      "/placeholder.svg"
                    }
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
                  value={userSelector.user.address?.detail}
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
