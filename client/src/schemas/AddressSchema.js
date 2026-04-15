import { z } from "zod";

const DeliveryAddressSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters")
    .max(30, "Too long"),

  lastName: z
    .string()
    .trim()
    .max(30)
    .refine((val) => val === "" || val.length >= 3, {
      message: "Last name must be at least 3 characters",
    })
    .optional(),

  email: z.string().trim().toLowerCase().email("Invalid email address"),

  street: z
    .string()
    .trim()
    .refine((val) => val === "" || val.length >= 5, {
      message: "Street address too short",
    })
    .optional(),

  city: z.string().trim().min(3, "City is required"),

  state: z.string().trim().min(3, "State is required"),

  zipcode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Zip code must be 6 digits"),

  country: z.string().trim().min(3, "Country is required"),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
});

export { DeliveryAddressSchema };
