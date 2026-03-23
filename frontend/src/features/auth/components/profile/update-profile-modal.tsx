"use client";

import { ModalProps } from "@/types/components/modal";
import {
  IUser,
  StaffRoleEnum,
  UserRoleEnum,
} from "../../schemas/user.schema";
import { Modal } from "@/components/shared/modal/modal";
import { Form } from "@/lib/form";
import { useForm } from "@/hooks/use-form";
import { updateUserProfileAction } from "../../actions/auth.action";
import { InputField } from "@/components/shared/field/input-field";
import { SubmitButton } from "@/components/shared/button/submit-button";
import { Save } from "lucide-react";
import { LabeledControl } from "@/components/shared/field/labeled-control";
import { SelectField } from "@/components/shared/field/select-field";
import { translateEnum } from "@/lib/translate";
import { useEffect } from "react";

interface UpdateProfileModalProps extends ModalProps {
  user: IUser;
}

export function UpdateProfileModal({
  user,
  open,
  onOpenChange,
  onClose,
}: UpdateProfileModalProps) {
  const { state, formAction, isPending, error, clearError } = useForm({
    action: updateUserProfileAction,
  });

  useEffect(() => {
    if (state && state.status === "success") {
      if (onClose) {
        state.status = "expected-error";
        onClose();
      }
    }
  }, [state, onClose]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      onClose={onClose}
      title="แก้ไขข้อมูลส่วนตัว"
      description=""
    >
      <Form
        action={formAction}
        onChange={clearError}
        className="space-y-2"
      >
        {/* Input hidden */}
        <input type="hidden" name="user-id" value={user.id} />
        <input type="hidden" name="role" value={user.role} />

        <InputField
          label="ชื่อ-นามสกุล"
          name="full-name"
          placeholder="กรอกชื่อ-นามสกุล"
          errorMessage={error.fullName}
          defaultValue={user.fullName}
          required
        />
        <InputField
          label="อีเมล"
          name="email"
          placeholder="example@kku.ac.th"
          errorMessage={error.email}
          defaultValue={user.email}
          type="email"
          required
        />
        {user.role === UserRoleEnum.STAFF && (
          <LabeledControl label="บทบาท">
            <SelectField
              className="w-full"
              data={StaffRoleEnum}
              translateFn={translateEnum.staffRoleEnum}
              defaultValue={user.staffRole || ""}
              name="staff-role"
              required
            />
          </LabeledControl>
        )}
        <InputField
          label="เบอร์โทรศัพท์"
          name="phone"
          placeholder="กรอกเบอร์โทรศัพท์"
          errorMessage={error.phone}
          defaultValue={user.phone}
          required
        />
        <InputField
          label="รหัสผ่าน"
          name="password"
          placeholder="กรอกรหัสผ่าน"
          errorMessage={error.password}
          type="password"
        />

        <SubmitButton
          isPending={isPending}
          icon={Save}
          className="w-full"
          size={"lg"}
        >
          บันทึก
        </SubmitButton>
      </Form>
    </Modal>
  );
}
