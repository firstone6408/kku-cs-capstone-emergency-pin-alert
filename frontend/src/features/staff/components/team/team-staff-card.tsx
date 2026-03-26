import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ITeamStaff,
  TeamStaffStatusEnum,
} from "../../schemas/team/team-staff.schema";
import { TeamStaffStatusBadge } from "./team-staff-status-badge";
import { cn } from "@/lib/utils";
import { getTeamStaffStatusTheme } from "@/lib/theme";
import { JoinTeamStaffButton } from "./team-staff-mangement-action/join-team-staff-button";
import { ShieldPlus } from "lucide-react";

interface TeamStaffCardProps {
  className?: string;
  readonly?: boolean;
  team: ITeamStaff;
}

export function TeamStaffCard({
  className,
  readonly = false,
  team,
}: TeamStaffCardProps) {
  const theme = getTeamStaffStatusTheme(team.status);

  return (
    <Card
      className={cn(
        "relative rounded-xl shadow-sm border mx-1",
        "border-l-4",
        theme.border,
        className,
      )}
    >
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{team.name}</CardTitle>
        <TeamStaffStatusBadge team={team} />
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <p className="text-muted-foreground text-xs flex gap-1">
          <span>{team.members.length} คน</span>
          <span>/</span>
          <span>ภารกิจ: #INC-00246</span>
        </p>
        {!readonly && team.status === TeamStaffStatusEnum.AVAILABLE && (
          <JoinTeamStaffButton size={"icon"} team={team}>
            <ShieldPlus />
          </JoinTeamStaffButton>
        )}
      </CardContent>
    </Card>
  );
}
