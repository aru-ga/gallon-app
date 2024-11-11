import Illustration from "@/assets/img-sign.png";
import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { UserProfile } from "@/types/userTypes";
import { userRegisterSchemas } from "@/schemas/userSchema";
import { ComboxAddress } from "@/components/ComboxAddress";
import React from "react";
import { Location } from "@/types/locationTypes";

type ErrorData = {
  [key in keyof UserProfile]?: string;
};

const Register = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    email: "",
    password: "",
    address: {
      detail: "",
      district: "",
      province: "",
      regency: "",
      street: "",
      village: "",
    },
    role: "",
    phone: 0,
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
    (field: keyof UserProfile) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
    };

  const handleSubmit = () => {
    const result = userRegisterSchemas[step].safeParse(formData);
    if (result.success) {
      alert(formData.name);
    } else {
      setErrors(result.error.flatten().fieldErrors as ErrorData);
    }
  };

  return (
    <div className="flex h-screen">
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
            <div className="w-full flex-shrink-0 flex p-5 flex-col items-center">
              <Input
                type="text"
                placeholder="Masukkan Nama"
                value={formData.name}
                onChange={handleChange("name")}
                onKeyDown={handleKeyDown}
                className="w-1/2 p-2 border rounded mb-4"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>

            {/* Step 2 */}
            <div className="w-full flex-shrink-0 flex p-5 flex-col items-center">
              <Input
                type="email"
                placeholder="Masukkan Email"
                value={formData.email}
                onChange={handleChange("email")}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>

            {/* Step 3 */}
            <div className="w-full flex-shrink-0 flex p-5 flex-col items-center">
              <Input
                type="phone"
                placeholder="Masukkan Nomor Telepon"
                value={formData.phone}
                onChange={handleChange("phone")}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              {errors.phone && <p className="text-red-500">{errors.phone}</p>}
              <Input
                type="role"
                placeholder="Masukkan Role"
                value={formData.role}
                onChange={handleChange("role")}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              {errors.role && <p className="text-red-500">{errors.role}</p>}
              <div className="address-form">
                <h2>Select Address</h2>
                <ComboxAddress onChange={handleAddressChange} />
                <p>
                  Selected Address:
                  {selectedAddress.province?.name} /
                  {selectedAddress.regency?.name} /
                  {selectedAddress.district?.name} /
                  {selectedAddress.village?.name}
                </p>

                <Input
                  type="address"
                  placeholder="Masukkan Detail"
                  value={formData.address.detail}
                  onChange={handleChange("address.detail")}
                  onKeyDown={handleKeyDown}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
              </div>

              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>

            {/* Step 4 */}
            <div className="w-full flex-shrink-0 flex p-5 flex-col items-center">
              <Input
                type="password"
                placeholder="Masukkan Password"
                value={formData.password}
                onChange={handleChange("password")}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
              <button
                onClick={prevStep}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
