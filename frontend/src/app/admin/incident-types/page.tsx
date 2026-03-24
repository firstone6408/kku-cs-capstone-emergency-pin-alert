import { Header } from "@/components/shared/header/header";
import { Separator } from "@/components/ui/separator";
import { IncidentTypeMangementContainer } from "@/features/incident-type/components/incident-type-management-container";
import { getIncidentTypeList } from "@/features/incident-type/services/incident-type.service";
import { getAuthenticatedUser } from "@/lib/auth";
import React, { Fragment } from "react";

export default async function IncidentTypeManagementAdminPage() {
  const { token } = await getAuthenticatedUser();

  const incidentTypes = await getIncidentTypeList(token);

  // console.log(incidentTypes);

  return (
    <Fragment>
      <Header title="ประเภทเหตุฉุกเฉิน" />

      <Separator />

      <IncidentTypeMangementContainer incidentTypes={incidentTypes} />
    </Fragment>
  );
}
