"use client";

import { IUser } from "@/features/auth/schemas/user.schema";
import { useForm } from "@/hooks/use-form";
import { SubmitButtonProps } from "@/types/components/button";
import { deleteStaffAction } from "@/features/admin/actions/staff-admin.action";
import { useEffect } from "react";
import { Form } from "@/lib/form";
import { SubmitButton } from "@/components/shared/button/submit-button";

interface DeleteStaffManagementButtonProps extends SubmitButtonProps {
  staff: IUser;
  onClose?: (() => void) | undefined;
}

export function DeleteStaffManagementButton({
  staff,
  onClose,
  ...props
}: DeleteStaffManagementButtonProps) {
  const { formAction, isPending, state } = useForm({
    action: deleteStaffAction,
    mode: "controlled",
  });

  useEffect(() => {
    if (state && state.status === "success") {
      if (onClose) {
        onClose();
      }
    }
  }, [state, onClose]);

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: `ลบเจ้าหน้าที่ "${staff.fullName}"`,
        description:
          "การลบนี้เป็นการลบถาวรจะไม่สามารถกู้คืนข้อมูลกลับมาได้",
      }}
    >
      <input type="hidden" name="staff-id" defaultValue={staff.id} />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
