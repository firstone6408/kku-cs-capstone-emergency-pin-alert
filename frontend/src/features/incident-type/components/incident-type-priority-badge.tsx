import { Badge } from "@/components/ui/badge";
import { IIncidentType } from "../schemas/incident-type.schema";
import { cn } from "@/lib/utils";
import { translateEnum } from "@/lib/translate";

interface IncidentTypePriorityBadgeProps {
  incidentType: IIncidentType;
}

const PRIORITY_CONFIG: Record<
  number,
  { label: string; className: string }
> = {
  1: {
    label: "สำคัญมาก",
    className: "bg-red-100 dark:bg-red-100/10 text-red-600",
  },
  2: {
    label: "สำคัญ",
    className: "bg-orange-100 dark:bg-orange-100/10 text-orange-600",
  },
  3: {
    label: "ปานกลาง",
    className: "bg-yellow-100 dark:bg-yellow-100/10 text-yellow-700",
  },
  4: {
    label: "น้อย",
    className:
      "bg-green-100 dark:bg-green-100/10 text-green-600 dark:text-green-400",
  },
  5: {
    label: "น้อยมาก",
    className:
      "bg-gray-100 dark:bg-gray-100/10 text-gray-600 dark:text-gray-400",
  },
};

export function IncidentTypePriorityBadge({
  incidentType,
}: IncidentTypePriorityBadgeProps) {
  const config =
    PRIORITY_CONFIG[incidentType.priorityLevel] ?? PRIORITY_CONFIG[3]; // fallback

  return (
    <Badge
      className={cn(
        "rounded-full px-2 py-0.5 text-xs font-medium",
        config.className,
      )}
    >
      {translateEnum.incidentTypePriorityLevel(
        incidentType.priorityLevel.toString(),
      )}
    </Badge>
  );
}
