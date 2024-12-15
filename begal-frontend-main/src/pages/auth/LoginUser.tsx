import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Illustration from "@/assets/loginImg.jpg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginData } from "@/schemas/userSchema";
import { login, userProfile } from "@/api/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import Logo from "@/assets/logo.png";

export default function LoginUser() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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
      const response = await login(email, password);

      const token = response?.token;
      if (token) {
        const profile = await userProfile(token);
        sessionStorage.setItem("authToken", token);

        const userData = {
          token: token,
          user: {
            id: profile.data.id,
            email: profile.data.email,
            name: profile.data.name,
            phone: profile.data.phone,
            role: profile.data.role,
            profile_picture_url: profile.data.profile_picture_url,
            address: profile.data.address,
            created_at: profile.data.created_at,
            updated_at: profile.data.updated_at,
          },
        };

        sessionStorage.setItem("user_session", JSON.stringify(userData));

        dispatch({
          type: "SET_USER",
          payload: userData,
        });

        navigate("/");
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
    <div className="flex flex-col md:flex-row h-screen dark:text-white">
      <div className="hidden sm:flex sm:w-1/2 p-5 md:p-10">
        <img
          src={Illustration}
          className="object-cover w-full h-full rounded-xl"
          alt="Login illustration"
        />
      </div>

      <div className="flex flex-col w-full sm:w-1/2 items-center justify-center p-5 sm:p-10 space-y-6">
        <div className="flex items-center justify-center w-full max-w-sm">
          <img
            src={Logo}
            alt="logo"
            className="object-cover h-12 w-auto rounded-xl"
          />
        </div>
        <div className="px-10 py-8 sm:px-16 sm:py-12 rounded-lg flex flex-col space-y-6 border-2 border-blue-600 bg-white dark:bg-gray-900">
          <h2 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">
            Login User
          </h2>
          <form
            className="space-y-4 text-sm text-black dark:text-white"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                aria-invalid={!!errors.email}
                className="w-full"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <Input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                aria-invalid={!!errors.password}
                className="w-full"
                placeholder="Enter your password"
              />
              <div className="flex items-center mt-2 space-x-2">
                <Checkbox
                  id="show-password"
                  onCheckedChange={(checked) => setShowPassword(!!checked)}
                />
                <Label htmlFor="show-password">Show password</Label>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Link to="/forgot-password" className="text-blue-600 mt-2">
              Forgot password?
            </Link>

            {error && <p className="text-red-500">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="w-full flex space-y-2 flex-col justify-between text-blue-600">
              <Link to="/register-user" className="underline">
                Register Instead?
              </Link>
              <Link to="/login-seller" className="">
                Login as seller
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
