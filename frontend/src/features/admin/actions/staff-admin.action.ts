"use server";

import { actionResponse } from "@/lib/action";
import { InitialFormState } from "@/types/actions/action";
import {
  deleteStaff,
  upsertStaff,
} from "@/features/admin/services/staff-admin.service";
import { ACTION_CONFIG } from "@/configs/action.config";
import { StaffRoleEnum } from "@/features/auth/schemas/user.schema";

export async function upsertStaffAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    formType: formData.get("form-type") as "create" | "update",
    id: (() => {
      const value = formData.get("staff-id") as string;
      return value ? parseInt(value) : undefined;
    })(),
    fullName: formData.get("staff-full-name") as string,
    email: formData.get("staff-email") as string,
    phone: formData.get("staff-phone") as string,
    staffRole: formData.get("staff-role") as StaffRoleEnum,
    password: (() => {
      const value = formData.get("staff-password") as string;
      return value ? value : null;
    })(),
  };

  const { formType, ...rest } = rawData;

  const result = await upsertStaff(formType, rest);

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

export async function deleteStaffAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    staffId: (() => {
      const value = formData.get("staff-id") as string;
      return parseInt(value);
    })(),
  };

  const result = await deleteStaff(rawData);

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
