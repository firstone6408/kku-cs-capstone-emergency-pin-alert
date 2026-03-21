import { createApiResponseSchema } from "@/lib/api-handler";
import z from "zod";
import { userSchema } from "./user.schema";

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type ILogin = z.infer<typeof loginSchema>;

export const loginResponseSchema = createApiResponseSchema(
  userSchema.extend({
    token: z.string(),
  }),
);
