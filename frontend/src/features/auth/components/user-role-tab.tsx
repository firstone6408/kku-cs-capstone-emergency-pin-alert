import { translateEnum } from "@/lib/translate";
import { UserRoleEnum } from "../schemas/user.schema";
import { TabField } from "@/components/shared/field/tab-field";

interface UserRoleTabProps {
  tab: UserRoleEnum;
  setTab: (value: UserRoleEnum) => void;
  className?: string;
}

export function UserRoleTab({
  tab,
  setTab,
  className = "px-4",
}: UserRoleTabProps) {
  return (
    <TabField
      value={tab}
      onValueChange={(value) => setTab(value as UserRoleEnum)}
      data={UserRoleEnum}
      className={className}
      translateFn={translateEnum.userRoleEnum}
    />
  );
}
