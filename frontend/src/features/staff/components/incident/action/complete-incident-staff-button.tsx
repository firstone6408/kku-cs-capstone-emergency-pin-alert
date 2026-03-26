"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { IIncident } from "@/features/incident/schemas/incident.schema";
import { completeIncidentStaffAction } from "@/features/staff/actions/staff-incident.action";
import { useForm } from "@/hooks/use-form";
import { Form } from "@/lib/form";
import { SubmitButtonProps } from "@/types/components/button";

interface CompleteIncidentStaffButtonProps extends SubmitButtonProps {
  incident: IIncident;
}

export function CompleteIncidentStaffButton({
  incident,
  ...props
}: CompleteIncidentStaffButtonProps) {
  const { formAction, isPending } = useForm({
    action: completeIncidentStaffAction,
    mode: "controlled",
  });

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: "ช่วยเหลือเสร็จสิ้นการแจ้งเหตุฉุกเฉิน",
        description:
          "คุณแน่ใจหรือไม่ว่าต้องการช่วยเหลือเสร็จสิ้นการแจ้งเหตุฉุกเฉิน",
      }}
    >
      <input type="hidden" name="incident-id" defaultValue={incident.id} />
      <SubmitButton isPending={isPending} {...props} />
    </Form>
  );
}
