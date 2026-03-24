"use client";

import { ButtonProps } from "@/types/components/button";
import { IIncidentType } from "../../schemas/incident-type.schema";
import { useModal } from "@/hooks/use-modal";
import { UpsertIncidentTypeManagementModal } from "./upsert-incident-type-modal";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
import { DeleteIncidentTypeButton } from "./delete-incident-type-button";

interface UpsertIncidentTypeManagementButtonProps extends ButtonProps {
  incidentType: IIncidentType | null;
  actionType: "create" | "update";
}

export function UpsertIncidentTypeManagementButton({
  incidentType,
  actionType,
  ...props
}: UpsertIncidentTypeManagementButtonProps) {
  const upsertincidentTypeModal = useModal<IIncidentType | null>();

  return (
    <>
      <Button
        onClick={() => upsertincidentTypeModal.openModal(incidentType)}
        {...props}
      />

      {/* Modal Section */}
      <UpsertIncidentTypeManagementModal
        //     key={`${actionType}-incident-type-modal` + incidentType?.id}
        open={upsertincidentTypeModal.isOpen}
        onOpenChange={upsertincidentTypeModal.setIsOpen}
        onClose={upsertincidentTypeModal.closeModal}
        actionType={actionType}
        incidentType={incidentType}
      />
    </>
  );
}

interface IncidentTypeManagementRootActionProps {
  incidentType: IIncidentType;
  className?: string;
}

export function IncidentTypeManagementRootAction({
  incidentType,
  ...props
}: IncidentTypeManagementRootActionProps) {
  return (
    <div {...props}>
      <UpsertIncidentTypeManagementButton
        key={` update-incident-type-modal` + incidentType?.id}
        incidentType={incidentType}
        actionType={"update"}
      >
        <Pen />
      </UpsertIncidentTypeManagementButton>
      <DeleteIncidentTypeButton
        key={` delete-incident-type-modal` + incidentType?.id}
        variant={"destructive"}
        incidentType={incidentType}
      >
        <Trash />
      </DeleteIncidentTypeButton>
    </div>
  );
}
