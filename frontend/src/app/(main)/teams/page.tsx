import { Header } from "@/components/shared/header/header";
import { MobileHeader } from "@/components/shared/header/mobile-header";
import { UserRoleEnum } from "@/features/auth/schemas/user.schema";
import { TeamStaffManagementController } from "@/features/staff/components/team/team-staff-management-controller";
import {
  getMyTeamStaff,
  getTeamStaffList,
} from "@/features/staff/services/staff-team.service";
import { getAuthenticatedUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TeamManagementPage() {
  const { token, user } = await getAuthenticatedUser();

  if (user.role !== UserRoleEnum.STAFF) {
    redirect("/");
  }

  const [teams, myTeam] = await Promise.all([
    getTeamStaffList(token),
    getMyTeamStaff(token, user),
  ]);

  return (
    <div>
      {/* Header */}
      <MobileHeader className="flex md:hidden" title="จัดการทีมของฉัน" />
      <Header className="hidden md:flex" title="จัดการทีมของฉัน" />

      {/* Content */}
      <TeamStaffManagementController
        className="content-with-mobile-header"
        teams={teams}
        myTeam={myTeam}
        user={user}
      />
    </div>
  );
}
