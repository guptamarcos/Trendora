import { z } from "zod";

const DeliveryAddressSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name too long"),

  lastName: z.string()
    .trim()
    .max(30, "Last name too long")
    .optional(),

  email: z.string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),

  street: z.string()
    .trim()
    .min(5, "Street address too short")
    .optional(),

  city: z.string()
    .trim()
    .min(2, "City is required"),

  state: z.string()
    .trim()
    .min(2, "State is required"),

  zipcode: z.string()
    .trim()
    .regex(/^\d{6}$/, "Zip code must be exactly 6 digits"), 

  country: z.string()
    .trim()
    .min(2, "Country is required"),

  phone: z.string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"), 
});

export { DeliveryAddressSchema };