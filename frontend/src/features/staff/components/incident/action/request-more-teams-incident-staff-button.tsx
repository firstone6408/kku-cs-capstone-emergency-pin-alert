"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { InputField } from "@/components/shared/field/input-field";
import { Modal } from "@/components/shared/modal/modal";
import { Button } from "@/components/ui/button";
import { IIncident } from "@/features/incident/schemas/incident.schema";
import { requestMoreTeamsIncidentStaffAction } from "@/features/staff/actions/staff-incident.action";
import { useForm } from "@/hooks/use-form";
import { useModal } from "@/hooks/use-modal";
import { Form } from "@/lib/form";
import { ButtonProps } from "@/types/components/button";
import { Save } from "lucide-react";
import { Fragment, useEffect } from "react";

interface RequestMoreTeamsIncidentStaffButtonProps extends ButtonProps {
  incident: IIncident;
}

export function RequestMoreTeamsIncidentStaffButton({
  incident,
  ...props
}: RequestMoreTeamsIncidentStaffButtonProps) {
  const { openModal, isOpen, setIsOpen, closeModal } = useModal();

  const { state, formAction, isPending, error, clearError } = useForm({
    action: requestMoreTeamsIncidentStaffAction,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      state.status = "expected-error";
      closeModal();
    }
  }, [closeModal, state]);

  return (
    <Fragment>
      {/* Toggle Modal Button */}
      <Button onClick={() => openModal(undefined)} {...props} />

      {/* Modal */}
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        onClose={closeModal}
        title="ขอเพิ่มทีม"
        description="ต้องการขอความช่วยเหลือเพิ่มเติมจากทีมอื่น"
      >
        <Form
          action={formAction}
          onChange={clearError}
          className="space-y-2"
        >
          <input
            type="hidden"
            name="incident-id"
            defaultValue={incident.id}
          />
          <InputField
            name="incident-staff-additional-teams"
            label="จํานวนทีม"
            placeholder="กรอกจํานวนทีมที่ต้องการขอเพิ่ม"
            type="number"
            errorMessage={error?.additionalTeams}
            required
          />

          <SubmitButton
            isPending={isPending}
            className="w-full"
            icon={Save}
          >
            บันทึก
          </SubmitButton>
        </Form>
      </Modal>
    </Fragment>
  );
}
