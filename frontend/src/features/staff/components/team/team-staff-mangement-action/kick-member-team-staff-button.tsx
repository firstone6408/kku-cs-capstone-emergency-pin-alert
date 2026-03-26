"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { kickMemberTeamStaffAction } from "@/features/staff/actions/staff-team.action";
import { ITeamStaffMember } from "@/features/staff/schemas/team/team-staff.schema";
import { useForm } from "@/hooks/use-form";
import { Form } from "@/lib/form";
import { SubmitButtonProps } from "@/types/components/button";

interface KickMemberTeamStaffButtonProps extends SubmitButtonProps {
  member: ITeamStaffMember;
}

export function KickMemberTeamStaffButton({
  member,
  ...props
}: KickMemberTeamStaffButtonProps) {
  const { formAction, isPending } = useForm({
    action: kickMemberTeamStaffAction,
    mode: "controlled",
  });

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: `เตะสมาชิก "${member.staff.fullName}" ออกจากทีม`,
        description: `คุณแน่ใจหรือไม่ว่าต้องการเตะสมาชิก "${member.staff.fullName}" ออกจากทีม`,
      }}
    >
      <input type="hidden" name="member-id" defaultValue={member.id} />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
