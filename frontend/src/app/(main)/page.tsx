import { GoogleMap } from "@/components/shared/map/google-map";
import { getAuthenticatedUser } from "@/lib/auth";

export default async function HomePage() {
  const {} = await getAuthenticatedUser();

  return (
    <div className="size-full border border-primary rounded-md overflow-hidden">
      <GoogleMap />
    </div>
  );
}
