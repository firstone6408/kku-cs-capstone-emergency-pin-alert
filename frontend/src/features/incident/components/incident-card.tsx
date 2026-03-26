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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ClipboardCopy } from "lucide-react";

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
      <CardFooter className="text-muted-foreground flex justify-between items-start">
        <span className="flex flex-col justify-end items-start gap-3">
          <p>📍 {format.truncateText(incident.address, 22)}</p>
          <p>📞 {incident.contactPhone}</p>
        </span>
        <span className="flex flex-col items-end">
          <p>{dateTime.getRelativeTime(new Date(incident.createdAt))}</p>
          <Button variant={"default"} size={"icon-lg"} asChild>
            <Link href={`/incidents/${incident.id}`}>
              <ClipboardCopy />
            </Link>
          </Button>
        </span>
      </CardFooter>
    </Card>
  );
}
