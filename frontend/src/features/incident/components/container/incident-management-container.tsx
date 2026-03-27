import { cn } from "@/lib/utils";
import { IIncident } from "../../schemas/incident.schema";
import { IUser } from "@/features/auth/schemas/user.schema";
import { IncidentStat } from "../incident-stat";
import { Button } from "@/components/ui/button";
import { Bell, Users } from "lucide-react";
import { IncidentStatusTabSearchQuery } from "../incident-status-tab-search-query";
import { IncidentCard } from "../incident-card";
import Link from "next/link";

interface IncidentManagementContainerProps {
  className?: string;
  user: IUser;
  incidents: IIncident[];
}

export function IncidentManagementContainer({
  className,
  user,
  incidents,
}: IncidentManagementContainerProps) {
  return (
    <div className={cn("", className)}>
      {/* Header */}
      <section className="bg-primary/80 text-primary-foreground p-4 pb-6 rounded-b-3xl">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm opacity-90">
              สวัสดี, ทีม {user.fullName}
            </p>
            <h1 className="text-2xl font-bold mt-1">Dashboard</h1>
          </div>

          {/* Notification */}
          <Button size="icon" variant="secondary" className="relative">
            <Bell />
            <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs px-1.5 rounded-full">
              3
            </span>
          </Button>
        </div>

        <IncidentStat incidents={incidents} />
      </section>

      {/* Content */}
      <section className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg">รายการแจ้งเหตุ</h2>

          <Button variant="outline" size="sm" asChild>
            <Link href="/teams">
              <Users />
              <span>ทีมของฉัน</span>
            </Link>
          </Button>
        </div>

        {/* Filter */}
        <div>
          <IncidentStatusTabSearchQuery
            className="w-full"
            currentPath="/incidents"
            query="status"
          />
        </div>

        {/* List */}
        <div className="space-y-3">
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <div key={incident.id} className="m-1">
                <IncidentCard incident={incident} user={user} />
              </div>
            ))
          ) : (
            <p>ไม่พบเหตุฉุกเฉิน</p>
          )}
        </div>
      </section>
    </div>
  );
}
