// HERE min(1,...) IS USED TO ADD REQUIRED FIELD IN ZOD VALIDATION

import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

const SignupSchema = z.object({
  username: z.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters"),

  email: z.string()
    .trim()   
    .toLowerCase()
    .min(1, "Email is required")
    .email("Invalid email address") ,

  password: z.string()
    .min(5, "Password must be at least 5 characters")
    .regex(passwordRegex, {
      message:
        "Password must be at least 5 characters and include uppercase, lowercase, number, and special character",
    }),
     
});

export { SignupSchema };