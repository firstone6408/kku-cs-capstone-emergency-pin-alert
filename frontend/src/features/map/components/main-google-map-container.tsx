"use client";

import { GoogleMap } from "@/components/shared/map/google-map";
import { Button } from "@/components/ui/button";
import { IUser, UserRoleEnum } from "@/features/auth/schemas/user.schema";
import { IIncident } from "@/features/incident/schemas/incident.schema";
import { useDeviceLocation } from "@/hooks/use-device-location";
import { MapPinPlus } from "lucide-react";
import Link from "next/link";

interface MainGoogleMapContainerProps {
  incidents: IIncident[];
  user: IUser;
}

export function MainGoogleMapContainer({
  incidents,
  user,
}: MainGoogleMapContainerProps) {
  const { isLoading, latitude, longitude } = useDeviceLocation();

  if (isLoading || !latitude || !longitude) {
    return <div className="w-full h-full">Loading map...</div>;
  }

  const locations = [
    {
      latitude,
      longitude,
    },
    ...[
      ...incidents.map((incident) => ({
        latitude: incident.latitude,
        longitude: incident.longitude,
      })),
    ],
  ];

  return (
    <div className="absolute size-full pb-16 sm:pb-0 border border-primary rounded-md overflow-hidden">
      <Button
        asChild
        size={"lg"}
        className="absolute right-3 bottom-1/3 -translate-y-1/2 z-50"
      >
        {user.role === UserRoleEnum.REPORTER && (
          <Link href="/incidents/create">
            <MapPinPlus />
          </Link>
        )}
      </Button>
      <GoogleMap
        locations={locations}
        // onMarkerClick={(loc, index) => console.log("click", loc, index)}
        // renderMarker={(loc, i) => (
        //   <div className="bg-primary text-primary-foreground px-2 py-1 rounded"></div>
        // )}
      />
    </div>
  );
}
