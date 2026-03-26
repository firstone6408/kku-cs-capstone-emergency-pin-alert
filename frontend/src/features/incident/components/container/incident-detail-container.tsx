import { getIncidentPriorityTheme } from "@/lib/theme";
import { IIncident } from "../../schemas/incident.schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { dateTime } from "@/lib/dateTime.utils";
import {
  User,
  Phone,
  Pencil,
  TrafficCone,
  Check,
  MessageSquareText,
  Pill,
} from "lucide-react";
import { IncidentStatusBadge } from "../incident-status-badge";
import { cn } from "@/lib/utils";
import {
  MediaField,
  MediaType,
} from "@/components/shared/field/media-field";

interface IncidentDetailContainerProps {
  className?: string;
  incident: IIncident;
}

export function IncidentDetailContainer({
  className,
  incident,
}: IncidentDetailContainerProps) {
  const theme = getIncidentPriorityTheme(
    incident.incidentType.priorityLevel,
  );

  return (
    <div className={cn("p-4 space-y-3", className)}>
      {/* Header */}
      <Card className={`${theme.bg} text-primary-foreground border-none`}>
        <CardContent className="space-y-3 p-5">
          <div className="flex justify-between items-center">
            <span className="text-sm bg-primary-foreground/20 px-3 py-1 rounded-full">
              {incident.incidentType.name}
            </span>

            <span className="text-sm bg-primary-foreground/20 px-3 py-1 rounded-full">
              #{incident.incidentCode}
            </span>
          </div>

          <h1 className="text-xl font-bold">{incident.description}</h1>

          <p className="text-sm opacity-90">
            📍 {incident.address} ·{" "}
            {dateTime.getRelativeTime(new Date(incident.createdAt))}
          </p>
        </CardContent>
      </Card>

      {/* Detail */}
      <Card>
        <CardContent className="px-3 space-y-4">
          {/* Reporter */}
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <User className="size-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  ผู้แจ้งเหตุ
                </p>
                <p className="font-semibold">
                  {incident.reporter.fullName}
                </p>
              </div>
            </div>

            <Button size="sm" variant="secondary" className="gap-2">
              <Phone size={16} />
              โทร
            </Button>
          </div>

          {/* Description */}
          <div className="border-t pt-3 space-y-2">
            <div className="flex gap-3 items-start">
              <Pencil className="size-5 text-muted-foreground mt-1" />
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">รายละเอียด</p>
                <p>{incident.description}</p>
              </div>
            </div>
          </div>

          {/* หลักฐาน */}
          <div className="border-t pt-3 space-y-2">
            <div className="flex gap-3 items-start">
              <Pill className="size-5 text-muted-foreground mt-1" />
              <div className="space-y-1 w-full">
                <p className="text-sm text-muted-foreground">หลักฐาน</p>
                <MediaField
                  existingMedia={incident.evidence.map((e) => ({
                    id: e.id.toString(),
                    url: e.fileUrl,
                    type: e.fileType.toLowerCase() as MediaType,
                  }))}
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="border-t pt-3 flex items-center gap-3">
            <TrafficCone className="size-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">สถานะ</p>
              <IncidentStatusBadge incident={incident} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ทีม */}
      <Card>
        <CardContent className="p-5 space-y-3">
          <div className="flex justify-between">
            <p className="font-semibold">ทีมที่รับภารกิจ</p>
            <p className="text-muted-foreground">
              0 / {incident.maxTeams} ทีม
            </p>
          </div>

          <p className="text-sm text-muted-foreground text-center py-6">
            ยังไม่มีทีมรับภารกิจ
          </p>
        </CardContent>
      </Card>

      {/* Action */}
      <div className="space-y-2">
        <Button className="w-full h-12 text-base">
          <Check />
          รับภารกิจนี้
        </Button>

        <Button variant="outline" className="w-full h-12 text-base">
          <MessageSquareText />
          ดูแชท
        </Button>
      </div>
    </div>
  );
}
