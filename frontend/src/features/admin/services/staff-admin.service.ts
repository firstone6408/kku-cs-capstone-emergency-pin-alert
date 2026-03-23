import { API_CONFIG } from "@/configs/api.config";
import {
  IUser,
  userRepsonseSchema,
  UserRoleEnum,
} from "@/features/auth/schemas/user.schema";
import { axios, buildHeaders, handleApiRequest } from "@/lib/api-handler";
import { applyCacheConfig } from "@/lib/cache";
import {
  getUserGlobalTag,
  revalidateUserCache,
} from "@/lib/cache/user-cache";
import { staffResponseSchema } from "@/features/admin/schemas/staff/staff.schema";
import { ACTION_CONFIG } from "@/configs/action.config";
import {
  IUpsertStaff,
  upsertStaffSchema,
} from "@/features/admin/schemas/staff/upsert-staff.schema";
import { cookie } from "@/lib/cookie";
import { IDeleteStaff } from "@/features/admin/schemas/staff/delete-staff.schema";

export async function upsertStaff(
  type: "create" | "update",
  input: IUpsertStaff,
) {
  try {
    // get token
    const token = await cookie.getToken();

    // validate
    const { success, error, data } = upsertStaffSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }
    if (type === "update" && !data.id) {
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
    const method = type === "create" ? "post" : "put";
    const url =
      type === "create"
        ? `${API_CONFIG.BASE_URL}/api/staffs`
        : `${API_CONFIG.BASE_URL}/api/staffs/${data.id}`;

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

export async function deleteStaff(input: IDeleteStaff) {
  try {
    // get token
    const token = await cookie.getToken();

    // api
    const { error } = await handleApiRequest(
      axios.delete(`${API_CONFIG.BASE_URL}/api/staffs/${input.staffId}`, {
        headers: buildHeaders({ token }),
      }),
    );

    if (error.status === "error") {
      console.error(error.errorMessage);
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
      };
    }

    // clear cache
    revalidateUserCache(UserRoleEnum.STAFF, input.staffId.toString());
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getStaffList(token: string): Promise<IUser[]> {
  "use cache";
  applyCacheConfig({
    life: "days",
    tag: getUserGlobalTag(UserRoleEnum.STAFF),
  });

  try {
    // api
    const { result, error } = await handleApiRequest(
      axios.get(`${API_CONFIG.BASE_URL}/api/staffs`, {
        headers: buildHeaders({ token }),
      }),
      {
        option: {
          validateResponse: staffResponseSchema,
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
