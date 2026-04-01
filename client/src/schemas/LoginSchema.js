import { z } from "zod";

const LoginSchema = z.object({
  email: z.string()
    .trim()
    .min(1, "Email is required")     
    .email("Invalid email address"),

  password: z.string()
    .trim()
    .min(1, "Password is required")  
    .min(5, "Password must be at least 5 characters"),
});

export { LoginSchema };