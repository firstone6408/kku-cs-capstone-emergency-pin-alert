"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { leaveTeamStaffAction } from "@/features/staff/actions/staff-team.action";
import { useForm } from "@/hooks/use-form";
import { Form } from "@/lib/form";
import { SubmitButtonProps } from "@/types/components/button";

export function LeaveTeamStaffButton({ ...props }: SubmitButtonProps) {
  const { formAction, isPending } = useForm({
    action: leaveTeamStaffAction,
    mode: "controlled",
  });

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: "ออกจากทีม",
        description: "คุณแน่ใจหรือไม่ว่าต้องการออกจากทีม",
      }}
    >
      <SubmitButton isPending={isPending} {...props} />
    </Form>
  );
}
