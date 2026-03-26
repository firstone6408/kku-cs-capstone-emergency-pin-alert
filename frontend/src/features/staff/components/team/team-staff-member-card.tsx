import { cn } from "@/lib/utils";
import { ITeamStaffMember } from "../../schemas/team/team-staff.schema";
import { KickMemberTeamStaffButton } from "./team-staff-mangement-action/kick-member-team-staff-button";
import { UserRoundX } from "lucide-react";
import { IUser } from "@/features/auth/schemas/user.schema";

interface TeamStaffMemberCardProps {
  className?: string;
  member: ITeamStaffMember;
  me: IUser;
  leader: ITeamStaffMember;
}

export function TeamStaffMemberCard({
  className,
  member,
  me,
  leader,
}: TeamStaffMemberCardProps) {
  const isLeader = member.id === leader.id;
  const isMe = member.staff.id === me.id;
  const canKick = !isLeader && !isMe;

  return (
    <div
      key={member.id}
      className={cn(
        "flex items-center justify-between p-3 rounded-xl",
        isLeader ? "bg-primary/10" : "bg-muted",
        className,
      )}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className={cn(
            "size-10 flex items-center justify-center rounded-full text-white font-semibold",
            isLeader
              ? "bg-primary"
              : "bg-muted-foreground/30 text-foreground",
          )}
        >
          {member.staff.fullName.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div>
          <p className="font-medium">
            {member.staff.fullName} {isMe && "(คุณ)"}
          </p>

          <p className="text-sm text-muted-foreground">
            {isLeader ? "👑 หัวหน้าทีม" : "สมาชิก"}
          </p>
        </div>
      </div>

      {/* Right */}
      {canKick && (
        <KickMemberTeamStaffButton
          member={member}
          size={"icon-lg"}
          variant={"destructive"}
        >
          <UserRoundX />
        </KickMemberTeamStaffButton>
      )}
    </div>
  );
}
