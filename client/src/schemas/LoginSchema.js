import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

const LoginSchema = z.object({
  email: z.string()
    .trim()
    .min(1, "Email is required")     
    .email("Invalid email address"),

  password: z.string()
    .min(5, "Password must be at least 5 characters")
    .regex(passwordRegex, {
      message:
        "Password must be at least 5 characters and include uppercase, lowercase, number, and special character",
    }),
});

export { LoginSchema };