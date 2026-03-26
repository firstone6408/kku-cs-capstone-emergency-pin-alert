"use server";

import { InitialFormState } from "@/types/actions/action";
import { createReportIncident } from "../services/report-incident.service";
import { ACTION_CONFIG } from "@/configs/action.config";
import { actionResponse } from "@/lib/action";

export async function createReportIncidentAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    incidentTypeId: (() => {
      const value = formData.get("incident-type-id") as string;
      return parseInt(value);
    })(),
    description: formData.get("report-incident-description") as string,
    contactPhone: formData.get("report-incident-contact-phone") as string,
    address: formData.get("report-incident-address") as string,
    location: JSON.parse(
      formData.get("report-incident-location") as string,
    ) as {
      lat: number;
      lng: number;
    },
    files: formData.getAll("files") as File[],
  };

  const result = await createReportIncident(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.CREATED,
    });
  }
}
