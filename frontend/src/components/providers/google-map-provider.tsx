import { APIProvider } from "@vis.gl/react-google-maps";

interface GoogleMapProviderProps {
  children: React.ReactNode;
}

export function GoogleMapProvider({ children }: GoogleMapProviderProps) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      {children}
    </APIProvider>
  );
}
