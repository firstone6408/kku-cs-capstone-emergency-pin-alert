"use client";

import { useForm } from "@/hooks/use-form";
import { loginAction } from "../actions/auth.action";
import { Form } from "@/lib/form";
import { CardContent, CardFooter } from "@/components/ui/card";
import { InputField } from "@/components/shared/field/input-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TabField } from "@/components/shared/field/tab-field";
import { UserRoleEnum } from "../schemas/user.schema";
import { translateEnum } from "@/lib/translate";


export function LoginForm() {
  const { formAction, isPending, error, clearError } = useForm({
    action: loginAction,
    redirectTo: "/",
  });
  return (
    <Form action={formAction} onChange={clearError}>
      <TabField className="px-2 py-0" data={UserRoleEnum} name="role" translateFn={translateEnum.userRoleEnum} />
      <CardContent className="space-y-2 pt-2">
        <InputField
          label="อีเมล"
          name="email"
          placeholder="example@kku.ac.th"
          errorMessage={error.email}
          type="email"
          required
        />
        <div>
          <InputField
            label="รหัสผ่าน"
            name="password"
            placeholder="กรอกรหัสผ่าน"
            errorMessage={error.password}
            type="password"
            required
          />
          <div className="flex justify-end mt-1.5">
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              ลืมรหัสผ่าน?
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 border-t-0 bg-transparent px-4 pb-6">
        <SubmitButton
          size={"lg"}
          className="w-full cursor-pointer h-12 text-base font-semibold rounded-xl"
          isPending={isPending}
        >
          เข้าสู่ระบบ
        </SubmitButton>
        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-muted-foreground/20" />
          <span className="text-muted-foreground/50 text-sm">หรือ</span>
          <div className="flex-1 h-px bg-muted-foreground/20" />
        </div>
        <Button
          className="w-full h-12 text-base font-semibold rounded-xl cursor-pointer"
          variant={"outline"}
          asChild
        >
          <Link href={"/auth/register"}>สมัครสมาชิก</Link>
        </Button>
      </CardFooter>
    </Form>
  );
}
