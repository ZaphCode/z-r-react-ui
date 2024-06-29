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

export const newAddressSchema = z.object({
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  line1: z.string().min(1, "Line 1 is required"),
  line2: z.string().min(1, "Line 2 is required"),
  name: z.string().min(1, "Address name is required"),
  postal_code: z.string().regex(/^\d{5}(?:[-\s]\d{4})?$/, "Invalid postal code"),
  state: z.string().min(1, "State is required"),
});

export type NewAddressSchemaType = z.infer<typeof newAddressSchema>;


/*
{
  "city": "Los Angeles",
  "country": "USA",
  "line1": "Lolipop",
  "line2": "Wolfstreet",
  "name": "main card",
  "postal_code": "24156",
  "state": "California"
}
*/