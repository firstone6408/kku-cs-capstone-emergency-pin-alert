import { ButtonNavigation } from "@/components/layout/navigation/buttom-navigation";
import { GoogleMap } from "@/components/shared/map/google-map";
import { Button } from "@/components/ui/button";
import { getIncidentList } from "@/features/incident/services/report-incident.service";
import { getAuthenticatedUser } from "@/lib/auth";
import { MapPinPlus } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const { token } = await getAuthenticatedUser();

  const incidents = await getIncidentList(token);

  // console.log(incidents);

  return (
    <div className="size-full border border-primary rounded-md overflow-hidden">
      <div className="absolute size-full pb-16 sm:pb-0">
        <Button
          asChild
          size={"lg"}
          className="absolute right-3 bottom-1/3 -translate-y-1/2 z-50"
        >
          <Link href="/reports/create">
            <MapPinPlus />
          </Link>
        </Button>
        <GoogleMap />
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="flex sm:hidden flex-col h-screen overflow-hidden">
        <nav className="shrink-0">
          <ButtonNavigation className="fixed bottom-0 left-0 w-full z-50" />
        </nav>
      </div>
    </div>
  );
}
