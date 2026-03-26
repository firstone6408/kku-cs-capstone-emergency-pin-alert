import { Badge } from "@/components/ui/badge";
import { ITeamStaff } from "../../schemas/team/team-staff.schema";
import { translateEnum } from "@/lib/translate";
import { getTeamStaffStatusTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface TeamStaffStatusBadgeProps {
  className?: string;
  team: ITeamStaff;
}

export function TeamStaffStatusBadge({
  className,
  team,
}: TeamStaffStatusBadgeProps) {
  const theme = getTeamStaffStatusTheme(team.status);

  return (
    <Badge
      className={cn(
        "rounded-full px-2 py-0.5 text-xs font-medium",
        theme.badge,
        className,
      )}
    >
      {translateEnum.teamStaffStatusEnum(team.status)}
    </Badge>
  );
}
