import { API_CONFIG } from "@/configs/api.config";
import {
  handleApiRequest,
  buildHeaders,
  createApiResponseSchema,
} from "@/lib/api-handler";
import axios from "axios";
import z from "zod";
import {
  ITeamStaff,
  teamStaffSchema,
} from "../schemas/team/team-staff.schema";
import { applyCacheConfig } from "@/lib/cache";
import {
  getStaffTeamGlobalTag,
  getStaffTeamIdTag,
  revalidateStaffTeamCache,
} from "./staff-team.cache";
import { IUser } from "@/features/auth/schemas/user.schema";
import {
  createTeamStaffSchema,
  ICreateTeamStaff,
} from "../schemas/team/create-team-staff.schema";
import { ACTION_CONFIG } from "@/configs/action.config";
import { cookie } from "@/lib/cookie";
import { getCurrentUser } from "@/features/auth/services/auth.service";
import {
  IJoinTeamStaff,
  joinTeamStaffSchema,
} from "../schemas/team/join-team.schema";
import {
  IKickMemberTeamStaff,
  kickMemberTeamStaffSchema,
} from "../schemas/team/kick-member.schema";

export async function createTeamStaff(input: ICreateTeamStaff) {
  try {
    // get token
    const token = await cookie.getToken();
    if (!token) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.UNAUTHORIZED,
      };
    }
    const user = await getCurrentUser(token);
    if (!user) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.UNAUTHORIZED,
      };
    }

    // validate
    const { success, error, data } =
      createTeamStaffSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre body
    const requestBody = {
      name: data.name,
    };

    // api
    const { error: responseError } = await handleApiRequest(
      axios.post(`${API_CONFIG.BASE_URL}/api/staffs/teams`, requestBody, {
        headers: buildHeaders({ token }),
      }),
      {
        option: {
          validateResponse: createApiResponseSchema(teamStaffSchema),
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
    revalidateStaffTeamCache(user.id.toString());
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function joinTeamStaff(input: IJoinTeamStaff) {
  try {
    // get token
    const token = await cookie.getToken();
    if (!token) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.UNAUTHORIZED,
      };
    }
    // get user
    const user = await getCurrentUser(token);
    if (!user) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.UNAUTHORIZED,
      };
    }

    // validate
    const { success, error, data } = joinTeamStaffSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // api
    const { error: errorResponse } = await handleApiRequest(
      axios.post(
        `${API_CONFIG.BASE_URL}/api/staffs/teams/${data.teamId}/join`,
        null,
        {
          headers: buildHeaders({ token }),
        },
      ),
      {
        option: {
          validateResponse: createApiResponseSchema(teamStaffSchema),
        },
      },
    );

    if (errorResponse.status === "error") {
      console.error(errorResponse.errorMessage);
      return {
        message: errorResponse.errorMessage,
      };
    }

    // clear cache
    revalidateStaffTeamCache(user.id.toString());
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function leaveTeamStaff() {
  try {
    // get token
    const token = await cookie.getToken();
    if (!token) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.UNAUTHORIZED,
      };
    }
    // get user
    const user = await getCurrentUser(token);
    if (!user) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.UNAUTHORIZED,
      };
    }

    // api
    const { error: errorResponse } = await handleApiRequest(
      axios.put(`${API_CONFIG.BASE_URL}/api/staffs/teams/leave`, null, {
        headers: buildHeaders({ token }),
      }),
    );

    if (errorResponse.status === "error") {
      console.error(errorResponse.errorMessage);
      return {
        message: errorResponse.errorMessage,
      };
    }

    // clear cache
    revalidateStaffTeamCache(user.id.toString());
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function kickMemberTeamStaff(input: IKickMemberTeamStaff) {
  try {
    // get token
    const token = await cookie.getToken();
    if (!token) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.UNAUTHORIZED,
      };
    }
    // get user
    const user = await getCurrentUser(token);
    if (!user) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.UNAUTHORIZED,
      };
    }

    // validate
    const { success, error, data } =
      kickMemberTeamStaffSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // api
    const { error: errorResponse } = await handleApiRequest(
      axios.delete(
        `${API_CONFIG.BASE_URL}/api/staffs/teams/members/${data.memberId}`,
        {
          headers: buildHeaders({ token }),
        },
      ),
    );

    if (errorResponse.status === "error") {
      console.error(errorResponse.errorMessage);
      return {
        message: errorResponse.errorMessage,
      };
    }

    // clear cache
    revalidateStaffTeamCache(user.id.toString());
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getMyTeamStaff(
  token: string,
  staff: IUser,
): Promise<ITeamStaff | null> {
  "use cache";
  applyCacheConfig({
    life: "days",
    tag: getStaffTeamIdTag(staff.id.toString()),
  });

  try {
    // api
    const { result, error } = await handleApiRequest(
      axios.get(`${API_CONFIG.BASE_URL}/api/staffs/teams/my`, {
        headers: buildHeaders({ token }),
      }),
      {
        option: {
          validateResponse: createApiResponseSchema(
            teamStaffSchema.nullable(),
          ),
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

export async function getTeamStaffList(
  token: string,
): Promise<ITeamStaff[]> {
  "use cache";
  applyCacheConfig({
    life: "days",
    tag: getStaffTeamGlobalTag(),
  });

  try {
    // api
    const { result, error } = await handleApiRequest(
      axios.get(`${API_CONFIG.BASE_URL}/api/staffs/teams`, {
        headers: buildHeaders({ token }),
      }),
      {
        option: {
          validateResponse: createApiResponseSchema(
            z.array(teamStaffSchema),
          ),
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
