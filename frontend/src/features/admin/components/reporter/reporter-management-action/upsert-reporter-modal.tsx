"use client";

import { IUser } from "@/features/auth/schemas/user.schema";
import { useForm } from "@/hooks/use-form";
import { ModalProps } from "@/types/components/modal";
import { useEffect } from "react";
import { upsertReporterAction } from "@/features/admin/actions/reporter-admin.action";
import { Modal } from "@/components/shared/modal/modal";
import { Form } from "@/lib/form";
import { InputField } from "@/components/shared/field/input-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Save } from "lucide-react";

interface UpsertReporterManagementModalProps extends ModalProps {
  actionType: "create" | "update";
  reporter: IUser | null;
  passwordRequired?: boolean;
}

export function UpsertReporterManagementModal({
  actionType,
  reporter,
  open,
  onOpenChange,
  onClose,
  passwordRequired = false,
}: UpsertReporterManagementModalProps) {
  const { state, formAction, isPending, error, clearError } = useForm({
    action: upsertReporterAction,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      if (onClose) {
        // เปลี่ยน status เพื่อให้ form เปิดได้อีกรอบ
        state.status = "expected-error";
        onClose();
      }
    }
  }, [state, onClose]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={
        actionType === "create"
          ? "เพิ่มผู้แจ้งเหตุ"
          : "แก้ไขข้อมูลผู้แจ้งเหตุ"
      }
      description=""
    >
      <Form
        action={formAction}
        className="space-y-2"
        onChange={clearError}
      >
        <input type="hidden" name="form-type" defaultValue={actionType} />
        {actionType === "update" && (
          <input
            type="hidden"
            name="reporter-id"
            defaultValue={reporter?.id}
          />
        )}
        <InputField
          label="ชื่อ - นามสกุล"
          defaultValue={reporter?.fullName}
          name="reporter-full-name"
          errorMessage={error.fullName}
          required
        />
        <InputField
          label="อีเมล์"
          type="email"
          defaultValue={reporter?.email}
          name="reporter-email"
          errorMessage={error.email}
          required
        />
        <InputField
          label="เบอร์โทร"
          type="tel"
          defaultValue={reporter?.phone}
          name="reporter-phone"
          errorMessage={error.phone}
          required
        />
        <InputField
          label="รหัสผ่าน"
          type="password"
          name="reporter-password"
          errorMessage={error.password}
          required={passwordRequired}
        />

        <div className="flex justify-end">
          <SubmitButton size={"lg"} icon={Save} isPending={isPending}>
            {actionType === "create"
              ? "เพิ่มผู้แจ้งเหตุ"
              : "แก้ไขข้อมูลผู้แจ้งเหตุ"}
          </SubmitButton>
        </div>
      </Form>
    </Modal>
  );
}
