import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Fragment } from "react";
import { ITeamStaff } from "../../schemas/team/team-staff.schema";
import { Separator } from "@/components/ui/separator";
import { TeamStaffStatusBadge } from "./team-staff-status-badge";
import { TeamStaffMemberCard } from "./team-staff-member-card";
import { IUser } from "@/features/auth/schemas/user.schema";

interface TeamStaffDetailCardProps {
  team: ITeamStaff | null;
  user: IUser;
}

export function TeamStaffDetailCard({
  team,
  user,
}: TeamStaffDetailCardProps) {
  return (
    <Card className="ring-1 ring-primary/50 shadow-sm">
      {team ? (
        <Fragment>
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle>{team.name}</CardTitle>
              <CardDescription>ทีมปัจจุบันของคุณ</CardDescription>
            </div>
            <TeamStaffStatusBadge team={team} />
          </CardHeader>
          <Separator />
          <CardContent className="flex flex-col gap-2">
            {/* Member */}
            {team.members.map((member) => (
              <TeamStaffMemberCard
                key={member.id}
                member={member}
                me={user}
                leader={team.members[0]}
              />
            ))}
          </CardContent>
        </Fragment>
      ) : (
        <CardHeader>
          <CardTitle>คุณยังไม่มีทีม</CardTitle>
          <CardDescription>คุณยังไม่ได้เป็นสมาชิกในทีม</CardDescription>
        </CardHeader>
      )}
    </Card>
  );
}
