"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { joinTeamStaffAction } from "@/features/staff/actions/staff-team.action";
import { ITeamStaff } from "@/features/staff/schemas/team/team-staff.schema";
import { useForm } from "@/hooks/use-form";
import { Form } from "@/lib/form";
import { SubmitButtonProps } from "@/types/components/button";

interface JoinTeamStaffButtonProps extends SubmitButtonProps {
  team: ITeamStaff;
}

export function JoinTeamStaffButton({
  team,
  ...props
}: JoinTeamStaffButtonProps) {
  const { formAction, isPending } = useForm({
    action: joinTeamStaffAction,
    mode: "controlled",
  });

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: `เข้าร่วมทีม ${team.name}`,
        description: `คุณแน่ใจหรือไม่ว่าต้องการเข้าร่วมทีม ${team.name}`,
      }}
    >
      <input type="hidden" name="team-id" defaultValue={team.id} />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
