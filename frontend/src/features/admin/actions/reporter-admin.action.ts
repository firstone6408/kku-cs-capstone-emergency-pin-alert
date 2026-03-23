"use server";

import { actionResponse } from "@/lib/action";
import { InitialFormState } from "@/types/actions/action";
import {
  deleteReporter,
  upsertReporter,
} from "@/features/admin/services/reporter-admin.service";
import { ACTION_CONFIG } from "@/configs/action.config";

export async function upsertReporterAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    formType: formData.get("form-type") as "create" | "update",
    reporterId: (() => {
      const value = formData.get("reporter-id") as string;
      return value ? parseInt(value) : undefined;
    })(),
    fullName: formData.get("reporter-full-name") as string,
    email: formData.get("reporter-email") as string,
    phone: formData.get("reporter-phone") as string,
    password: (() => {
      const value = formData.get("reporter-password") as string;
      return value ? value : null;
    })(),
  };

  const { formType, ...rest } = rawData;

  const result = await upsertReporter(formType, rest);

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

export async function deleteReporterAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    reporterId: (() => {
      const value = formData.get("reporter-id") as string;
      return parseInt(value);
    })(),
  };

  const result = await deleteReporter(rawData);

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
