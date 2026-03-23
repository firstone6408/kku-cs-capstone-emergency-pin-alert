import { StaffRoleEnum } from "@/features/auth/schemas/user.schema";
import { z } from "zod";

export const upsertStaffSchema = z.object({
  id: z.number().optional(),
  email: z
    .string()
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .min(1, "กรุณากรอกอีเมล"),

  fullName: z
    .string()
    .min(1, "กรุณากรอกชื่อ-นามสกุล")
    .max(255, "ชื่อ-นามสกุลยาวเกินไป"),

  phone: z
    .string()
    .regex(/^[0-9]{9,10}$/, "เบอร์โทรต้องเป็นตัวเลข 9-10 หลัก"),

  staffRole: z.nativeEnum(StaffRoleEnum, {
    message: "กรุณาเลือกบทบาท",
  }),

  password: z
    .string()
    .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร")
    .max(100, "รหัสผ่านยาวเกินไป")
    .nullable(),
});

export type IUpsertStaff = z.TypeOf<typeof upsertStaffSchema>;
