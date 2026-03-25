"use client";

import React from "react";
import {
  GoogleMap as GoogleMapComponent,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import { useDeviceLocation } from "@/hooks/use-device-location";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const { latitude, longitude, isLoading } = useDeviceLocation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded || isLoading) {
    return <div className="w-full h-full">Loading map...</div>;
  }

  if (!latitude || !longitude) {
    return <div className="w-full h-full">Loading map...</div>;
  }

  const center = { lat: latitude, lng: longitude };

  return (
    <GoogleMapComponent
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      <Marker position={center} />
    </GoogleMapComponent>
  );
}

export const GoogleMap = React.memo(Map);
