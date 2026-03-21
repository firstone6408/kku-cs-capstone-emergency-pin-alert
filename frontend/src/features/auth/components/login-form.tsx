"use client";

import { useForm } from "@/hooks/use-form";
import { loginAction } from "../actions/auth.action";
import { Form } from "@/lib/form";
import { CardContent, CardFooter } from "@/components/ui/card";
import { InputField } from "@/components/shared/field/input-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { UserRoleEnum } from "../schemas/user.schema";

export function LoginForm() {
  const { formAction, isPending, error, clearError } = useForm({
    action: loginAction,
    redirectTo: "/",
  });
  return (
    <Form action={formAction} onChange={clearError} className="space-y-3">
      <input
        type="hidden"
        name="login-type"
        defaultValue={UserRoleEnum.REPORTER}
      />
      <CardContent>
        <InputField
          label="อีเมล์"
          name="email"
          errorMessage={error.email}
          type="email"
          required
        />
        <InputField
          label="รหัสผ่าน"
          name="password"
          type="password"
          required
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <SubmitButton
          className="w-full cursor-pointer"
          isPending={isPending}
        >
          เข้าสู่ระบบ
        </SubmitButton>
      </CardFooter>
    </Form>
  );
}
