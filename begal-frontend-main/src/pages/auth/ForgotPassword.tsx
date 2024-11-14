import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AnimForgotPassword from "@/components/AnimForgotPassword";
import AnimSetNew from "@/components/AnimSetNew";
import AnimPlane from "@/components/AnimPlane";
import AnimChecklist from "@/components/AnimChecklist";
import { ChevronRightIcon } from "lucide-react";
import { LoaderIcon } from "lucide-react";

export default function ForgotPassword() {
  const [step, setStep] = useState(0);
  const [submitOtp, setSubmitOtp] = useState(false);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => Math.max(prevStep - 1, 0));

  return (
    <div className="flex items-center justify-center h-screen relative overflow-hidden">
      <Link to="/login" className="absolute top-4 left-4 text-gray-500">
        <ChevronLeft />
      </Link>

      <div className="relative w-full max-w-md bg-white rounded-lg  overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${step * 100}%)` }}
        >
          <div className="min-w-full h-max p-6 gap-4 text-center flex items-center flex-col">
            <div className="w-1/2 mx-auto">
              <AnimForgotPassword />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Forgot password?</h2>
              <h2 className="text-gray-500 font-extralight">
                enter your email address for instructions.
              </h2>
            </div>
            <Input
              type="email"
              className="border-2 p-3 border-blue-600 w-full rounded-md ring-transparent"
              placeholder="Your email"
            />
            <Button
              onClick={nextStep}
              className="bg-blue-800 mt-20 rounded-full px-16 py-3 text-white hover:bg-blue-700"
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
              We sent a code to alexander@gmail.com
            </h2>
            <div className="w-min mx-auto">
              <InputOTP maxLength={6}>
                <InputOTPGroup className="flex">
                  <InputOTPSlot
                    className="rounded-none border-black"
                    index={0}
                  />
                  <InputOTPSlot
                    className="rounded-none border-black"
                    index={1}
                  />
                  <InputOTPSlot
                    className="rounded-none border-black"
                    index={2}
                  />
                </InputOTPGroup>
                <InputOTPSeparator className="text-blue-600" />
                <InputOTPGroup className="flex">
                  <InputOTPSlot
                    className="rounded-none border-black"
                    index={3}
                  />
                  <InputOTPSlot
                    className="rounded-none border-black"
                    index={4}
                  />
                  <InputOTPSlot
                    className="rounded-none border-black"
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
                onClick={() => setSubmitOtp(true)}
                className="bg-blue-500 text-white"
              >
                {submitOtp ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  <ChevronRightIcon />
                )}
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
          <div className="min-w-full p-6 space-y-4 text-center">
            <div className="w-1/2 mx-auto">
              <AnimChecklist />
            </div>
            <h2 className="text-xl font-semibold">Set new password</h2>
            <h2 className="text-gray-500 font-extralight">
              Password has been reset successfully
            </h2>
            <Button className="bg-blue-500 text-white">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
