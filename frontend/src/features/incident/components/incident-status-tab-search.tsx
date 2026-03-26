"use client";

import { TabField } from "@/components/shared/field/tab-field";
import { useSearchQuery } from "@/hooks/use-search-query";
import { IncidentStatusEnum } from "../schemas/incident.schema";
import { translateEnum } from "@/lib/translate";

export function IncidentStatusTabSearch() {
  const { setSearch } = useSearchQuery({
    currentPath: "/incidents",
    query: "status",
  });

  return (
    <TabField
      data={[
        "ALL",
        IncidentStatusEnum.REPORTED,
        IncidentStatusEnum.COMPLETED,
      ]}
      translateFn={translateEnum.incidentStatusEnum}
      onValueChange={setSearch}
    />
  );
}
