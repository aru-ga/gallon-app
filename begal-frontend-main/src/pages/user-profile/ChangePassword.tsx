import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRightIcon, Link } from "lucide-react";
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
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ChangePassword() {
  const [step, setStep] = useState(0);

  const userSelector = useSelector((state) => state.user);
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));
  return (
    <>
      <SidebarInset className="dark:bg-gray-900 dark:text-white">
        <div className="flex flex-row items-center space-x-2 p-3">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <h1>Change Password</h1>
        </div>

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
                    this email will be use to send code:{" "}
                    {userSelector.user.email}
                  </h2>
                </div>
                <Button
                  onClick={nextStep}
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
                  {`We sent a code to ${userSelector.user.email}`}
                </h2>
                <div className="w-min mx-auto">
                  <InputOTP maxLength={6}>
                    <InputOTPGroup className="flex">
                      <InputOTPSlot
                        className="rounded-none dark:border-white border-black"
                        index={0}
                      />
                      <InputOTPSlot
                        className="rounded-none dark:border-white border-black"
                        index={1}
                      />
                      <InputOTPSlot
                        className="rounded-none dark:border-white border-black"
                        index={2}
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator className="text-blue-600" />
                    <InputOTPGroup className="flex">
                      <InputOTPSlot
                        className="rounded-none dark:border-white border-black"
                        index={3}
                      />
                      <InputOTPSlot
                        className="rounded-none dark:border-white border-black"
                        index={4}
                      />
                      <InputOTPSlot
                        className="rounded-none dark:border-white border-black"
                        index={5}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="flex justify-between">
                  <Button onClick={prevStep} variant="ghost">
                    <ChevronLeft />
                  </Button>
                  <Button onClick={nextStep} className="bg-blue-500 text-white">
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
                  className="border p-2 w-full rounded-md"
                  placeholder="New password"
                />
                <Input
                  type="password"
                  className="border p-2 w-full rounded-md"
                  placeholder="Confirm your new password"
                />
                <div className="flex justify-between">
                  <Button onClick={prevStep} variant="ghost">
                    <ChevronLeft />
                  </Button>
                  <Button onClick={nextStep} className="bg-blue-500 text-white">
                    <ChevronRightIcon />
                  </Button>
                </div>
              </div>
              <div className="min-w-full py-10 p-6 space-y-4 justify-between flex flex-col text-center">
                <div className="w-1/2 mx-auto">
                  <AnimChecklist />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Set new password</h2>
                  <h2 className="text-gray-500 font-extralight">
                    Password has been reset successfully
                  </h2>
                </div>
                <Link to="/login">
                  <Button className="bg-blue-500 w-full text-white">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
