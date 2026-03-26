import { IncidentStatusEnum } from "@/features/incident/schemas/incident.schema";
import { TeamStaffStatusEnum } from "@/features/staff/schemas/team/team-staff.schema";

type PriorityTheme = {
  badge: string;
  border: string;
  text: string;
  bg: string;
};

type StatusTheme = {
  badge: string;
  text: string;
};

type TeamStaffStatusTheme = {
  badge: string;
  text: string;
  border: string;
  bg: string;
};

const theme = {
  incident: {
    priority: {
      1: {
        badge: "bg-red-100 text-red-600",
        border: "border-l-red-500",
        text: "text-red-600",
        bg: "bg-red-700 dark:bg-red-800",
      },
      2: {
        badge: "bg-orange-100 text-orange-600",
        border: "border-l-orange-500",
        text: "text-orange-600",
        bg: "bg-orange-700 dark:bg-orange-800",
      },
      3: {
        badge: "bg-yellow-100 text-yellow-700",
        border: "border-l-yellow-500",
        text: "text-yellow-700",
        bg: "bg-yellow-700 dark:bg-yellow-800",
      },
      4: {
        badge: "bg-green-100 text-green-600",
        border: "border-l-green-500",
        text: "text-green-600",
        bg: "bg-green-700 dark:bg-green-800",
      },
      5: {
        badge: "bg-gray-100 text-gray-600",
        border: "border-l-gray-400",
        text: "text-gray-600",
        bg: "bg-gray-700 dark:bg-gray-800",
      },
    } as Record<PriorityLevel, PriorityTheme>,
    status: {
      REPORTED: {
        badge: "bg-gray-100 text-gray-600",
        text: "text-gray-600",
      },
      IN_PROGRESS: {
        badge: "bg-blue-100 text-blue-600",
        text: "text-blue-600",
      },
      NEED_MORE_TEAMS: {
        badge: "bg-yellow-100 text-yellow-700",
        text: "text-yellow-700",
      },
      COMPLETED: {
        badge: "bg-green-100 text-green-600",
        text: "text-green-600",
      },
      CANCELLED: {
        badge: "bg-red-100 text-red-600",
        text: "text-red-600",
      },
    } as Record<IncidentStatusEnum, StatusTheme>,
  },
  team: {
    staffStatus: {
      AVAILABLE: {
        badge: "bg-green-100 text-green-600",
        text: "text-green-600",
        border: "border-l-green-500",
        bg: "bg-green-500/10", // modern style
      },
      ON_MISSION: {
        badge: "bg-blue-100 text-blue-600",
        text: "text-blue-600",
        border: "border-l-blue-500",
        bg: "bg-blue-500/10",
      },
    } as Record<TeamStaffStatusEnum, TeamStaffStatusTheme>,
  },
};

type PriorityLevel = 1 | 2 | 3 | 4 | 5;

export function getIncidentPriorityTheme(level?: number) {
  const priority = theme.incident.priority;
  const safeLevel = (level ?? 3) as PriorityLevel;
  return priority[safeLevel] ?? priority[3];
}

export function getIncidentStatusTheme(status: IncidentStatusEnum) {
  const statusTheme = theme.incident.status;
  return statusTheme[status] ?? statusTheme.REPORTED;
}

export function getTeamStaffStatusTheme(status: TeamStaffStatusEnum) {
  const staffStatus = theme.team.staffStatus;
  return staffStatus[status] ?? staffStatus.AVAILABLE;
}
