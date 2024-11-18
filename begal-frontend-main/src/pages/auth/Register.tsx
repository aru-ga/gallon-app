import Illustration from "@/assets/img-sign.png";
import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { UserProfile } from "@/types/userTypes";
import { userRegisterSchemas } from "@/schemas/userSchema";
import { ComboxAddress } from "@/components/ComboxAddress";
import React from "react";
import { Location } from "@/types/locationTypes";
import { register } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

type ErrorData = {
  [key in keyof UserProfile]?: string;
};

const Register = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: {
      detail: "",
      district: "",
      province: "",
      regency: "",
      street: "",
      village: "",
    },
    role: "user",
    phone: "",
    profile_picture_url: "",
  });

  const [errors, setErrors] = useState<ErrorData>({});
  const [selectedAddress, setSelectedAddress] = React.useState<{
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

  const nextStep = () => {
    const result = userRegisterSchemas[step].safeParse(formData);
    if (result.success) {
      setErrors({});
      setStep((prev) => prev + 1);
    } else {
      setErrors(result.error.flatten().fieldErrors as ErrorData);
    }
  };

  const prevStep = () => setStep((prev) => (prev > 0 ? prev - 1 : prev));

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") nextStep();
  };

  const handleChange =
    (field: keyof UserProfile | `address.${keyof UserProfile["address"]}`) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      if (field.startsWith("address.")) {
        const addressField = field.split(
          "."
        )[1] as keyof UserProfile["address"];
        setFormData((prevData) => ({
          ...prevData,
          address: {
            ...prevData.address,
            [addressField]: event.target.value,
          },
        }));
      } else {
        setFormData({ ...formData, [field]: event.target.value });
      }
    };

  const handleSubmit = () => {
    const result = userRegisterSchemas[step].safeParse(formData);

    if (result.success && formData.password === formData.confirmPassword) {
      setErrors({});
      console.log("in");
      console.log("form data", formData);
    } else {
      console.log("Validation errors:", result.error?.flatten().fieldErrors);
      if (formData.password !== formData.confirmPassword) {
        console.log("Password error: Passwords do not match");
      }

      setErrors(
        (prevErrors) =>
          ({
            ...prevErrors,
            ...result.error?.flatten().fieldErrors,
            confirmPassword:
              formData.password !== formData.confirmPassword
                ? "Passwords do not match"
                : prevErrors.confirmPassword,
          } as ErrorData)
      );
    }

    try {
      register(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen dark:bg-gray-900 dark:text-white">
      <div className="w-1/2 flex items-center ">
        <img
          src={Illustration}
          alt="Illustration"
          className="h-full object-contain"
        />
      </div>

      <div className="w-1/2 flex flex-col  justify-center pr-28">
        <h1 className="text-3xl font-bold mb-8">Lengkapi data diri Anda</h1>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${step * 100}%)` }}
          >
            {/* Step 1 */}
            <div className="w-full flex-shrink-0 flex p-5 flex-col items-start">
              <Label htmlFor="name" className="mb-3">
                Name
              </Label>
              {errors.name && <p className="text-red-500">{errors.name}</p>}
              <Input
                id="name"
                type="text"
                placeholder="Masukkan Nama"
                value={formData.name}
                onChange={handleChange("name")}
                onKeyDown={handleKeyDown}
                className="w-1/2 p-2 border rounded mb-4"
              />
              <Button
                className="bg-blue-600 rounded-full h-10 w-10 p-0 hover:bg-blue-700 text-white"
                onClick={nextStep}
              >
                <ChevronRightIcon />
              </Button>
            </div>

            {/* Step 2 */}
            <div className="w-full flex-shrink-0 flex p-5 flex-col items-start">
              <Label htmlFor="email" className="mb-3">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan Email"
                value={formData.email}
                onChange={handleChange("email")}
                onKeyDown={handleKeyDown}
                className="w-1/2 p-2 border rounded mb-4"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
              <div className="flex flex-row gap-2">
                <Button
                  className="bg-blue-600 rounded-full h-10 w-10 p-0 hover:bg-blue-700 text-white"
                  onClick={prevStep}
                >
                  <ChevronLeftIcon />
                </Button>
                <Button
                  className="bg-blue-600 rounded-full h-10 w-10 p-0 hover:bg-blue-700 text-white"
                  onClick={nextStep}
                >
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="w-full flex-shrink-0 flex p-5 flex-col items-start">
              <Label htmlFor="email" className="mb-3">
                Phone
              </Label>
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              <Input
                type="phone"
                placeholder="Phone no"
                value={formData.phone}
                onChange={handleChange("phone")}
                onKeyDown={handleKeyDown}
                className="w-1/2 p-2 border rounded mb-4"
              />
              <div className="address-form">
                <h2>Select Address</h2>
                <ComboxAddress onChange={handleAddressChange} />
                <div className="hidden">
                  {selectedAddress.province?.name}
                  {selectedAddress.regency?.name}
                  {selectedAddress.district?.name}
                  {selectedAddress.village?.name}
                </div>
                <Label htmlFor="detail" className="mb-3">
                  Detail
                </Label>
                <Input
                  id="detail"
                  type="text"
                  placeholder="Masukkan Detail"
                  value={formData.address.detail}
                  onChange={handleChange("address.detail")}
                  onKeyDown={handleKeyDown}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <Label htmlFor="email" className="mb-3">
                  Street
                </Label>
                <Input
                  id="street"
                  type="text"
                  placeholder="Masukkan Street"
                  value={formData.address.street}
                  onChange={handleChange("address.street")}
                  onKeyDown={handleKeyDown}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
              </div>
              <div>
                <Button
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 rounded mr-2"
                >
                  <ChevronLeftIcon />
                </Button>
                <Button
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  <ChevronRightIcon />
                </Button>
              </div>
            </div>

            {/* Step 4 */}
            <div className="w-full flex-shrink-0 flex p-5 flex-col items-start">
              <Input
                type="password"
                placeholder="Masukkan Password"
                value={formData.password}
                onChange={handleChange("password")}
                onKeyDown={handleKeyDown}
                className="w-1/2 p-2 border rounded mb-4"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange("confirmPassword")}
                onKeyDown={handleKeyDown}
                className="w-1/2 p-2 border rounded mb-4"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}

              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
              <div className="flex">
                <Button
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 rounded mr-2"
                >
                  <ChevronLeftIcon />
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
