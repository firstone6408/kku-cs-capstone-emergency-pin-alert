import { ButtonNavigation } from "@/components/layout/navigation/buttom-navigation";
import { Header } from "@/components/shared/header/header";
import { MobileHeader } from "@/components/shared/header/mobile-header";
import { UserRoleEnum } from "@/features/auth/schemas/user.schema";
import { IncidentContainer } from "@/features/incident/components/container/incident-container";
import { IncidentManagementContainer } from "@/features/incident/components/container/incident-management-container";
import { getIncidentListByUser } from "@/features/incident/services/incident.service";
import { getAuthenticatedUser } from "@/lib/auth";
import { Fragment } from "react";

interface IncidentPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function IncidentPage({
  searchParams,
}: IncidentPageProps) {
  const { token, user } = await getAuthenticatedUser();

  const { status } = await searchParams;

  let incidents = await getIncidentListByUser(token, user);

  if (status && status !== "ALL") {
    incidents = incidents.filter((incident) => incident.status === status);
  }

  return (
    <Fragment>
      {/* Header */}
      <Header className="hidden md:flex" title="แจ้งเหตุฉุกเฉิน" />

      {/* Content */}
      {user.role === UserRoleEnum.REPORTER && (
        <Fragment>
          <MobileHeader
            className="flex md:hidden"
            title="แจ้งเหตุฉุกเฉินของฉัน"
          />
          <IncidentContainer
            className="content-with-mobile-header"
            incidents={incidents}
            user={user}
          />
        </Fragment>
      )}
      {user.role === UserRoleEnum.STAFF && (
        <Fragment>
          <IncidentManagementContainer user={user} incidents={incidents} />
          {/* Bottom Navigation (Mobile) */}
          <div className="flex sm:hidden flex-col h-screen overflow-hidden">
            <nav className="shrink-0">
              <ButtonNavigation className="fixed bottom-0 left-0 w-full z-50" />
            </nav>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
