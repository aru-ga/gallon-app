import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSeller } from "@/api/auth";
import { ComboxAddress } from "@/components/ComboxAddress";
import { Location } from "@/types/locationTypes";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import Illustration from "@/assets/loginImg.jpg";

const RegisterSeller = () => {
  const [formData, setFormData] = useState({
    owner_name: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "seller",
    address: {
      province: "",
      regency: "",
      district: "",
      village: "",
      street: "",
      detail: "",
    },
    operational_hours: {
      open: "",
      close: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddressChange = (addressData: {
    province: Location | null;
    regency: Location | null;
    district: Location | null;
    village: Location | null;
  }) => {
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        province: addressData.province?.name || "",
        regency: addressData.regency?.name || "",
        district: addressData.district?.name || "",
        village: addressData.village?.name || "",
      },
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const [mainKey, subKey] = field.split(".");
    if (subKey) {
      setFormData((prev) => ({
        ...prev,
        [mainKey]: {
          ...prev[mainKey],
          [subKey]: e.target.value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const sendData = await registerSeller(formData);
      if (sendData.success) {
        toast({
          title: "Thank you for registering!",
          description: "You have successfully registered.",
          duration: 3000,
        });
        setTimeout(() => {
          navigate("/login-seller");
        }, 3000);
      }
    } catch (error) {
      console.error("Error in register API call:", error);
      throw new Error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-screen dark:text-white">
      {/* Illustration */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={Illustration}
          className="h-full object-cover"
          alt="Register illustration"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-lg p-6 rounded-lg bg-white text-black shadow-md dark:bg-gray-800">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
            Register Seller
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="owner_name">Owner Name</Label>
              <Input
                id="owner_name"
                type="text"
                value={formData.owner_name}
                onChange={(e) => handleChange(e, "owner_name")}
                required
                className="text-black dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="name">Depot Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange(e, "name")}
                required
                className="text-black dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange(e, "email")}
                required
                className="text-black dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange(e, "password")}
                required
                className="text-black dark:text-white"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange(e, "phone")}
                required
                className="text-black dark:text-white"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium">Address</h3>
              <ComboxAddress onChange={handleAddressChange} />
              <div className="space-y-2">
                <Label htmlFor="address.street">Street</Label>
                <Input
                  id="address.street"
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => handleChange(e, "address.street")}
                  required
                  className="text-black dark:text-white"
                />
                <Label htmlFor="address.detail">Detail</Label>
                <Input
                  id="address.detail"
                  type="text"
                  value={formData.address.detail}
                  onChange={(e) => handleChange(e, "address.detail")}
                  required
                  className="text-black dark:text-white"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Operational Hours</h3>
              <Label htmlFor="operational_hours.open">Open Time</Label>
              <Input
                id="operational_hours.open"
                type="time"
                value={formData.operational_hours.open}
                onChange={(e) => handleChange(e, "operational_hours.open")}
                required
                className="text-black dark:text-white"
              />
              <Label htmlFor="operational_hours.close">Close Time</Label>
              <Input
                id="operational_hours.close"
                type="time"
                value={formData.operational_hours.close}
                onChange={(e) => handleChange(e, "operational_hours.close")}
                required
                className="text-black dark:text-white"
              />
            </div>
            <div>
              <Button
                disabled={loading}
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {loading ? "Loading..." : "Register"}
              </Button>
              <Link className="underline text-blue-600" to="/login-seller">
                Login instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSeller;
