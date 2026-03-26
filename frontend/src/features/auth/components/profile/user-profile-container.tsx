import { LogOut, Pencil } from "lucide-react";
import { IUser, UserRoleEnum } from "../../schemas/user.schema";
import { LogoutButton } from "../logout-button";
import { UpdateProfileButton } from "./update-profile-button";
import { cn } from "@/lib/utils";
import {
  IIncident,
  IncidentStatusEnum,
} from "@/features/incident/schemas/incident.schema";

interface UserProfileContainerProps {
  className?: string;
  user: IUser;
  incidents: IIncident[];
}

export function UserProfileContainer({
  className,
  user,
  incidents,
}: UserProfileContainerProps) {
  const incidentsCompleted = incidents.reduce(
    (acc, incident) => {
      switch (incident.status) {
        case IncidentStatusEnum.COMPLETED:
          acc.completed += 1;
          break;
      }
      return acc;
    },
    {
      completed: 0,
    },
  ).completed;
  const incidentsTotal = incidents.length;

  return (
    <div
      className={cn(
        "min-h-screen bg-muted/40 pb-24 overflow-y-auto max-h-60 grid grid-cols-1 md:grid-cols-2 gap-2",
        className,
      )}
    >
      <div>
        {/* Header */}
        <div className="bg-linear-to-br from-primary to-primary/80 px-6 pt-8 pb-10 flex flex-col items-center gap-3 text-white">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full border-4 border-white/50 flex items-center justify-center text-3xl font-bold bg-primary/80">
            {user.fullName.charAt(0)}
          </div>

          {/* Name */}
          <h1 className="text-xl font-bold">{user.fullName}</h1>

          {/* Role */}
          <p className="text-white/80 text-sm">
            {user.role === UserRoleEnum.REPORTER
              ? "ผู้แจ้งเหตุ · นิสิต มข."
              : user.role === UserRoleEnum.STAFF
                ? `เจ้าหน้าที่ ${user.staffRole === "VOLUNTEER" ? "ประจํา" : ""}`
                : ""}
          </p>
        </div>

        {/* Stats */}
        <div className="px-4 -mt-6 flex gap-3">
          <div className="flex-1 bg-background dark:bg-muted rounded-2xl shadow p-4 text-center">
            <p className="text-primary text-2xl font-bold">
              {incidentsTotal}
            </p>
            <p className="text-muted-foreground text-sm">
              แจ้งเหตุทั้งหมด
            </p>
          </div>

          <div className="flex-1 bg-background dark:bg-muted rounded-2xl shadow p-4 text-center">
            <p className="text-green-500 text-2xl font-bold">
              {incidentsCompleted}
            </p>
            <p className="text-muted-foreground text-sm">เสร็จสิ้น</p>
          </div>
        </div>
      </div>

      <div>
        {/* Account Info */}
        <div className="px-4 mt-4">
          <div className="bg-background dark:bg-muted rounded-2xl shadow p-5 space-y-4">
            <h2 className="font-semibold text-muted-foreground text-center text-lg">
              ข้อมูลบัญชี
            </h2>

            {/* Email */}
            <div className="flex justify-between border-b pb-3">
              <span className="text-muted-foreground">อีเมล</span>
              <span className="font-medium">{user.email}</span>
            </div>

            {/* Phone */}
            <div className="flex justify-between border-b pb-3">
              <span className="text-muted-foreground">เบอร์โทร</span>
              <span className="font-medium">{user.phone}</span>
            </div>

            {/* Status */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">สถานะ</span>
              <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full">
                ยืนยันแล้ว ✓
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 mt-4 space-y-3">
          {/* Edit */}
          <UpdateProfileButton
            variant={"ghost"}
            size={"lg"}
            user={user}
            className="w-full border-2 border-orange-500 text-orange-600 rounded-xl py-6 flex items-center justify-center gap-2 font-medium hover:bg-orange-50 transition"
          >
            <Pencil className="size-4" />
            แก้ไขข้อมูล
          </UpdateProfileButton>

          {/* Logout */}

          <LogoutButton
            variant={"ghost"}
            size={"lg"}
            className="w-full border-2 border-red-500 text-red-500 rounded-xl py-6 text-md hover:bg-red-50 transition"
          >
            <div className="flex items-center gap-2">
              <LogOut />
              <span>ออกจากระบบ</span>
            </div>
          </LogoutButton>
        </div>
      </div>
    </div>
  );
}
