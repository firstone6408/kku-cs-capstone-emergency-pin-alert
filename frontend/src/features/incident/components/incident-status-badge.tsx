import { Badge } from "@/components/ui/badge";
import { IIncident } from "../schemas/incident.schema";
import { translateEnum } from "@/lib/translate";
import { getIncidentStatusTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface IncidentStatusBadgeProps {
  className?: string;
  incident: IIncident;
}

export function IncidentStatusBadge({
  className,
  incident,
}: IncidentStatusBadgeProps) {
  const theme = getIncidentStatusTheme(incident.status);

  return (
    <Badge
      className={cn(
        "rounded-full px-2 py-0.5 text-xs font-medium",
        theme.badge,
        className,
      )}
    >
      {translateEnum.incidentStatusEnum(incident.status)}
    </Badge>
  );
}
