"use client";

import { IUser, StaffRoleEnum } from "@/features/auth/schemas/user.schema";
import { useForm } from "@/hooks/use-form";
import { ModalProps } from "@/types/components/modal";
import { useEffect } from "react";
import { upsertStaffAction } from "@/features/admin/actions/staff-admin.action";
import { Modal } from "@/components/shared/modal/modal";
import { Form } from "@/lib/form";
import { InputField } from "@/components/shared/field/input-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Save } from "lucide-react";
import { SelectField } from "@/components/shared/field/select-field";
import { LabeledControl } from "@/components/shared/field/labeled-control";
import { translateEnum } from "@/lib/translate";

interface UpsertStaffManagementModalProps extends ModalProps {
  actionType: "create" | "update";
  staff: IUser | null;
  passwordRequired?: boolean;
}

export function UpsertStaffManagementModal({
  actionType,
  staff,
  open,
  onOpenChange,
  onClose,
  passwordRequired = false,
}: UpsertStaffManagementModalProps) {
  const { state, formAction, isPending, error, clearError } = useForm({
    action: upsertStaffAction,
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
          ? "เพิ่มเจ้าหน้าที่"
          : "แก้ไขข้อมูลเจ้าหน้าที่"
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
          <input type="hidden" name="staff-id" defaultValue={staff?.id} />
        )}
        <InputField
          label="ชื่อ - นามสกุล"
          defaultValue={staff?.fullName}
          name="staff-full-name"
          errorMessage={error.fullName}
          required
        />
        <InputField
          label="อีเมล์"
          type="email"
          defaultValue={staff?.email}
          name="staff-email"
          errorMessage={error.email}
          required
        />
        <LabeledControl label="บทบาท">
          <SelectField
            name="staff-role"
            placeholder="เลือกบทบาท"
            className="w-full"
            data={StaffRoleEnum}
            defaultValue={staff?.staffRole || ""}
            translateFn={translateEnum.staffRoleEnum}
            required
          />
        </LabeledControl>
        <InputField
          label="เบอร์โทร"
          type="tel"
          defaultValue={staff?.phone}
          name="staff-phone"
          errorMessage={error.phone}
          required
        />
        <InputField
          label="รหัสผ่าน"
          type="password"
          name="staff-password"
          errorMessage={error.password}
          required={passwordRequired}
        />

        <div className="flex justify-end">
          <SubmitButton size={"lg"} icon={Save} isPending={isPending}>
            {actionType === "create"
              ? "เพิ่มเจ้าหน้าที่"
              : "แก้ไขข้อมูลเจ้าหน้าที่"}
          </SubmitButton>
        </div>
      </Form>
    </Modal>
  );
}
