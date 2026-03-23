import { createApiResponseSchema } from "@/lib/api-handler";
import z from "zod";

export enum UserRoleEnum {
  REPORTER = "REPORTER",
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}

export enum StaffRoleEnum {
  VOLUNTEER = "VOLUNTEER",
  OFFICER = "OFFICER",
}

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  fullName: z.string(),
  phone: z.string(),

  role: z.nativeEnum(UserRoleEnum),
  staffRole: z.preprocess((val) => {
    if (val === "" || val === "null" || val === undefined) {
      return null;
    }
    return val;
  }, z.nativeEnum(StaffRoleEnum).nullable()),
  isBlocked: z.boolean(),

  createdAt: z.string(), // ISO string
});

export type IUser = z.infer<typeof userSchema>;

export const userRepsonseSchema = createApiResponseSchema(userSchema);
