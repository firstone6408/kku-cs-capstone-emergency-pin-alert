"use client";

import { useForm } from "@/hooks/use-form";
import { registerAction } from "../actions/auth.action";
import { Form } from "@/lib/form";
import { UserRoleTab } from "./user-role-tab";
import { useState } from "react";
import { StaffRoleEnum, UserRoleEnum } from "../schemas/user.schema";
import { InputField } from "@/components/shared/field/input-field";
import { CardContent, CardFooter } from "@/components/ui/card";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { TabField } from "@/components/shared/field/tab-field";
import { translateEnum } from "@/lib/translate";
import { LabeledControl } from "@/components/shared/field/labeled-control";

export function RegisterForm() {
  const [registerTab, setRegisterTab] = useState<UserRoleEnum>(
    UserRoleEnum.REPORTER,
  );
  const { formAction, isPending, error, clearError } = useForm({
    action: registerAction,
    redirectTo: "/",
  });

  return (
    <Form
      action={formAction}
      onChange={clearError}
      className="space-y-3 max-h-140 overflow-y-auto"
    >
      <UserRoleTab tab={registerTab} setTab={setRegisterTab} />
      <input
        type="hidden"
        name="register-type"
        defaultValue={registerTab}
      />
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
          label="ชื่อ-นามสกุล"
          name="full-name"
          placeholder="กรอกชื่อ-นามสกุล"
          errorMessage={error.fullName}
          required
        />
        <InputField
          label="เบอร์โทรศัพท์"
          name="phone"
          placeholder="กรอกเบอร์โทรศัพท์"
          errorMessage={error.phone}
          required
        />

        {registerTab === UserRoleEnum.STAFF && (
          <LabeledControl label="บทบาท" errorMessage={error.staffRole}>
            <TabField
              className="px-0"
              defaultValue={StaffRoleEnum.VOLUNTEER}
              name="staff-role"
              data={StaffRoleEnum}
              translateFn={translateEnum.staffRoleEnum}
            />
          </LabeledControl>
        )}

        <InputField
          label="รหัสผ่าน"
          name="password"
          placeholder="กรอกรหัสผ่าน"
          errorMessage={error.password}
          type="password"
          required
        />
        <InputField
          label="ยืนยันรหัสผ่าน"
          name="confirm-password"
          placeholder="ยืนยันรหัสผ่าน"
          errorMessage={error.confirmPassword}
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
          สมัครสมาชิก
        </SubmitButton>
      </CardFooter>
    </Form>
  );
}
