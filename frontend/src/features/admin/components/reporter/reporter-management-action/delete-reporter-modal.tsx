"use client";

import { IUser } from "@/features/auth/schemas/user.schema";
import { useForm } from "@/hooks/use-form";
import { SubmitButtonProps } from "@/types/components/button";
import { deleteReporterAction } from "@/features/admin/actions/reporter-admin.action";
import { useEffect } from "react";
import { Form } from "@/lib/form";
import { SubmitButton } from "@/components/shared/button/submit-button";

interface DeleteReporterManagementButtonProps extends SubmitButtonProps {
  reporter: IUser;
  onClose?: (() => void) | undefined;
}

export function DeleteReporterManagementButton({
  reporter,
  onClose,
  ...props
}: DeleteReporterManagementButtonProps) {
  const { formAction, isPending, state } = useForm({
    action: deleteReporterAction,
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
        title: `ลบผู้แจ้งเหตุ "${reporter.fullName}"`,
        description:
          "การลบนี้เป็นการลบถาวรจะไม่สามารถกู้คืนข้อมูลกลับมาได้",
      }}
    >
      <input type="hidden" name="reporter-id" defaultValue={reporter.id} />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
