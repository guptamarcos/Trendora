import { z } from "zod";

const SignupSchema = z.object({
  username: z.string()
    .trim()
    .min(1, "Username is required")   
    .min(3, "Name must be at least 3 characters")
    .max(10, "Name must not exceed 10 characters"),

  email: z.string()
    .trim()
    .min(1, "Email is required")     
    .email("Invalid email address"),

  password: z.string()
    .trim()
    .min(1, "Password is required")  
    .min(5, "Password must be at least 5 characters"),
});

export { SignupSchema };