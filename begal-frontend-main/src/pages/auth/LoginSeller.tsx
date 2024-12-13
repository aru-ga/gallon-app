import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Illustration from "@/assets/loginImg.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginData } from "@/schemas/userSchema";
import { loginSeller } from "@/api/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { refetchSellerData } from "@/api/depot";

export default function LoginSeller() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginData) => {
    setLoading(true);
    setError(null);
    const { email, password } = data;

    try {
      console.log("Attempting login with:", { email, password });
      const response = await loginSeller(email, password);

      const token = response?.token;
      if (token) {
        await refetchSellerData(token);
        navigate("/seller/dashboard");
      } else {
        setError("Invalid server response. Token not found.");
      }
    } catch (error) {
      console.error("Login failed", error);
      if (error instanceof Error) {
        setError(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (error as any).response?.data?.message ||
            error.message ||
            "An unexpected error occurred. Please try again later."
        );
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen dark:text-white">
      <div className="hidden sm:flex sm:w-1/2 p-10">
        <img
          src={Illustration}
          className="object-cover w-full h-full rounded-xl"
          alt="Login illustration"
        />
      </div>
      <div className="w-full sm:w-1/2 mx-auto flex flex-col space-y-7 items-center  justify-center px-6 sm:px-20">
        <div className="px-20 py-10 rounded-lg flex flex-col space-y-10 border-2 border-blue-600 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
            Login Seller
          </h2>
          <form
            className="space-y-4 text-black text-sm"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div>
              <Label htmlFor="email" className="block mb-1 dark:text-white">
                Email
              </Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                aria-invalid={!!errors.email}
                className="w-full text-black dark:text-white"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="block mb-1 dark:text-white">
                Password
              </Label>
              <Input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                aria-invalid={!!errors.password}
                className="w-full text-black dark:text-white"
                placeholder="Enter your password"
              />
              <div className="flex items-center mt-2 mb-5 space-x-2">
                <Checkbox
                  id="show-password"
                  onCheckedChange={(checked) => setShowPassword(!!checked)}
                />
                <Label htmlFor="show-password" className="dark:text-white">
                  Show password
                </Label>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-blue-600 hover:bg-blue-100"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <div className="w-full flex flex-row space-x-10 justify-between">
              <Link to="/forgot-password" className="underline text-blue-600">
                Forgot password?
              </Link>
              <Link to="/register-seller" className="underline dark:text-white">
                Register Instead?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
