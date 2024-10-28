import Illustration from "@/assets/img-sign.png";
import { useState, KeyboardEvent, ChangeEvent } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";

const stepSchemas = [
  z.object({ name: z.string().min(1, "Name is required") }),
  z.object({ email: z.string().email("Invalid email format") }),
  z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
];

type FormData = {
  name: string;
  email: string;
  password: string;
};

type ErrorData = {
  [key in keyof FormData]?: string;
};

const Register = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorData>({});

  const nextStep = () => {
    const result = stepSchemas[step].safeParse(formData);
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
    (field: keyof FormData) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
    };

  const handleSubmit = () => {
    const result = stepSchemas[step].safeParse(formData);
    if (result.success) {
      alert(formData.name);
    } else {
      setErrors(result.error.flatten().fieldErrors as ErrorData);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side with Image */}
      <div className="w-1/2 flex items-center ">
        <img src={Illustration} alt="Illustration" className="h-full object-contain" />
      </div>

      {/* Right side with Form and Slider */}
      <div className="w-1/2 flex flex-col  justify-center pr-28">
        <h1 className="text-3xl font-bold mb-8">Lengkapi data diri Anda</h1>

        {/* Outer container to prevent overflow */}
        <div className="relative w-full overflow-hidden">
          {/* Sliding Form Container */}
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
              <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">
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
              <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded mr-2">
                Back
              </button>
              <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">
                Next
              </button>
            </div>

            {/* Step 3 */}
            <div className="w-full flex-shrink-0 flex p-5 flex-col items-center">
              <Input
                type="password"
                placeholder="Masukkan Password"
                value={formData.password}
                onChange={handleChange("password")}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
              <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded mr-2">
                Back
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
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
