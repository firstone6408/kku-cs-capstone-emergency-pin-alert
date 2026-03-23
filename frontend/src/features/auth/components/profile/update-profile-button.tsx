"use client";

import { ButtonProps } from "@/types/components/button";
import { IUser } from "../../schemas/user.schema";
import { Button } from "@/components/ui/button";
import { UpdateProfileModal } from "./update-profile-modal";
import { useModal } from "@/hooks/use-modal";

interface UpdateProfileButtonProps extends ButtonProps {
  user: IUser;
}

export function UpdateProfileButton({
  user,
  ...props
}: UpdateProfileButtonProps) {
  const updateProfileModal = useModal<IUser>();

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={() => updateProfileModal.openModal(user)}
        {...props}
      />

      {/* Modal */}
      <UpdateProfileModal
        key={`update-profile-modal-${user.id}`}
        open={updateProfileModal.isOpen}
        onOpenChange={updateProfileModal.setIsOpen}
        onClose={updateProfileModal.closeModal}
        user={user}
      />
    </>
  );
}
