import { z } from "zod";

export const authFormSchema = z.object({
  username: z.string().min(4, "Username is required").max(100).optional(),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

export type AuthFormSchemaType = z.infer<typeof authFormSchema>;
