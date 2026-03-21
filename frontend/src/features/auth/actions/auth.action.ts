"use server";

import { actionResponse } from "@/lib/action";
import { InitialFormState } from "@/types/actions/action";
import { login, logout } from "../services/auth.service";
import { UserRoleEnum } from "../schemas/user.schema";

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
