import { Header } from "@/components/shared/header/header";
import { MobileHeader } from "@/components/shared/header/mobile-header";
import { UserRoleEnum } from "@/features/auth/schemas/user.schema";
import { IncidentDetailContainer } from "@/features/incident/components/container/incident-detail-container";
import { getIncidentById } from "@/features/incident/services/incident.service";
import { getAuthenticatedUser } from "@/lib/auth";
import { redirect } from "next/navigation";

interface IncidentDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function IncidentDetailPage({
  params,
}: IncidentDetailsPageProps) {
  const { token, user } = await getAuthenticatedUser();
  const { id } = await params;

  const incident = await getIncidentById(token, Number(id));

  if (!incident) {
    redirect(user.role === UserRoleEnum.REPORTER ? "/incidents" : "/");
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
      <IncidentDetailContainer
        className="content-with-mobile-header"
        incident={incident}
      />
    </div>
  );
}
