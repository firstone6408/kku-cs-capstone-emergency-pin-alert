import z from "zod";
import { userSchema } from "./user.schema";

export const updateUserProfileSchema = userSchema
  .omit({
    role: true,
    isBlocked: true,
    createdAt: true,
  })
  .extend({
    password: z
      .string()
      .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร")
      .max(100, "รหัสผ่านยาวเกินไป")
      .nullable(),
  });

export type IUpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
