"use client";

import { IIncidentType } from "@/features/incident-type/schemas/incident-type.schema";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { TextareaField } from "@/components/shared/field/textarea-field";
import { InputField } from "@/components/shared/field/input-field";
import { IUser } from "@/features/auth/schemas/user.schema";
import { ReportIncidentFormObject } from "../report-incident-container";
import { ObjectStateSetter } from "@/types/hooks/use-object-state";
import { useEffect } from "react";
import { useReverseGeocoding } from "@/hooks/use-reverse-geocoding";
import { useMediaUploadField } from "@/hooks/use-media-field";

interface ReportDetailStepProps {
  user: IUser;
  location: {
    lat: number;
    lng: number;
  };
  incidentType: IIncidentType;
  reportIncidentFormObject: ReportIncidentFormObject;
  setReportIncidentFormObject: ObjectStateSetter<ReportIncidentFormObject>;
}

export function ReportIncidentDetailStep({
  user,
  location,
  incidentType,
  reportIncidentFormObject,
  setReportIncidentFormObject,
}: ReportDetailStepProps) {
  const { address, reverseGeocode } = useReverseGeocoding();
  const { MediaField, handleMediaChange, mediaFiles } =
    useMediaUploadField();

  useEffect(() => {
    reverseGeocode(location);
  }, [reverseGeocode, location, address]);

  useEffect(() => {
    setReportIncidentFormObject("location", {
      lat: location.lat,
      lng: location.lng,
    });
    setReportIncidentFormObject("contactPhone", user.phone);
    if (address) {
      setReportIncidentFormObject("address", address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.lat, location.lng, address]);

  useEffect(() => {
    setReportIncidentFormObject("files", mediaFiles);
    // console.log(reportIncidentFormObject);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaFiles]);

  return (
    <div className="space-y-4">
      {/* Selected Incident */}
      <Card className="border-primary bg-primary/10">
        <CardContent className="text-md font-medium">
          ประเภทเหตุการณ์: {incidentType.name}
        </CardContent>
      </Card>

      {/* Description */}
      <TextareaField
        label="รายละเอียดเหตุการณ์"
        placeholder="รถชนประตูหลัก อาคาร 1 บาดเจ็บ 1 คน..."
        className="min-h-30"
        onChange={(event) =>
          setReportIncidentFormObject("description", event.target.value)
        }
        required
      />

      {/* Phone */}
      <InputField
        label="เบอร์ติดต่อ"
        type="number"
        placeholder="08xxxxxxxx"
        defaultValue={reportIncidentFormObject.contactPhone || user.phone}
        onChange={(event) =>
          setReportIncidentFormObject("contactPhone", event.target.value)
        }
        className="w-full"
        required
      />

      {/* Media */}
      <MediaField
        label="รูปภาพ"
        placeholder="อัพโหลดหลักฐาน เช่น รูปภาพ วิดีโอ เสียง"
        multiple
        onChange={handleMediaChange}
        defaultFiles={reportIncidentFormObject.files || []}
        required
      />

      {/* Location */}
      <Card className="border-primary/30 bg-primary/10">
        <CardContent className="p-4 flex items-start gap-3">
          <MapPin className="w-5 h-5 text-primary mt-1" />

          <div>
            <p className="font-medium text-primary">ตำแหน่งปัจจุบัน</p>
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
