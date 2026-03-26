import { cn } from "@/lib/utils";
import {
  IIncidentStaff,
  IncidentStatusEnum,
} from "../../schemas/incident.schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Plus, User, BookMarked } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IncidentStatusBadge } from "../incident-status-badge";
import { getIncidentStatusTheme } from "@/lib/theme";
import { IncidentInProgressMap } from "../incident-in-progress-map";
import { RequestMoreTeamsIncidentStaffButton } from "@/features/staff/components/incident/action/request-more-teams-incident-staff-button";
import { CompleteIncidentStaffButton } from "@/features/staff/components/incident/action/complete-incident-staff-button";
import { translateEnum } from "@/lib/translate";

interface IncidentInProgressContainerProps {
  className?: string;
  incidentDetail: IIncidentStaff;
}

export function IncidentInProgressContainer({
  className,
  incidentDetail,
}: IncidentInProgressContainerProps) {
  const theme = getIncidentStatusTheme(incidentDetail.incident.status);

  return (
    <div className={cn("p-4 space-y-4", className)}>
      {/* Status Card */}
      <Card
        className={cn("border bg-muted/30 backdrop-blur p-0", theme.badge)}
      >
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <MapPin className="size-5 text-primary" />
            </div>

            <div>
              <p className="font-semibold text-foreground">
                สถานะ:{" "}
                {translateEnum.incidentStatusEnum(
                  incidentDetail.incident.status,
                )}
              </p>
              {/* <p className="text-sm text-muted-foreground">
                รับภารกิจเมื่อ{" "}
                {dateTime.getRelativeTime(
                  new Date(incidentDetail.incident.updatedAt),
                )}
              </p> */}
            </div>
          </div>

          <Badge variant="secondary">Live</Badge>
        </CardContent>
      </Card>

      {/* Map Placeholder */}
      <Card className="overflow-hidden">
        <div className="relative h-[300px] w-full bg-muted flex items-center justify-center">
          <div className="size-full">
            <IncidentInProgressMap incident={incidentDetail.incident} />
          </div>

          <Button
            size="sm"
            variant="secondary"
            className="absolute bottom-3 right-3"
          >
            ขยายแผนที่ →
          </Button>
        </div>
      </Card>

      {/* Team Section */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="size-5 text-primary" />
              <p className="font-semibold text-foreground">
                ทีมอาสา ({incidentDetail.assignments.length} ทีม)
              </p>
            </div>

            <IncidentStatusBadge incident={incidentDetail.incident} />
          </div>

          <div className="flex flex-wrap gap-2">
            {incidentDetail.assignments.map((assignment) =>
              assignment.team.members.map((member) => (
                <Badge
                  key={member.id}
                  variant="secondary"
                  className="h-8 bg-primary/10"
                >
                  <User size={20} />
                  <span>{member.staff.fullName}</span>
                </Badge>
              )),
            )}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      {incidentDetail.incident.status === IncidentStatusEnum.IN_PROGRESS ||
        (incidentDetail.incident.status ===
          IncidentStatusEnum.NEED_MORE_TEAMS && (
          <div className="flex justify-between items-center gap-3">
            <div className="w-full">
              <RequestMoreTeamsIncidentStaffButton
                incident={incidentDetail.incident}
                variant="outline"
                className="flex-1 flex items-center gap-2 w-full"
                size={"lg"}
              >
                <Plus className="size-4" />
                <span>ขอทีมเพิ่ม</span>
              </RequestMoreTeamsIncidentStaffButton>
            </div>

            <div className="w-full">
              <CompleteIncidentStaffButton
                incident={incidentDetail.incident}
                className="w-full"
                size={"lg"}
              >
                <span className="flex-1 flex items-center gap-2">
                  <BookMarked className="size-4" />
                  <span>ช่วยสำเร็จ</span>
                </span>
              </CompleteIncidentStaffButton>
            </div>
          </div>
        ))}
    </div>
  );
}
