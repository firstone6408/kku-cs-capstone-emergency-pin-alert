"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { useForm } from "@/hooks/use-form";
import { Form } from "@/lib/form";
import { SubmitButtonProps } from "@/types/components/button";
import { logoutAction } from "../actions/auth.action";

export function LogoutButton({ ...props }: SubmitButtonProps) {
  const { formAction, isPending } = useForm({
    action: logoutAction,
    redirectTo: "/auth/login",
    mode: "controlled",
  });

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: "ออกจากระบบ",
        description: "คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ",
      }}
    >
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
