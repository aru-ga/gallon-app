import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRightIcon } from "lucide-react";
import AnimChecklist from "@/components/AnimChecklist";
import AnimForgotPassword from "@/components/AnimForgotPassword";
import AnimPlane from "@/components/AnimPlane";
import AnimSetNew from "@/components/AnimSetNew";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { useState } from "react";
import {
  reqForgotPassword,
  reqForgotPasswordVerify,
  reqForgotPasswordCreateNew,
} from "@/api/public";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [otpCode, setOtpCode] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const requestResetPassword = async () => {
    try {
      const response = await reqForgotPassword(email);
      console.log(response);
      if (response.success) {
        console.log("Code sent successfully");
        setStep((prevStep) => prevStep + 1);
      }
    } catch (error) {
      console.error("Error in requestResetPassword API call:", error);
    }
  };

  const verifyResetPassword = async () => {
    try {
      const response = await reqForgotPasswordVerify(email, otpCode);
      console.log(response);
      if (response.success) {
        console.log("Code verified successfully");
        setStep((prevStep) => prevStep + 1);
      }
    } catch (error) {
      console.error("Error in verifyResetPassword API call:", error);
    }
  };

  const createNewPassword = async () => {
    try {
      const response = await reqForgotPasswordCreateNew(email, confirmPassword);
      console.log(response);
      if (response.success) {
        console.log("Password reset successfully");
        setStep((prevStep) => prevStep + 1);
      }
    } catch (error) {
      console.error("Error in createNewPassword API call:", error);
    }
  };

  const navigate = useNavigate();

  const goLogin = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));
  return (
    <>
      <div className="flex dark:bg-gray-900 text-white items-center justify-center h-screen relative overflow-hidden">
        <div className="relative w-full max-w-md dark:bg-gray-800 bg-white rounded-lg  overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${step * 100}%)` }}
          >
            <div className="min-w-full h-max p-6  text-center flex items-center flex-col">
              <div className="w-1/2 mx-auto">
                <AnimForgotPassword />
              </div>
              <div>
                <h2 className="text-gray-500 font-extralight">
                  Insert your email to reset your password
                </h2>
              </div>
              <Input
                type="email"
                className="border p-2 w-full rounded-md text-black dark:text-white"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                onClick={requestResetPassword}
                className="bg-blue-800 mt-20 rounded-full px-16 text-white hover:bg-blue-700"
              >
                Send Code
              </Button>
            </div>

            <div className="min-w-full p-6 space-y-4 text-center ">
              <div className="w-1/2 mx-auto">
                <AnimPlane />
              </div>
              <h2 className="text-xl font-semibold">Enter your code</h2>
              <h2 className="text-gray-500 font-extralight">
                {`We sent a code to ${email}`}
              </h2>
              <div className="w-min mx-auto">
                <InputOTP maxLength={6} onChange={(e) => setOtpCode(e)}>
                  <InputOTPGroup className="flex">
                    <InputOTPSlot
                      className="text-black dark:text-white rounded-none dark:border-white border-black"
                      index={0}
                    />
                    <InputOTPSlot
                      className="text-black dark:text-white rounded-none dark:border-white border-black"
                      index={1}
                    />
                    <InputOTPSlot
                      className="text-black dark:text-white rounded-none dark:border-white border-black"
                      index={2}
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator className="text-blue-600" />
                  <InputOTPGroup className="flex">
                    <InputOTPSlot
                      className="text-black dark:text-white rounded-none dark:border-white border-black"
                      index={3}
                    />
                    <InputOTPSlot
                      className="text-black dark:text-white rounded-none dark:border-white border-black"
                      index={4}
                    />
                    <InputOTPSlot
                      className="text-black dark:text-white rounded-none dark:border-white border-black"
                      index={5}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex justify-between">
                <Button onClick={prevStep} variant="ghost">
                  <ChevronLeft />
                </Button>
                <Button
                  onClick={verifyResetPassword}
                  className="bg-blue-500 text-white"
                >
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>

            <div className="min-w-full p-6 space-y-4 text-center">
              <div className="w-1/2 mx-auto">
                <AnimSetNew />
              </div>
              <h2 className="text-xl font-semibold">Set new password</h2>
              <h2 className="text-gray-500 font-extralight">
                Must be al least 8 characters.
              </h2>
              <Input
                type="password"
                className="border p-2 w-full rounded-md text-black dark:text-white"
                placeholder="New password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
              <Input
                type="password"
                className="border p-2 w-full rounded-md text-black dark:text-white"
                placeholder="Confirm your new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <div className="flex justify-between">
                <Button
                  onClick={createNewPassword}
                  className="bg-blue-500 text-white"
                  disabled={newPassword !== confirmPassword}
                >
                  {newPassword !== confirmPassword
                    ? "Passwords do not match"
                    : "Set Password"}
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>
            <div className="min-w-full py-10 p-6 space-y-4 justify-between flex flex-col text-center">
              <div className="w-1/2 mx-auto">
                <AnimChecklist />
              </div>
              <div className="text-black dark:text-white">
                <h2 className="text-xl font-semibold ">Set new password</h2>
                <h2 className="text-gray-500 font-extralight">
                  Password has been reset successfully
                </h2>
              </div>
              <Button
                onClick={goLogin}
                className="bg-blue-500 dark:bg-blue-500 w-full"
              >
                Login Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
