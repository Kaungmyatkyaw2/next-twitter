import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface SigninFormData {
  email: String;
  password: String;
}

const schema: ZodType<SigninFormData> = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(8),
});

export const signinResolver = zodResolver(schema);
