import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

const ProfileInfoSchema = z.object({
  username: z.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters"),

  bio: z.string()
    .trim()
    .max(200, "Bio must not exceed 200 characters"),
});

const ProfileSecuritySchema = z.object({
  oldPassword: z.string()
    .min(5, "Password must be at least 5 characters")
    .regex(passwordRegex, {
      message:
        "Password must be at least 5 characters and include uppercase, lowercase, number, and special character",
    }),

  newPassword: z.string()
    .min(5, "Password must be at least 5 characters")
    .regex(passwordRegex, {
      message:
        "Password must be at least 5 characters and include uppercase, lowercase, number, and special character",
    }),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different form old password",
    path: ["newPassword"],
});


export { ProfileInfoSchema, ProfileSecuritySchema };
