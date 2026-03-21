import z from "zod";
import { StaffRoleEnum } from "./user.schema";

export const registerSchema = z
  .object({
    email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง").max(255),

    fullName: z.string().min(2, "ชื่อต้องอย่างน้อย 2 ตัวอักษร").max(100),

    phone: z
      .string()
      .regex(/^[0-9]{9,10}$/, "เบอร์โทรต้องเป็นตัวเลข 9-10 หลัก"),

    staffRole: z
      .nativeEnum(StaffRoleEnum, {
        message: "กรุณาเลือกบทบาท",
      })
      .optional(),

    password: z
      .string()
      .min(6, "รหัสผ่านต้องอย่างน้อย 6 ตัวอักษร")
      .max(100),

    confirmPassword: z
      .string()
      .min(6, "รหัสผ่านต้องอย่างน้อย 6 ตัวอักษร")
      .max(100),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "รหัสผ่านกับยืนยันรหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  });

export type IRegister = z.infer<typeof registerSchema>;
