import { Header } from "@/components/shared/header/header";
import { MobileHeader } from "@/components/shared/header/mobile-header";
import { getIncidentListByReport } from "@/features/incident/services/report-incident.service";
import { getAuthenticatedUser } from "@/lib/auth";

export default async function IncidentPage() {
  const { token } = await getAuthenticatedUser();

  const incidents = await getIncidentListByReport(token);

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
    </div>
  );
}
