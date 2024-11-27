import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Label } from "@radix-ui/react-label";
import { Camera } from "lucide-react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { updateProfile, updateProfilePicture } from "@/api/user";

export default function Profile() {
  const userSelector = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState({
    name: userSelector.user.name,
    phone: userSelector.user.phone,
    email: userSelector.user.email,
  });
  const [saveStatus, setSaveStatus] = useState("");

  // Sync editableUser with userSelector when it changes
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
    setSaveStatus(""); // Reset status when toggling edit mode
  };

  const handleSave = async () => {
    // Collect only the fields that need to be updated
    const userDataToSend = {
      name: editableUser.name,
      email: editableUser.email,
      phone: editableUser.phone,
    };

    console.log("Data to send:", userDataToSend); // Check what you're sending

    try {
      setSaveStatus("Saving...");
      const updatedProfile = await updateProfile(userDataToSend); // Send the partial data
      console.log("API Response:", updatedProfile);

      // Handle successful save
      setSaveStatus("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaveStatus("Failed to update profile. Please try again.");
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
                <Button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg">
                  <Camera size={16} />
                </Button>
              </div>
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

            <p className="text-sm mt-4">{saveStatus}</p>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
