"use client";

import { ModalProps } from "@/types/components/modal";
import { IIncidentType } from "../../schemas/incident-type.schema";
import { useForm } from "@/hooks/use-form";
import { upsertIncidentTypeAction } from "../../actions/incident-type.action";
import { Modal } from "@/components/shared/modal/modal";
import { Form } from "@/lib/form";
import { useEffect } from "react";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Save } from "lucide-react";
import { InputField } from "@/components/shared/field/input-field";
import { SelectField } from "@/components/shared/field/select-field";
import { LabeledControl } from "@/components/shared/field/labeled-control";
import { translateEnum } from "@/lib/translate";

interface UpsertIncidentTypeManagementModalProps extends ModalProps {
  actionType: "create" | "update";
  incidentType: IIncidentType | null;
}

export function UpsertIncidentTypeManagementModal({
  actionType,
  incidentType,
  open,
  onOpenChange,
  onClose,
}: UpsertIncidentTypeManagementModalProps) {
  const { state, formAction, isPending, error, clearError } = useForm({
    action: upsertIncidentTypeAction,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      if (onClose) {
        state.status = "expected-error";
        onClose();
      }
    }
  }, [onClose, state]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      onClose={onClose}
      title={`${actionType === "create" ? "เพิ่ม" : "แก้ไข"} ประเภทเหตุการณ์`}
      description=""
    >
      <Form
        action={formAction}
        onChange={clearError}
        className="space-y-2"
      >
        {/* input hidden */}
        <input type="hidden" name="form-type" defaultValue={actionType} />
        <input
          type="hidden"
          name="incident-type-id"
          defaultValue={incidentType?.id}
        />

        <InputField
          label="ประเภทเหตุการณ์"
          name="incident-type-name"
          defaultValue={incidentType?.name}
          errorMessage={error.name}
          required
        />

        <LabeledControl
          label="ลำดับความสำคัญ"
          description="เลือกลำดับความสำคัญ โดยจะเป็นลำดับ 1 ถึง 5 เรียงกาลําดับจากสูงไปต่ํา"
          errorMessage={error.priorityLevel}
        >
          <SelectField
            className="w-full"
            data={["1", "2", "3", "4", "5"]}
            translateFn={translateEnum.incidentTypePriorityLevel}
            name="incident-type-priority-level"
            defaultValue={incidentType?.priorityLevel.toString()}
            placeholder="เลือกลำดับความสำคัญ"
            required
          />
        </LabeledControl>

        <div className="flex justify-end">
          <SubmitButton size={"lg"} isPending={isPending} icon={Save}>
            บันทึก
          </SubmitButton>
        </div>
      </Form>
    </Modal>
  );
}
