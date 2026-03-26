"use client";

import { SubmitButton } from "@/components/shared/button/submit-button";
import { InputField } from "@/components/shared/field/input-field";
import { Modal } from "@/components/shared/modal/modal";
import { Button } from "@/components/ui/button";
import { createTeamStaffAction } from "@/features/staff/actions/staff-team.action";
import { useForm } from "@/hooks/use-form";
import { useModal } from "@/hooks/use-modal";
import { Form } from "@/lib/form";
import { ButtonProps } from "@/types/components/button";
import { Save } from "lucide-react";
import { Fragment, useEffect } from "react";

export function CreateTeamStaffButton({ ...props }: ButtonProps) {
  const { openModal, isOpen, setIsOpen, closeModal } = useModal();

  const { state, formAction, isPending, error, clearError } = useForm({
    action: createTeamStaffAction,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      state.status = "expected-error";
      closeModal();
    }
  }, [closeModal, state]);

  return (
    <Fragment>
      {/* Toogle Modal Button */}
      <Button onClick={openModal} {...props} />

      {/* Modal */}
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        onClose={closeModal}
        title="สร้างทีม"
        description=""
      >
        <Form
          action={formAction}
          onChange={clearError}
          className="space-y-2"
        >
          <InputField
            label="ชื่อทีม"
            name="team-name"
            placeholder="กรอกชื่อทีม"
            errorMessage={error.name}
            required
          />
          <SubmitButton
            className="w-full"
            isPending={isPending}
            icon={Save}
          >
            บันทึก
          </SubmitButton>
        </Form>
      </Modal>
    </Fragment>
  );
}
