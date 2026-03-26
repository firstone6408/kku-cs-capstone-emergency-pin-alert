import { Header } from "@/components/shared/header/header";
import { MobileHeader } from "@/components/shared/header/mobile-header";
import { UserRoleEnum } from "@/features/auth/schemas/user.schema";
import { IncidentInProgressContainer } from "@/features/incident/components/container/incident-in-progress-container";
import { getIncidentStaffById } from "@/features/staff/services/staff-incident.service";
import { getAuthenticatedUser } from "@/lib/auth";
import { redirect } from "next/navigation";

interface IncidentInProgressPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function IncidentInProgressPage({
  params,
}: IncidentInProgressPageProps) {
  const { id } = await params;

  const { token, user } = await getAuthenticatedUser();

  const incidentDetail = await getIncidentStaffById(token, Number(id));

  if (!incidentDetail) {
    redirect(user.role === UserRoleEnum.REPORTER ? "/incidents" : "/");
  }

  return (
    <div>
      {/* Header */}
      <MobileHeader
        className="flex md:hidden"
        title="แจ้งเหตุฉุกเฉินของฉัน"
      />
      <Header className="hidden md:flex" title="แจ้งเหตุฉุกเฉิน" />

      {/* Content */}
      <IncidentInProgressContainer
        className="content-with-mobile-header"
        incidentDetail={incidentDetail}
      />
    </div>
  );
}
