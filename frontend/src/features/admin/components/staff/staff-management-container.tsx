import { BaseCard } from "@/components/shared/card/base-card";
import { IUser } from "@/features/auth/schemas/user.schema";
import { StaffListManagementTable } from "./staff-list-management-table";
import { UpsertStaffManagementButton } from "./staff-management-action";
import { UserIcon } from "lucide-react";

interface StaffManagementContainerProps {
  staffs: IUser[];
}

export function StaffManagementContainer({
  staffs,
}: StaffManagementContainerProps) {
  return (
    <BaseCard
      card={{
        container: true,
        content: true,
      }}
      content={
        <div className="p-2 space-y-2">
          <UpsertStaffManagementButton
            size={"lg"}
            actionType="create"
            staff={null}
            passwordRequired
          >
            <UserIcon />
            <span>เพิ่มเจ้าหน้าที่</span>
          </UpsertStaffManagementButton>
          <StaffListManagementTable staffs={staffs} />
        </div>
      }
    />
  );
}
