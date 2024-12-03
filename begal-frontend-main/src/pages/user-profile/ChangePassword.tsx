import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reqChangePassword } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setPasswordsMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);
  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/login");
  };
  const requestResetPassword = async () => {
    setLoading(true);

    try {
      const req = await reqChangePassword(oldPassword, newPassword);
      console.log(req);
      if (req.success === true) {
        toast({
          title: "Berhasil mengubah password!",
          description: "Silakan login kembali.",
        });
        goLogin();
      }
      console.log(req);
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Gagal mengubah password!",
        description: "Silakan coba lagi.",
      });
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
          <h1>Change Password</h1>
        </div>

        <div className="flex dark:bg-gray-900 text-black dark:text-white items-center justify-center h-screen relative overflow-hidden">
          <div className="w-full max-w-md p-6 mx-auto">
            <div className="space-y-6 border border-blue-500 rounded-2xl p-8">
              <div className="space-y-2">
                <Label htmlFor="old-password">Enter old password</Label>
                <div className="relative">
                  <Input
                    id="old-password"
                    type={showOldPassword ? "text" : "password"}
                    className="pr-10 border-blue-500"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
                      <EyeOff className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-blue-500" />
                    )}
                    <span className="sr-only">
                      {showOldPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Enter new password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    className="pr-10 border-blue-500"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-blue-500" />
                    )}
                    <span className="sr-only">
                      {showNewPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    className={`pr-10 border-blue-500 ${
                      !passwordsMatch ? "border-red-500" : ""
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-blue-500" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                {!passwordsMatch && (
                  <p className="text-sm text-red-500">Passwords do not match</p>
                )}
              </div>
              <div className="flex flex-col space-y-4">
                <Button
                  onClick={requestResetPassword}
                  type="submit"
                  className="w-32 ml-auto rounded-full bg-white dark:bg-blue-500 text-black dark:text-white border-2 border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={
                    !passwordsMatch ||
                    !oldPassword ||
                    !newPassword ||
                    !confirmPassword
                  }
                >
                  {loading ? "Loading..." : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
