import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});


export const userRegisterSchemas = [
  z.object({ name: z.string().min(1, "Name is required") }),
  z.object({ email: z.string().email("Invalid email format") }),
  z.object({
    address: z.object({
      detail: z.string().min(1, "Detail is required"),
      district: z.string().min(1, "District is required"),
      province: z.string().min(1, "Province is required"),
      regency: z.string().min(1, "Regency is required"),
      street: z.string().min(1, "Street is required"),
      village: z.string().min(1, "Village is required"),
    }),
  }),
  z
    .object({
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z
        .string()
        .min(6, "Password confirmation must match the password"),
    })
    .superRefine((data, ctx) => {
      if (data.confirmPassword !== data.password) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords don't match",
          path: ["confirmPassword"],
        });
      }
    }),
];




export type RegisterData = z.infer<typeof userRegisterSchemas[number]>;
export type LoginData = z.infer<typeof loginSchema>;
