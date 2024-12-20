import Illustration from "@/assets/img-sign.png";
import { useState, KeyboardEvent, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { UserProfile } from "@/types/userTypes";
import { userRegisterSchemas } from "@/schemas/userSchema";
import { ComboxAddress } from "@/components/ComboxAddress";
import { Location } from "@/types/locationTypes";
import { register } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

type ErrorData = {
  [key in keyof UserProfile]?: string;
};

const RegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<UserProfile>({
    id: "",
    created_at: "",
    updated_at: "",
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
  const { toast } = useToast();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ErrorData>({});
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

  console.log(selectedAddress);

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
      setErrors(result.error.flatten().fieldErrors as unknown as ErrorData);
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

  const handleSubmit = async () => {
    setLoading(true);

    const result = userRegisterSchemas[step].safeParse(formData);

    // Validate schema and passwords
    if (result.success && formData.password === formData.confirmPassword) {
      setErrors({});
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

    setErrors({});

    try {
      const res = await register(formData);

      if (res.success) {
        console.log("Register success");
        toast({
          title: "Thank you for registering!",
          description: "You have successfully registered.",
          duration: 3000,
        });

        setTimeout(() => {
          navigate("/login-user");
        }, 3000);
      } else {
        console.error("Register failed", res.error);
        toast({
          title: "Error",
          description: res.errors || "Failed to register.",
        });
      }
    } catch (error) {
      console.error("Unexpected error during registration", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col lg:flex-row h-screen dark:bg-gray-900 dark:text-white">
      {/* Left Section */}
      <div className="lg:w-3/4 w-full flex items-center justify-center lg:justify-start  dark:bg-gray-800">
        <img
          src={Illustration}
          alt="Illustration"
          className="h-full w-auto object-contain p-4 lg:p-0"
        />
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center px-8 lg:px-28">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6 lg:mb-8 text-center lg:text-left">
          Lengkapi data diri Anda
        </h1>
        <Link to="/register-seller" className="text-blue-600 underline">
          Register sebagai seller
        </Link>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${step * 100}%)` }}
          >
            {/* Step 1 */}
            <div className="w-full flex-shrink-0 flex p-4 flex-col items-start">
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
                className="w-full lg:w-1/2 p-2 border rounded mb-4"
              />
              <Button
                className="bg-blue-600 rounded-full h-10 w-10 p-0 hover:bg-blue-700 text-white"
                onClick={nextStep}
              >
                <ChevronRightIcon />
              </Button>
            </div>

            {/* Step 2 */}
            <div className="w-full flex-shrink-0 flex p-4 flex-col items-start">
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
                className="w-full lg:w-1/2 p-2 border rounded mb-4"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
              <div className="flex flex-row gap-2">
                <Button
                  className="bg-gray-400 rounded-full h-10 w-10 p-0 hover:bg-gray-500 text-white"
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
            <div className="w-full flex-shrink-0 flex p-4 flex-col items-start">
              <div>
                <Label htmlFor="phone" className="mb-3">
                  Phone
                </Label>
                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                <Input
                  type="phone"
                  placeholder="Phone no"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  onKeyDown={handleKeyDown}
                  className="w-full lg:w-1/2 p-2 border border-gray-300 rounded mb-4"
                />
              </div>
              <h2 className="text-lg mb-2">Select Address</h2>
              <ComboxAddress onChange={handleAddressChange} />
              <Label htmlFor="detail" className="mt-4">
                Detail
              </Label>
              <Input
                id="detail"
                type="text"
                placeholder="Masukkan Detail"
                value={formData.address.detail}
                onChange={handleChange("address.detail")}
                onKeyDown={handleKeyDown}
                className="w-full lg:w-1/2 p-2 border rounded mb-4"
              />
              <Label htmlFor="street" className="mt-4">
                Street
              </Label>
              <Input
                id="street"
                type="text"
                placeholder="Masukkan Street"
                value={formData.address.street}
                onChange={handleChange("address.street")}
                onKeyDown={handleKeyDown}
                className="w-full lg:w-1/2 p-2 border rounded mb-4"
              />
              {errors.address && (
                <p className="text-red-500">{errors.address}</p>
              )}
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
            <div className="w-full flex-shrink-0 flex p-4 flex-col items-start">
              <Input
                type="password"
                placeholder="Masukkan Password"
                value={formData.password}
                onChange={handleChange("password")}
                onKeyDown={handleKeyDown}
                className="w-full lg:w-1/2 p-2 border rounded mb-4"
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange("confirmPassword")}
                onKeyDown={handleKeyDown}
                className="w-full lg:w-1/2 p-2 border rounded mb-4"
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
                  {loading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterUser;
