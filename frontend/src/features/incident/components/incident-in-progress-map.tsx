"use client";

import { IIncident } from "../schemas/incident.schema";
import { GoogleMap } from "@/components/shared/map/google-map";

interface IncidentInProgressMapProps {
  incident: IIncident;
}

export function IncidentInProgressMap({
  incident,
}: IncidentInProgressMapProps) {
  return (
    <GoogleMap
      locations={[
        {
          latitude: incident.latitude,
          longitude: incident.longitude,
        },
      ]}
    />
  );
}
