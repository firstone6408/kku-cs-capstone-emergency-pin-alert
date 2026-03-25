"use client";

import { IUser } from "@/features/auth/schemas/user.schema";
import { ReportIncidentFormObject } from "../report-incident-container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IncidentTypePriorityBadge } from "@/features/incident-type/components/incident-type-priority-badge";
import { MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useMediaUploadField } from "@/hooks/use-media-field";

interface ReportIncidentConfirmStepProps {
  user: IUser;
  reportIncidentFormObject: ReportIncidentFormObject;
}

export function ReportIncidentConfirmStep({
  reportIncidentFormObject,
}: ReportIncidentConfirmStepProps) {
  const { MediaField } = useMediaUploadField();

  if (!reportIncidentFormObject.incidentType) return null;

  return (
    <Card className="rounded-2xl m-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          สรุปการแจ้งเหตุ
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Incident Type */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">ประเภทเหตุการณ์</span>
          <span className="font-medium">
            {reportIncidentFormObject.incidentType.name}
          </span>
        </div>

        <Separator />

        {/* Priority */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">ลำดับความสำคัญ</span>
          <IncidentTypePriorityBadge
            incidentType={reportIncidentFormObject.incidentType}
          />
        </div>

        <Separator />

        {/* Description */}
        <div className="space-y-1">
          <p className="text-muted-foreground">รายละเอียด</p>
          <p className="font-medium leading-relaxed">
            {reportIncidentFormObject.description || "-"}
          </p>
        </div>

        <Separator />

        {/* Phone */}
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">เบอร์ติดต่อ</span>
          <span className="font-medium">
            {reportIncidentFormObject.contactPhone || "-"}
          </span>
        </div>

        <Separator />

        {/* Location */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
          <div className="space-y-1">
            <p className="text-muted-foreground">ตำแหน่ง</p>
            <p className="font-medium leading-relaxed">
              {reportIncidentFormObject.address || "-"}
            </p>
          </div>
        </div>

        {/* Preview Files */}
        <div className="space-y-1">
          <p className="text-muted-foreground">หลักฐาน</p>
          <MediaField
            defaultFiles={reportIncidentFormObject.files}
            disabled
          />
        </div>
      </CardContent>
    </Card>
  );
}
