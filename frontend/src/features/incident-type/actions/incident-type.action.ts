"use server";

import { ACTION_CONFIG } from "@/configs/action.config";
import { actionResponse } from "@/lib/action";
import { InitialFormState } from "@/types/actions/action";
import {
  activeChangeIncidentType,
  deleteIncidentType,
  upsertIncidentType,
} from "../services/incident-type.service";

export async function upsertIncidentTypeAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    formType: formData.get("form-type") as "create" | "update",
    incidentTypeId: (() => {
      const value = formData.get("incident-type-id") as string;
      return value ? parseInt(value) : undefined;
    })(),
    name: formData.get("incident-type-name") as string,
    priorityLevel: (() => {
      const value = formData.get("incident-type-priority-level") as string;
      return parseInt(value);
    })(),
  };

  const { formType, ...rest } = rawData;

  const result = await upsertIncidentType(formType, rest);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
      error: result.error,
    });
  } else {
    return actionResponse({
      status: "success",
      message:
        formType === "create"
          ? ACTION_CONFIG.RESPONSE.SUCCESS.CREATED
          : ACTION_CONFIG.RESPONSE.SUCCESS.UPDATED,
    });
  }
}

export async function deleteIncidentTypeAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    incidentTypeId: (() => {
      const value = formData.get("incident-type-id") as string;
      return parseInt(value);
    })(),
  };

  const result = await deleteIncidentType(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.DELETED,
    });
  }
}

export async function activeChangeIncidentTypeAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    incidentTypeId: (() => {
      const value = formData.get("incident-type-id") as string;
      return parseInt(value);
    })(),
    isActive: (() => {
      const value = formData.get("incident-type-is-active") as string;
      return value === "true" ? true : false;
    })(),
  };

  const result = await activeChangeIncidentType(rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
      error: result.error,
    });
  } else {
    return actionResponse({
      status: "success",
      message: ACTION_CONFIG.RESPONSE.SUCCESS.UPDATED,
    });
  }
}
