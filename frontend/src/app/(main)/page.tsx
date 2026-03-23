import { GoogleMap } from "@/components/shared/map/google-map";
import { getAuthenticatedUser } from "@/lib/auth";

export default async function HomePage() {
  const {} = await getAuthenticatedUser();

  return (
    <div className="w-full h-full">
      <GoogleMap />
    </div>
  );
}
