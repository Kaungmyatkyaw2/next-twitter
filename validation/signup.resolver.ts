import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface SignupFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema: ZodType<SignupFormData> = z
  .object({
    username: z.string().min(5).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(8),
    confirmPassword: z.string().min(8).max(8),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });
export const signupResolver = zodResolver(schema);
