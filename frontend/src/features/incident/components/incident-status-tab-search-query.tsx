"use client";

import { TabField } from "@/components/shared/field/tab-field";
import { useSearchQuery } from "@/hooks/use-search-query";
import { IncidentStatusEnum } from "../schemas/incident.schema";
import { translateEnum } from "@/lib/translate";
import { UseSearchQueryParams } from "@/types/hooks/use-search-query";

interface IncidentStatusTabSearchQueryProps extends UseSearchQueryParams {
  className?: string;
}

export function IncidentStatusTabSearchQuery({
  className,
  ...props
}: IncidentStatusTabSearchQueryProps) {
  const { setSearch } = useSearchQuery(props);

  return (
    <TabField
      className={className}
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
