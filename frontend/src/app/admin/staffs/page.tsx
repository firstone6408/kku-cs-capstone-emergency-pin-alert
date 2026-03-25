import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { StaffManagementContainer } from "@/features/admin/components/staff/staff-management-container";
import { getStaffList } from "@/features/admin/services/staff-admin.service";
import { getAuthenticatedUser } from "@/lib/auth";
import React, { Fragment } from "react";

export default async function StaffManagementAdminPage() {
  const { token } = await getAuthenticatedUser();

  const staffs = await getStaffList(token);

  return (
    <Fragment>
      <Header title="เจ้าหน้าที่" description="จัดการเจ้าหน้าที่" />
      <Separator />
      <StaffManagementContainer staffs={staffs} />
    </Fragment>
  );
}
