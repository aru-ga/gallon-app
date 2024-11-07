import { useState } from "react";
import Illustration from "@/assets/img-sign.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LoginUser() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

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
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-black"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-black"
                placeholder="Enter your password"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-white text-blue-600 hover:bg-blue-100"
            >
              Login
            </Button>
            <Button type="submit" variant="link" className="text-white">
              <Link to="/forgot-password">Forgot password</Link>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
