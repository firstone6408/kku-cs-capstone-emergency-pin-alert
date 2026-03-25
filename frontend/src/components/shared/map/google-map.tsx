"use client";

import { useDeviceLocation } from "@/hooks/use-device-location";
import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMapComponent,
} from "@vis.gl/react-google-maps";
import React from "react";

function Map() {
  const { isLoading, latitude, longitude } = useDeviceLocation();

  if (isLoading || !latitude || !longitude) {
    return <div>Loading...</div>;
  }

  const position = { lat: latitude, lng: longitude };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMapComponent
        defaultCenter={position}
        defaultZoom={10}
        mapId="DEMO_MAP_ID"
      >
        <AdvancedMarker position={position} />
      </GoogleMapComponent>
    </APIProvider>
  );
}

export const GoogleMap = React.memo(Map);
