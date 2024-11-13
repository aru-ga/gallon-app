import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Illustration from "@/assets/img-sign.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginData } from "@/schemas/userSchema";
import { login } from "@/api/auth";

export default function LoginSeller() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginData) => {
    setError(null);
    const { email, password } = data;

    try {
      console.log("Attempting login with:", { email, password });
      const response = await login(email, password);

      const token = response.token;
      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/");
      } else {
        setError("Login failed. Token not received from server.");
      }
    } catch (error: any) {
      console.error("Login failed", error);
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
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
                id="email"
                type="email"
                {...register("email")}
                className="w-full text-black"
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
                id="password"
                type="password"
                {...register("password")}
                className="w-full text-black"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-white text-blue-600 hover:bg-blue-100"
            >
              Login
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
