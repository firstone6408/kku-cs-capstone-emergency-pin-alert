import { IncidentStatusEnum } from "@/features/incident/schemas/incident.schema";

type PriorityTheme = {
  badge: string;
  border: string;
  text: string;
};

type StatusTheme = {
  badge: string;
  text: string;
};

const theme = {
  incident: {
    priority: {
      1: {
        badge: "bg-red-100 text-red-600",
        border: "border-l-red-500",
        text: "text-red-600",
      },
      2: {
        badge: "bg-orange-100 text-orange-600",
        border: "border-l-orange-500",
        text: "text-orange-600",
      },
      3: {
        badge: "bg-yellow-100 text-yellow-700",
        border: "border-l-yellow-500",
        text: "text-yellow-700",
      },
      4: {
        badge: "bg-green-100 text-green-600",
        border: "border-l-green-500",
        text: "text-green-600",
      },
      5: {
        badge: "bg-gray-100 text-gray-600",
        border: "border-l-gray-400",
        text: "text-gray-600",
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
