"use client";

import { IUser } from "@/features/auth/schemas/user.schema";
import { useModal } from "@/hooks/use-modal";
import { UpsertReporterManagementModal } from "./upsert-reporter-modal";
import { Button } from "@/components/ui/button";
import { DeleteReporterManagementButton } from "./delete-reporter-modal";
import { Pen, Trash } from "lucide-react";
import { ButtonProps } from "@/types/components/button";

interface ReporterManagementRootActionProps {
  reporter: IUser;
}

export function ReporterManagementRootAction({
  reporter,
}: ReporterManagementRootActionProps) {
  const upsertReporterModal = useModal<IUser>();

  return (
    <>
      {/* Action Button Section */}
      <div className="flex justify-end gap-2">
        <Button onClick={() => upsertReporterModal.openModal(reporter)}>
          <Pen />
        </Button>
        <DeleteReporterManagementButton
          reporter={reporter}
          variant={"destructive"}
          icon={Trash}
        />
      </div>

      {/* Modal Section */}
      <UpsertReporterManagementModal
        key={"update-reporter-modal" + reporter.id}
        open={upsertReporterModal.isOpen}
        onOpenChange={upsertReporterModal.setIsOpen}
        onClose={upsertReporterModal.closeModal}
        actionType={"update"}
        reporter={reporter}
      />
    </>
  );
}

interface UpsertReporterManagementButtonProps extends ButtonProps {
  reporter: IUser | null;
  actionType: "create" | "update";
  passwordRequired?: boolean;
}

export function UpsertReporterManagementButton({
  actionType,
  reporter,
  passwordRequired = false,
  ...props
}: UpsertReporterManagementButtonProps) {
  const upsertReporterModal = useModal<IUser | null>();

  return (
    <>
      <Button
        onClick={() => upsertReporterModal.openModal(reporter)}
        {...props}
      />

      {/* Modal Section */}
      <UpsertReporterManagementModal
        key={`${actionType}-reporter-modal` + reporter?.id}
        open={upsertReporterModal.isOpen}
        onOpenChange={upsertReporterModal.setIsOpen}
        onClose={upsertReporterModal.closeModal}
        actionType={actionType}
        reporter={reporter}
        passwordRequired={passwordRequired}
      />
    </>
  );
}
