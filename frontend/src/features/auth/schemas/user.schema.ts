import { createApiResponseSchema } from "@/lib/api-handler";
import z from "zod";

export enum UserRoleEnum {
  REPORTER = "REPORTER",
  STAFF = "STAFF",
  // ADMIN = "ADMIN",
}

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  fullName: z.string(),
  phone: z.string(),

  role: z.nativeEnum(UserRoleEnum),
  isBlocked: z.boolean(),

  createdAt: z.string(), // ISO string
});

export type IUser = z.infer<typeof userSchema>;

export const userRepsonseSchema = createApiResponseSchema(userSchema);
