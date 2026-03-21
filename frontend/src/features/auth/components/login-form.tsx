"use client";

import { useForm } from "@/hooks/use-form";
import { loginAction } from "../actions/auth.action";
import { Form } from "@/lib/form";
import { CardContent, CardFooter } from "@/components/ui/card";
import { InputField } from "@/components/shared/field/input-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { UserRoleEnum } from "../schemas/user.schema";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserRoleTab } from "./user-role-tab";

export function LoginForm() {
  const [loginTab, setLoginTab] = useState<UserRoleEnum>(
    UserRoleEnum.REPORTER,
  );
  const { formAction, isPending, error, clearError } = useForm({
    action: loginAction,
    redirectTo: "/",
  });
  return (
    <Form action={formAction} onChange={clearError} className="space-y-3">
      <UserRoleTab tab={loginTab} setTab={setLoginTab} />
      <input type="hidden" name="login-type" defaultValue={loginTab} />
      <CardContent className="space-y-3">
        <InputField
          label="อีเมล์"
          name="email"
          placeholder="example@kkumail.com"
          errorMessage={error.email}
          type="email"
          required
        />
        <InputField
          label="รหัสผ่าน"
          name="password"
          placeholder="กรอกรหัสผ่าน"
          type="password"
          required
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <SubmitButton
          size={"lg"}
          className="w-full cursor-pointer"
          isPending={isPending}
        >
          เข้าสู่ระบบ
        </SubmitButton>
        <div className="flex items-center gap-2 text-xs w-full">
          <div className="flex-1 h-full w-full border-t border-muted-foreground/25" />
          <span className="text-muted-foreground/50 text-md">หรือ</span>
          <div className="flex-1 h-full w-full border-t border-muted-foreground/25" />
        </div>
        <Button className="w-full" size={"lg"} variant={"outline"} asChild>
          <Link href={"/auth/register"}>สมัครสมาชิก</Link>
        </Button>
      </CardFooter>
    </Form>
  );
}
