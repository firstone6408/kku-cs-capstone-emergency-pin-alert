import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { ReporterManagementContainer } from "@/features/admin/components/reporter/repoter-management-container";
import { getReporterList } from "@/features/admin/services/reporter-admin.service";
import { getAuthenticatedUser } from "@/lib/auth";
import { Fragment } from "react";

export default async function ReporterManagementAdminPage() {
  const { token } = await getAuthenticatedUser();

  const reporters = await getReporterList(token);

  return (
    <Fragment>
      <Header title="ผู้แจ้งเหตุ" description="จัดการผู้แจ้งเหตุ" />

      <Separator />

      <ReporterManagementContainer reporters={reporters} />
    </Fragment>
  );
}
