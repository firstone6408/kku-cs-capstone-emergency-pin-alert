import { ButtonNavigation } from "@/components/layout/navigation/buttom-navigation";
import { getIncidentListByUser } from "@/features/incident/services/incident.service";
import { MainGoogleMapContainer } from "@/features/map/components/main-google-map-container";
import { getAuthenticatedUser } from "@/lib/auth";
import { Fragment } from "react";

export default async function HomePage() {
  const { token, user } = await getAuthenticatedUser();

  const incidents = await getIncidentListByUser(token, user);

  return (
    <Fragment>
      <MainGoogleMapContainer incidents={incidents} user={user} />

      {/* Bottom Navigation (Mobile) */}
      <div className="flex sm:hidden flex-col h-screen overflow-hidden">
        <nav className="shrink-0">
          <ButtonNavigation className="fixed bottom-0 left-0 w-full z-50" />
        </nav>
      </div>
    </Fragment>
  );
}
