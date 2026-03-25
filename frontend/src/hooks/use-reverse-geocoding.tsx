import { useState, useCallback } from "react";

export function useReverseGeocoding() {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reverseGeocode = useCallback(
    async (location: { lat: number; lng: number }) => {
      if (!window.google) return;

      setLoading(true);
      setError(null);

      try {
        const geocoder = new window.google.maps.Geocoder();

        const response = await geocoder.geocode({
          location,
          language: "th",
        });

        if (response.results[0]) {
          const address = response.results[0].formatted_address;
          const cleanAddress = address?.replace(/^[A-Z0-9+]+\s/, "");
          setAddress(cleanAddress);
        } else {
          setAddress(null);
          setError("Address not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch address");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    address,
    loading,
    error,
    reverseGeocode,
  };
}
