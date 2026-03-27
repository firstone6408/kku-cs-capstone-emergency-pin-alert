import { IIncident } from "../../schemas/incident.schema";
import { cn } from "@/lib/utils";
import { IncidentStatusTabSearchQuery } from "../incident-status-tab-search-query";
import { IncidentCard } from "../incident-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IUser } from "@/features/auth/schemas/user.schema";

interface IncidentContainerProps {
  className?: string;
  incidents: IIncident[];
  user: IUser;
}

export function IncidentContainer({
  className,
  incidents,
  user,
}: IncidentContainerProps) {
  return (
    <div className={cn(className)}>
      {/* filter incident by status */}
      <IncidentStatusTabSearchQuery
        currentPath="/incidents"
        query="status"
      />

      {/* list of incidents */}
      <ScrollArea className="p-4 overflow-y-auto h-[calc(100vh-150px)]">
        {incidents.length > 0 ? (
          incidents.map((incident) => (
            <div key={incident.id} className="m-1">
              <IncidentCard incident={incident} user={user} />
            </div>
          ))
        ) : (
          <p>ไม่พบเหตุฉุกเฉิน</p>
        )}
      </ScrollArea>
    </div>
  );
}
