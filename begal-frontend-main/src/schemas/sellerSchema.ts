import * as z from "zod";

const addressSchema = z.object({
  province: z.string().min(1, "Province is required"),
  regency: z.string().min(1, "Regency is required"),
  district: z.string().min(1, "District is required"),
  village: z.string().min(1, "Village is required"),
  street: z.string().min(1, "Street is required"),
  detail: z.string().optional(),
});

const operationalHoursSchema = z.object({
  open: z.string().min(1, "Opening time is required"),
  close: z.string().min(1, "Closing time is required"),
});

export const sellerRegisterSchemas = [
  z.object({
    owner_name: z.string().min(1, "Owner name is required"),
    name: z.string().min(1, "Business name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    role: z.literal("seller"),
  }),
  z.object({
    address: addressSchema,
  }),
  z.object({
    operational_hours: operationalHoursSchema,
  }),
];