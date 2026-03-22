"use server";

import { actionResponse } from "@/lib/action";
import { InitialFormState } from "@/types/actions/action";
import { login, logout, register } from "../services/auth.service";
import { UserRoleEnum } from "../schemas/user.schema";

export async function loginAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as UserRoleEnum,
  };

  const result = await login(rawData.role, rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
      error: result.error,
    });
  } else {
    return actionResponse({
      status: "success",
      message: "เข้าสู่ระบบสำเร็จ",
    });
  }
}

export async function registerAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    email: formData.get("email") as string,
    fullName: formData.get("full-name") as string,
    phone: formData.get("phone") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
  };

  // Register เป็น reporter เท่านั้น
  const result = await register(UserRoleEnum.REPORTER, rawData);

  if (result && result.message) {
    return actionResponse({
      status: "expected-error",
      message: result.message,
      error: result.error,
    });
  } else {
    return actionResponse({
      status: "success",
      message: "สมัครสมาชิกสำเร็จและเข้าสู่ระบบสำเร็จ",
    });
  }
}

export async function logoutAction(
  _prevState: InitialFormState,
  _formData: FormData,
) {
  await logout();
  return actionResponse({
    status: "success",
    message: "ออกจากระบบสำเร็จ",
  });
}
