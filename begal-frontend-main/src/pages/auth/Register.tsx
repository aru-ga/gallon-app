import { useState, KeyboardEvent, ChangeEvent } from "react";
import { z } from "zod";

// Define Zod schema and TypeScript types for each step's data
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

const RegisterForm = () => {
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
      setErrors({}); // Clear errors if validation is successful
      setStep((prev) => prev + 1);
    } else {
      setErrors(result.error.flatten().fieldErrors as ErrorData); // Set validation errors
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
      alert("Form Submitted Successfully!");
    } else {
      setErrors(result.error.flatten().fieldErrors as ErrorData);
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${step * 100}%)` }}
      >
        {/* Step 1 */}
        <div className="min-w-full flex flex-col items-center justify-center p-5">
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange("name")}
            onKeyDown={handleKeyDown}
            className="input"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          <button onClick={nextStep} className="btn mt-4">
            Next
          </button>
        </div>

        {/* Step 2 */}
        <div className="min-w-full flex flex-col items-center justify-center p-5">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange("email")}
            onKeyDown={handleKeyDown}
            className="input"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <button onClick={prevStep} className="btn mt-4">
            Back
          </button>
          <button onClick={nextStep} className="btn mt-4">
            Next
          </button>
        </div>

        {/* Step 3 */}
        <div className="min-w-full flex flex-col items-center justify-center p-5">
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange("password")}
            onKeyDown={handleKeyDown}
            className="input"
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <button onClick={prevStep} className="btn mt-4">
            Back
          </button>
          <button onClick={handleSubmit} className="btn mt-4">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
