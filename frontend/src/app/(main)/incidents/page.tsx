import { Header } from "@/components/shared/header/header";
import { MobileHeader } from "@/components/shared/header/mobile-header";
import { IncidentContainer } from "@/features/incident/components/incident-container";
import { getIncidentListByReport } from "@/features/incident/services/report-incident.service";
import { getAuthenticatedUser } from "@/lib/auth";

interface IncidentPageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function IncidentPage({
  searchParams,
}: IncidentPageProps) {
  const { token } = await getAuthenticatedUser();

  const { status } = await searchParams;

  let incidents = await getIncidentListByReport(token);

  if (status && status !== "ALL") {
    incidents = incidents.filter((incident) => incident.status === status);
  }

  return (
    <div>
      {/* Header */}
      <MobileHeader
        className="flex md:hidden"
        title="แจ้งเหตุฉุกเฉินของฉัน"
        href="/"
      />
      <Header className="hidden md:flex" title="แจ้งเหตุฉุกเฉิน" />

      {/* Content */}
      <IncidentContainer
        className="content-with-mobile-header"
        incidents={incidents}
      />
    </div>
  );
}
