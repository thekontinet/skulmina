import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  role: z.enum(["teacher", "student"]),
  email: z
    .string()
    .email({ message: "Invalid email provided" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const loginSchema = userSchema.pick({ email: true, password: true });

export type TUser = z.infer<typeof userSchema>;
