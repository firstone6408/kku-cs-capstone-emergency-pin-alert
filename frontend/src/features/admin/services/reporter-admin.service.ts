import { API_CONFIG } from "@/configs/api.config";
import {
  IUser,
  userRepsonseSchema,
  UserRoleEnum,
} from "@/features/auth/schemas/user.schema";
import { axios, buildHeaders, handleApiRequest } from "@/lib/api-handler";
import { reporterResponseSchema } from "@/features/admin/schemas/reporter/reporter.schema";
import { applyCacheConfig } from "@/lib/cache";
import {
  getUserGlobalTag,
  revalidateUserCache,
} from "@/lib/cache/user-cache";
import {
  IUpsertReporter,
  upsertReporterSchema,
} from "@/features/admin/schemas/reporter/upsert-reporter.schema";
import { ACTION_CONFIG } from "@/configs/action.config";
import { cookie } from "@/lib/cookie";
import { IDeleteReporter } from "@/features/admin/schemas/reporter/delete-reporter.schema";

export async function upsertReporter(
  type: "create" | "update",
  input: IUpsertReporter,
) {
  try {
    // get token
    const token = await cookie.getToken();

    // validate
    const { success, error, data } = upsertReporterSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }
    if (type === "update" && !data.reporterId) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
      };
    }

    // pre body
    const requestBody = {
      email: data.email,
      fullName: data.fullName,
      phone: data.phone,
      password: data.password,
    };

    // api
    const method = type === "create" ? "post" : "put";
    const url =
      type === "create"
        ? `${API_CONFIG.BASE_URL}/api/reporters`
        : `${API_CONFIG.BASE_URL}/api/reporters/${data.reporterId}`;

    const { result, error: responseError } = await handleApiRequest(
      axios[method](url, requestBody, {
        headers: buildHeaders({ token }),
      }),
      {
        option: {
          validateResponse: userRepsonseSchema,
        },
      },
    );

    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
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

export async function deleteReporter(input: IDeleteReporter) {
  try {
    // get token
    const token = await cookie.getToken();

    // api
    const { error } = await handleApiRequest(
      axios.delete(
        `${API_CONFIG.BASE_URL}/api/reporters/${input.reporterId}`,
        {
          headers: buildHeaders({ token }),
        },
      ),
    );

    if (error.status === "error") {
      console.error(error.errorMessage);
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
      };
    }

    // clear cache
    revalidateUserCache(
      UserRoleEnum.REPORTER,
      input.reporterId.toString(),
    );
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getReporterList(token: string): Promise<IUser[]> {
  "use cache";
  applyCacheConfig({
    life: "days",
    tag: getUserGlobalTag(UserRoleEnum.REPORTER),
  });

  try {
    // api
    const { result, error } = await handleApiRequest(
      axios.get(`${API_CONFIG.BASE_URL}/api/reporters`, {
        headers: buildHeaders({ token }),
      }),
      {
        option: {
          validateResponse: reporterResponseSchema,
        },
      },
    );

    if (error.status === "error") {
      console.error(error.errorMessage);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
