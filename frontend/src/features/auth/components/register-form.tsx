"use client";

import { useForm } from "@/hooks/use-form";
import { registerAction } from "../actions/auth.action";
import { Form } from "@/lib/form";
import { InputField } from "@/components/shared/field/input-field";
import { CardContent, CardFooter } from "@/components/ui/card";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Star } from "lucide-react";

export function RegisterForm() {
  const { formAction, isPending, error, clearError } = useForm({
    action: registerAction,
    redirectTo: "/",
  });

  return (
    <Form action={formAction} onChange={clearError} className="space-y-3">
      <CardContent className="space-y-4 pt-4">
        {/* Alert Banner */}
        <div className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/20 px-3 py-2.5">
          <Star className="size-4 text-primary shrink-0 fill-primary" />
          <span className="text-sm text-primary font-medium">
            สมัครสำหรับนิสิต/บุคลากร มข. เท่านั้น
          </span>
        </div>

        <InputField
          label="ชื่อ-นามสกุล"
          name="full-name"
          placeholder="กรอกชื่อ-นามสกุล"
          errorMessage={error.fullName}
          required
        />
        <InputField
          label="อีเมล"
          name="email"
          placeholder="example@kku.ac.th"
          errorMessage={error.email}
          type="email"
          required
        />
        <InputField
          label="เบอร์โทรศัพท์"
          name="phone"
          placeholder="0987654321"
          errorMessage={error.phone}
          required
        />
        <InputField
          label="รหัสผ่าน"
          name="password"
          placeholder="อย่างน้อย 8 ตัวอักษร"
          errorMessage={error.password}
          type="password"
          required
        />
        <InputField
          label="ยืนยันรหัสผ่าน"
          name="confirm-password"
          placeholder="กรอกรหัสผ่านอีกครั้ง"
          errorMessage={error.confirmPassword}
          type="password"
          required
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 border-t-0 bg-transparent px-4 pb-6">
        <SubmitButton
          size={"lg"}
          className="w-full cursor-pointer h-12 text-base font-semibold rounded-xl"
          isPending={isPending}
        >
          สมัครสมาชิก
        </SubmitButton>
      </CardFooter>
    </Form>
  );
}
