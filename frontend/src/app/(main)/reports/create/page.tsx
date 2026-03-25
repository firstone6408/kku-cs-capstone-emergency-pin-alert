import { Header } from "@/components/shared/header/header";
import { MobileHeader } from "@/components/shared/header/mobile-header";
import { getIncidentTypeList } from "@/features/incident-type/services/incident-type.service";
import { ReportIncidentContainer } from "@/features/incident/components/report/report-incident-container";
import { getAuthenticatedUser } from "@/lib/auth";

export default async function CreateReportPage() {
  const { token, user } = await getAuthenticatedUser();

  const incidentTypes = await getIncidentTypeList(token);

  return (
    <div>
      {/* Header */}
      <MobileHeader
        className="flex md:hidden"
        title="แจ้งเหตุฉุกเฉิน"
        href="/"
      />
      <Header className="hidden md:flex" title="แจ้งเหตุฉุกเฉิน" />

      {/* Content */}
      <ReportIncidentContainer
        className="content-with-mobile-header"
        incidentTypes={incidentTypes}
        user={user}
      />
    </div>
  );
}
