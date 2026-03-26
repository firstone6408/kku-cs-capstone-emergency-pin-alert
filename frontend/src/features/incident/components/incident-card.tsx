import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IIncident } from "../schemas/incident.schema";
import { IncidentTypeBadge } from "@/features/incident-type/components/incident-type-badge";
import { IncidentStatusBadge } from "./incident-status-badge";
import { dateTime } from "@/lib/dateTime.utils";
import { format } from "@/lib/format";
import { cn } from "@/lib/utils";
import { getIncidentPriorityTheme } from "@/lib/theme";

interface IncidentCardProps {
  incident: IIncident;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const theme = getIncidentPriorityTheme(
    incident.incidentType.priorityLevel,
  );

  return (
    <Card
      className={cn(
        "relative rounded-xl shadow-sm border",
        "border-l-4",
        theme.border,
      )}
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <IncidentTypeBadge
            incidentType={incident.incidentType}
            className="text-md"
          />
          <IncidentStatusBadge incident={incident} />
        </CardTitle>
      </CardHeader>
      <CardContent className="font-bold text-lg">
        {incident.description}
      </CardContent>
      <CardFooter className="text-muted-foreground flex justify-between items-center">
        <p>📍 {format.truncateText(incident.address, 22)}</p>
        <p>{dateTime.getRelativeTime(new Date(incident.createdAt))}</p>
      </CardFooter>
    </Card>
  );
}
