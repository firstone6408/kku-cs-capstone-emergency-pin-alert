import { cn } from "@/lib/utils";
import { ITeamStaff } from "../../schemas/team/team-staff.schema";
import { Separator } from "@/components/ui/separator";
import { TeamStaffCard } from "./team-staff-card";
import { CreateTeamStaffButton } from "./team-staff-mangement-action/create-team-staff-button";
import { ShieldUser, ShieldX } from "lucide-react";
import { LeaveTeamStaffButton } from "./team-staff-mangement-action/leave-theme-staff-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TeamStaffDetailCard } from "./team-saff-detail-card";
import { IUser } from "@/features/auth/schemas/user.schema";

interface TeamStaffManagementControllerProps {
  className?: string;
  teams: ITeamStaff[];
  myTeam: ITeamStaff | null;
  user: IUser;
}

export function TeamStaffManagementController({
  className,
  teams,
  myTeam,
  user,
}: TeamStaffManagementControllerProps) {
  // เอาทีมที่เราอยู่ปัจจุบันออก
  const fileredTeams = teams;

  return (
    <div className={cn("p-4 space-y-2", className)}>
      {/* My Team */}
      <section>
        <TeamStaffDetailCard team={myTeam} user={user} />
      </section>

      {/* Action Section */}
      <section>
        {myTeam ? (
          <LeaveTeamStaffButton
            size={"lg"}
            variant={"destructive"}
            className="w-full"
          >
            <span className="flex gap-1 items-center">
              <ShieldX />
              <span>ออกจากทีม</span>
            </span>
          </LeaveTeamStaffButton>
        ) : (
          <CreateTeamStaffButton size={"lg"} className="w-full">
            <ShieldUser />
            <span>สร้างทีม</span>
          </CreateTeamStaffButton>
        )}
      </section>

      <Separator />

      {/* Other Teams */}
      <section>
        <ScrollArea>
          <h2 className="text-muted-foreground py-3">ทีมอื่นๆ</h2>
          {fileredTeams.length > 0 ? (
            fileredTeams.map((team) => (
              <div key={team.id}>
                <TeamStaffCard
                  className="my-2"
                  team={team}
                  readonly={!!myTeam}
                />
              </div>
            ))
          ) : (
            <p>ไม่มีทีมอื่นๆ</p>
          )}
        </ScrollArea>
      </section>
    </div>
  );
}
