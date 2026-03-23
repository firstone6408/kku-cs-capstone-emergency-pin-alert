import { BaseCard } from "@/components/shared/card/base-card";
import { IUser } from "@/features/auth/schemas/user.schema";
import { ReporterListManagementTable } from "./reporter-list-management-table";
import { UpsertReporterManagementButton } from "./reporter-management-action";
import { UserIcon } from "lucide-react";

interface ReporterManagementContainerProps {
  reporters: IUser[];
}

export function ReporterManagementContainer({
  reporters,
}: ReporterManagementContainerProps) {
  return (
    <BaseCard
      card={{
        container: true,
        content: true,
      }}
      content={
        <div className="p-2 space-y-2">
          <UpsertReporterManagementButton
            size={"lg"}
            actionType="create"
            reporter={null}
            passwordRequired
          >
            <UserIcon />
            <span>เพิ่มผู้แจ้งเหตุ</span>
          </UpsertReporterManagementButton>
          <ReporterListManagementTable reporters={reporters} />
        </div>
      }
    />
  );
}
