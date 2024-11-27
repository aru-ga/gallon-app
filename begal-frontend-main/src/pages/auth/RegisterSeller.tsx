import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSeller } from "@/api/auth";

const RegisterSeller = () => {
  const [formData, setFormData] = useState({
    owner_name: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "seller", // Default role is 'seller'
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
      const sendData = await registerSeller(formData);
      console.log("Register SEND=========:", sendData);
    } catch (error) {
      console.error("Error in register API call:", error);
      throw new Error("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="owner_name">Owner Name</Label>
            <Input
              id="owner_name"
              type="text"
              value={formData.owner_name}
              onChange={(e) => handleChange(e, "owner_name")}
              required
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
            />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              type="text"
              value={formData.role}
              disabled
              readOnly
              className="bg-gray-200"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium">Address</h3>
            <div className="space-y-2">
              <div>
                <Label htmlFor="address.province">Province</Label>
                <Input
                  id="address.province"
                  type="text"
                  value={formData.address.province}
                  onChange={(e) => handleChange(e, "address.province")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address.regency">Regency</Label>
                <Input
                  id="address.regency"
                  type="text"
                  value={formData.address.regency}
                  onChange={(e) => handleChange(e, "address.regency")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address.district">District</Label>
                <Input
                  id="address.district"
                  type="text"
                  value={formData.address.district}
                  onChange={(e) => handleChange(e, "address.district")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address.village">Village</Label>
                <Input
                  id="address.village"
                  type="text"
                  value={formData.address.village}
                  onChange={(e) => handleChange(e, "address.village")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address.street">Street</Label>
                <Input
                  id="address.street"
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => handleChange(e, "address.street")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address.detail">Detail</Label>
                <Input
                  id="address.detail"
                  type="text"
                  value={formData.address.detail}
                  onChange={(e) => handleChange(e, "address.detail")}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Operational Hours</h3>
            <div className="space-y-2">
              <div>
                <Label htmlFor="operational_hours.open">Open Time</Label>
                <Input
                  id="operational_hours.open"
                  type="time"
                  value={formData.operational_hours.open}
                  onChange={(e) => handleChange(e, "operational_hours.open")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="operational_hours.close">Close Time</Label>
                <Input
                  id="operational_hours.close"
                  type="time"
                  value={formData.operational_hours.close}
                  onChange={(e) => handleChange(e, "operational_hours.close")}
                  required
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full mt-6">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSeller;
