"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IncidentTypePriorityBadge } from "@/features/incident-type/components/incident-type-priority-badge";
import { IIncidentType } from "@/features/incident-type/schemas/incident-type.schema";
import { Fragment, useState } from "react";
import { cn } from "@/lib/utils";

interface SelectIncidentTypeStepProps {
  incidentTypes: IIncidentType[];
  selected: IIncidentType | null;
  onSelect?: (incident: IIncidentType) => void; // optional callback
}

export function SelectIncidentTypeStep({
  incidentTypes,
  selected,
  onSelect,
}: SelectIncidentTypeStepProps) {
  const [selectedId, setSelectedId] = useState<number | null>(
    selected?.id ?? null,
  );

  const handleSelect = (incident: IIncidentType) => {
    setSelectedId(incident.id);
    onSelect?.(incident); // ยิง event ออกไปข้างนอก
  };

  return (
    <Fragment>
      <h3 className="text-muted-foreground my-2">
        เลือกประเภทเหตุฉุกเฉิน
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {incidentTypes.length > 0 ? (
          incidentTypes.map((incidentType) => {
            const isSelected = selectedId === incidentType.id;

            return (
              <Card
                key={incidentType.id}
                onClick={() => handleSelect(incidentType)}
                className={cn("cursor-pointer transition-all border-2", {
                  // selected
                  "border-primary bg-primary/10": isSelected,

                  // default
                  "hover:border-primary": !isSelected,
                })}
              >
                <CardHeader>
                  <CardTitle>{incidentType.name}</CardTitle>
                  <CardDescription>
                    <IncidentTypePriorityBadge
                      incidentType={incidentType}
                    />
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })
        ) : (
          <div>ไม่พบประเภทเหตุฉุกเฉิน</div>
        )}
      </div>
    </Fragment>
  );
}
