"use client";

import { SubmitButtonProps } from "@/types/components/button";
import { IIncidentType } from "../../schemas/incident-type.schema";
import { useForm } from "@/hooks/use-form";
import { deleteIncidentTypeAction } from "../../actions/incident-type.action";
import { Form } from "@/lib/form";
import { SubmitButton } from "@/components/shared/button/submit-button";

interface DeleteIncidentTypeButtonProps extends SubmitButtonProps {
  incidentType: IIncidentType;
}

export function DeleteIncidentTypeButton({
  incidentType,
  ...props
}: DeleteIncidentTypeButtonProps) {
  const { formAction, isPending } = useForm({
    action: deleteIncidentTypeAction,
    mode: "controlled",
  });

  return (
    <Form
      action={formAction}
      confirmConfig={{
        title: `ลบประเภทเหตุการณ์ "${incidentType.name}"`,
        description:
          "การลบนี้เป็นการลบถาวรจะไม่สามารถกู้คืนข้อมูลกลับมาได้",
      }}
    >
      <input
        type="hidden"
        name="incident-type-id"
        defaultValue={incidentType.id}
      />
      <SubmitButton {...props} isPending={isPending} />
    </Form>
  );
}
