import { axios, buildHeaders, handleApiRequest } from "@/lib/api-handler";
import {
  IUser,
  userRepsonseSchema,
  UserRoleEnum,
} from "../schemas/user.schema";
import { API_CONFIG } from "@/configs/api.config";
import { ACTION_CONFIG } from "@/configs/action.config";
import { cookie } from "@/lib/cookie";
import {
  ILogin,
  loginResponseSchema,
  loginSchema,
} from "../schemas/login.schema";
import { IRegister, registerSchema } from "../schemas/register.schema";
import { revalidateUserCache } from "@/lib/cache/user-cache";
import {
  IUpdateUserProfile,
  updateUserProfileSchema,
} from "../schemas/update-user-profile";

export async function login(type: UserRoleEnum, input: ILogin) {
  try {
    // validate
    const { success, error, data } = loginSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre body
    const requestBody = {
      email: data.email,
      password: data.password,
    };

    const endpoint =
      type === UserRoleEnum.ADMIN
        ? "/api/admin/auth/login"
        : `/api/auth/${type.toLocaleLowerCase()}/login`;

    // api
    const { result, error: responseError } = await handleApiRequest(
      axios.post(`${API_CONFIG.BASE_URL}${endpoint}`, requestBody),
      {
        option: {
          validateResponse: loginResponseSchema,
        },
      },
    );

    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: responseError.errorMessage,
      };
    }

    // save token
    const token = result.data.token;
    await cookie.setToken(token);
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function register(type: UserRoleEnum, input: IRegister) {
  try {
    // validate
    const { success, error, data } = registerSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre body
    const requestBody = {
      email: data.email,
      fullName: data.fullName,
      phone: data.phone,
      staffRole: type,
      password: data.password,
    };

    // api
    const { result, error: responseError } = await handleApiRequest(
      axios.post(
        `${API_CONFIG.BASE_URL}/api/auth/${type.toLocaleLowerCase()}/register`,
        requestBody,
      ),
      {
        option: {
          validateResponse: loginResponseSchema,
        },
      },
    );

    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: "อีเมลนี้ถูกใช้งานไปแล้ว",
      };
    }

    // save token
    const token = result.data.token;
    await cookie.setToken(token);

    // clear cache
    revalidateUserCache(result.data.role, result.data.id.toString());
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function logout() {
  try {
    await cookie.deleteToken();
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getCurrentUser(
  token: string,
): Promise<IUser | null> {
  try {
    const { result, error } = await handleApiRequest(
      axios.get(`${API_CONFIG.BASE_URL}/api/auth/current-user`, {
        headers: buildHeaders({ token }),
      }),
      {
        option: {
          validateResponse: userRepsonseSchema,
        },
      },
    );

    if (error.status === "error") {
      console.error(error.errorMessage);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateUserProfile(
  type: UserRoleEnum,
  input: IUpdateUserProfile,
) {
  try {
    // get token
    const token = await cookie.getToken();

    // validate
    const { success, error, data } =
      updateUserProfileSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    if (type === UserRoleEnum.STAFF && !data.staffRole) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
      };
    }

    // pre body
    const requestBody = {
      email: data.email,
      fullName: data.fullName,
      phone: data.phone,
      staffRole: data.staffRole,
      password: data.password,
    };

    // api
    const { result, error: responseError } = await handleApiRequest(
      axios.put(
        `${API_CONFIG.BASE_URL}/api/${type.toLocaleLowerCase() + "s"}/${data.id}`,
        requestBody,
        {
          headers: buildHeaders({ token }),
        },
      ),
      {
        option: {
          validateResponse: userRepsonseSchema,
        },
      },
    );

    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: responseError.errorMessage,
      };
    }

    // clear cache
    revalidateUserCache(result.data.role, result.data.id.toString());
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}
