"use client";

import { IUser } from "@/features/auth/schemas/user.schema";
import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";
import { DeleteStaffManagementButton } from "./delete-staff-modal";
import { Pen, Trash } from "lucide-react";
import { ButtonProps } from "@/types/components/button";
import { UpsertStaffManagementModal } from "./upsert-staff-modal";

interface StaffManagementRootActionProps {
  staff: IUser;
}

export function StaffManagementRootAction({
  staff,
}: StaffManagementRootActionProps) {
  const upsertStaffModal = useModal<IUser>();

  return (
    <>
      {/* Action Button Section */}
      <div className="flex justify-end gap-2">
        <Button onClick={() => upsertStaffModal.openModal(staff)}>
          <Pen />
        </Button>
        <DeleteStaffManagementButton
          staff={staff}
          variant={"destructive"}
          icon={Trash}
        />
      </div>

      {/* Modal Section */}
      <UpsertStaffManagementModal
        key={"update-staff-modal" + staff.id}
        open={upsertStaffModal.isOpen}
        onOpenChange={upsertStaffModal.setIsOpen}
        onClose={upsertStaffModal.closeModal}
        actionType={"update"}
        staff={staff}
      />
    </>
  );
}

interface UpsertStaffManagementButtonProps extends ButtonProps {
  staff: IUser | null;
  actionType: "create" | "update";
  passwordRequired?: boolean;
}

export function UpsertStaffManagementButton({
  actionType,
  staff,
  passwordRequired = false,
  ...props
}: UpsertStaffManagementButtonProps) {
  const upsertStaffModal = useModal<IUser | null>();

  return (
    <>
      <Button
        onClick={() => upsertStaffModal.openModal(staff)}
        {...props}
      />

      {/* Modal Section */}
      <UpsertStaffManagementModal
        key={`${actionType}-staff-modal` + staff?.id}
        open={upsertStaffModal.isOpen}
        onOpenChange={upsertStaffModal.setIsOpen}
        onClose={upsertStaffModal.closeModal}
        actionType={actionType}
        staff={staff}
        passwordRequired={passwordRequired}
      />
    </>
  );
}
