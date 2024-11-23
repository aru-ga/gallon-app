import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Illustration from "@/assets/img-sign.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginData } from "@/schemas/userSchema";
import { login, userProfile } from "@/api/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";

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
      console.log("Attempting login with:", { email, password });
      const response = await login(email, password);

      const token = response?.token;
      if (token) {
        const profile = await userProfile(token);
        localStorage.setItem("authToken", token);

        dispatch({
          type: "SET_USER",
          payload: {
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
          },
        });

        navigate("/");
      } else {
        setError("Invalid server response. Token not found.");
      }
    } catch (error: any) {
      console.error("Login failed", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/2">
        <img
          src={Illustration}
          className="h-screen object-cover"
          alt="Login illustration"
        />
      </div>
      <div className="w-1/2 bg-blue-600 flex items-center justify-center">
        <div className="w-80 p-6 rounded-lg bg-blue-600 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Login user</h2>
          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
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
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
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
                <Label htmlFor="show-password">Show password</Label>
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
            <Button type="button" variant="link" className="text-white">
              <Link to="/forgot-password">Forgot password</Link>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
