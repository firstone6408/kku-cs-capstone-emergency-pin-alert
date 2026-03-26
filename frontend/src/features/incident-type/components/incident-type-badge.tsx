import { Badge } from "@/components/ui/badge";
import { IIncidentType } from "../schemas/incident-type.schema";
import { cn } from "@/lib/utils";
import { getIncidentPriorityTheme } from "@/lib/theme";

interface IncidentTypeBadgeProps {
  className?: string;
  incidentType: IIncidentType;
}

export function IncidentTypeBadge({
  className,
  incidentType,
}: IncidentTypeBadgeProps) {
  const theme = getIncidentPriorityTheme(incidentType.priorityLevel);

  return (
    <Badge
      className={cn(
        "rounded-full px-2 py-0.5 text-xs font-medium",
        theme.badge,
        className,
      )}
    >
      {incidentType.name}
    </Badge>
  );
}
