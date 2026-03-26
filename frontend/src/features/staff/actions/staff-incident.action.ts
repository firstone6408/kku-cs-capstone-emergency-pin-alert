"use server";

import { actionResponse } from "@/lib/action";
import {
  acceptIncidentStaff,
  cancelAssignmentIncidentStaff,
  completeIncidentStaff,
  requestMoreTeamsIncidentStaff,
} from "../services/staff-incident.service";
import { ACTION_CONFIG } from "@/configs/action.config";
import { InitialFormState } from "@/types/actions/action";

export async function acceptIncidentStaffAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    incidentId: (() => {
      const value = formData.get("incident-id") as string;
      return parseInt(value);
    })(),
  };

  const result = await acceptIncidentStaff(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.SAVED,
    });
  }
}

export async function completeIncidentStaffAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    incidentId: (() => {
      const value = formData.get("incident-id") as string;
      return parseInt(value);
    })(),
    note: null,
  };

  const result = await completeIncidentStaff(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.SAVED,
    });
  }
}

export async function requestMoreTeamsIncidentStaffAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    incidentId: (() => {
      const value = formData.get("incident-id") as string;
      return parseInt(value);
    })(),
    additionalTeams: (() => {
      const value = formData.get(
        "incident-staff-additional-teams",
      ) as string;
      return parseInt(value);
    })(),
    reason: (() => {
      const value = formData.get("incident-staff-reason") as string;
      return value.trim() !== "" ? value : null;
    })(),
  };

  const result = await requestMoreTeamsIncidentStaff(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.SAVED,
    });
  }
}

export async function cancelAssignmentIncidentStaffAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    incidentId: (() => {
      const value = formData.get("incident-id") as string;
      return parseInt(value);
    })(),
  };

  const result = await cancelAssignmentIncidentStaff(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.SAVED,
    });
  }
}
