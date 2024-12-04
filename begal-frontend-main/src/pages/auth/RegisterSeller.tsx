import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSeller } from "@/api/auth";
import { ComboxAddress } from "@/components/ComboxAddress";
import { Location } from "@/types/locationTypes";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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
  const [selectedAddress, setSelectedAddress] = useState<{
    province: Location | null;
    regency: Location | null;
    district: Location | null;
    village: Location | null;
  }>({
    province: null,
    regency: null,
    district: null,
    village: null,
  });
  const [loading, setLoading] = useState(false);
  const handleAddressChange = (addressData: {
    province: Location | null;
    regency: Location | null;
    district: Location | null;
    village: Location | null;
  }) => {
    setSelectedAddress(addressData);
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

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const [mainKey, subKey] = field.split(".");
    if (subKey) {
      setFormData((prev: any) => ({
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
      if (sendData.success === true) {
        toast({
          title: "Thank you for registering!",
          description: "You have successfully registered.",
          duration: 3000,
        });

        setTimeout(() => {
          navigate("/login");
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
    <main className="flex justify-center items-center min-h-screen dark:bg-gray-900 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-950 dark:text-white shadow-lg rounded-lg">
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
            <h3 className="text-lg font-medium">Address</h3>
            <ComboxAddress onChange={handleAddressChange} />
            <div className="hidden">
              {selectedAddress.province?.name}
              {selectedAddress.regency?.name}
              {selectedAddress.district?.name}
              {selectedAddress.village?.name}
            </div>
            <div className="space-y-2">
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

          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="w-full mt-6"
          >
            {loading ? "Loading..." : "Register"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default RegisterSeller;
