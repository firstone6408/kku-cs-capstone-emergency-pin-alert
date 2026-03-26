"use client";

import React from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map as GoogleMapComponent,
} from "@vis.gl/react-google-maps";

export interface MapLocation {
  latitude: number;
  longitude: number;
  id?: string | number;
  label?: string;
}

interface MapProps {
  locations: MapLocation[];

  zoom?: number;
  className?: string;

  center?: {
    latitude: number;
    longitude: number;
  };

  renderMarker?: (loc: MapLocation, index: number) => React.ReactNode;

  onMarkerClick?: (loc: MapLocation, index: number) => void;

  // เพิ่ม: click บน map
  onMapClick?: (lat: number, lng: number) => void;
}

function Map({
  locations,
  zoom = 12,
  className,
  center,
  renderMarker,
  onMarkerClick,
  onMapClick,
}: MapProps) {
  if (!locations || locations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        No data
      </div>
    );
  }

  const mapCenter = center
    ? { lat: center.latitude, lng: center.longitude }
    : {
        lat: locations[0].latitude,
        lng: locations[0].longitude,
      };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMapComponent
        defaultCenter={mapCenter}
        defaultZoom={zoom}
        mapId="DEMO_MAP_ID"
        className={className ?? "w-full h-full"}
        onClick={(e) => {
          const lat = e.detail.latLng?.lat;
          const lng = e.detail.latLng?.lng;

          if (lat != null && lng != null) {
            onMapClick?.(lat, lng);
          }
        }}
      >
        {locations.map((loc, index) => {
          const position = {
            lat: loc.latitude,
            lng: loc.longitude,
          };

          return (
            <AdvancedMarker
              key={loc.id ?? index}
              position={position}
              onClick={() => onMarkerClick?.(loc, index)}
            >
              {renderMarker
                ? renderMarker(loc, index)
                : loc.label && (
                    <div className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs shadow">
                      {loc.label}
                    </div>
                  )}
            </AdvancedMarker>
          );
        })}
      </GoogleMapComponent>
    </APIProvider>
  );
}

export const GoogleMap = React.memo(Map);
