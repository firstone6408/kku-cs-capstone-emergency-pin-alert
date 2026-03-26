"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { IIncident } from "@/features/incident/schemas/incident.schema";
import { cancelAssignmentIncidentStaffAction } from "@/features/staff/actions/staff-incident.action";
import { useForm } from "@/hooks/use-form";
import { Form } from "@/lib/form";
import { SubmitButtonProps } from "@/types/components/button";

interface CancelAssignmentIncidentStaffButtonProps extends SubmitButtonProps {
  incident: IIncident;
}

export function CancelAssignmentIncidentStaffButton({
  incident,
  ...props
}: CancelAssignmentIncidentStaffButtonProps) {
  const { formAction, isPending } = useForm({
    action: cancelAssignmentIncidentStaffAction,
    mode: "controlled",
  });
  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: "ยกเลิกการช่วยเหลือรายการแจ้งเหตุฉุกเฉิน",
        description:
          "คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการช่วยเหลือรายการแจ้งเหตุฉุกเฉิน",
      }}
    >
      <input type="hidden" name="incident-id" defaultValue={incident.id} />
      <SubmitButton isPending={isPending} {...props} />
    </Form>
  );
}
