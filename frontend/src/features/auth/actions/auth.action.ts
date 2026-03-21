"use server";

import { actionResponse } from "@/lib/action";
import { InitialFormState } from "@/types/actions/action";
import { login, logout, register } from "../services/auth.service";
import { StaffRoleEnum, UserRoleEnum } from "../schemas/user.schema";

export async function loginAction(
  _prevState: InitialFormState,
  formData: FormData,
) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    loginType: formData.get("login-type") as UserRoleEnum,
  };

  const { loginType, ...rest } = rawData;
  const result = await login(loginType, rest);

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
    staffRole: (() => {
      const value = formData.get("staff-role") as StaffRoleEnum;
      return value && value.trim() !== "" ? value : undefined;
    })(),
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
    registerType: formData.get("register-type") as UserRoleEnum,
  };

  const { registerType, ...rest } = rawData;
  const resutl = await register(registerType, rest);

  if (resutl && resutl.message) {
    return actionResponse({
      status: "expected-error",
      message: resutl.message,
      error: resutl.error,
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
