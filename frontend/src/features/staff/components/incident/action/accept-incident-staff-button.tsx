"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { Button } from "@/components/ui/button";
import { IIncident } from "@/features/incident/schemas/incident.schema";
import { acceptIncidentStaffAction } from "@/features/staff/actions/staff-incident.action";
import { ITeamStaff } from "@/features/staff/schemas/team/team-staff.schema";
import { useForm } from "@/hooks/use-form";
import { Form } from "@/lib/form";
import { SubmitButtonProps } from "@/types/components/button";
import Link from "next/link";

interface AcceptIncidentStaffButtonProps extends SubmitButtonProps {
  incident: IIncident;
  myTeam: ITeamStaff | null;
}

export function AcceptIncidentStaffButton({
  incident,
  myTeam,
  ...props
}: AcceptIncidentStaffButtonProps) {
  const { formAction, isPending } = useForm({
    action: acceptIncidentStaffAction,
    mode: "controlled",
  });

  return !!myTeam ? (
    <Form
      action={formAction}
      confirmConfig={{
        title: "รับรายการแจ้งเหตุฉุกเฉิน",
        description:
          "คุณแน่ใจหรือไม่ว่าต้องการยอมรับรายการแจ้งเหตุฉุกเฉิน",
      }}
    >
      <input type="hidden" name="incident-id" defaultValue={incident.id} />
      <SubmitButton isPending={isPending} {...props} />
    </Form>
  ) : (
    <Button asChild variant={"secondary"} {...props}>
      <Link href="/teams">คุณยังไม่มีทีม คลิกเพื่อไปหน้าจัดการทีม</Link>
    </Button>
  );
}
