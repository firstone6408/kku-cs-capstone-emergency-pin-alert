import { BaseCard } from "@/components/shared/card/base-card";
import { IIncidentType } from "../schemas/incident-type.schema";
import { IncidentTypeListManagementTable } from "./incident-type-list-management-table";
import { UpsertIncidentTypeManagementButton } from "./incident-management-action";
import { Plus } from "lucide-react";

interface IncidentTypeMangementContainerProps {
  incidentTypes: IIncidentType[];
}

export function IncidentTypeMangementContainer({
  incidentTypes,
}: IncidentTypeMangementContainerProps) {
  return (
    <BaseCard
      card={{ container: true, content: true }}
      content={
        <div className="p-2 space-y-2">
          <UpsertIncidentTypeManagementButton
            size={"lg"}
            actionType="create"
            incidentType={null}
          >
            <Plus />
            <span>เพิ่มประเภทเหตุฉุกเฉิน</span>
          </UpsertIncidentTypeManagementButton>
          <IncidentTypeListManagementTable incidentTypes={incidentTypes} />
        </div>
      }
    />
  );
}
