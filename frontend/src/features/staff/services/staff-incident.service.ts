import { ACTION_CONFIG } from "@/configs/action.config";
import {
  acceptIncidentStaffSchema,
  IAcceptIncidentStaff,
} from "../schemas/incident/accept-incident.schema";
import { cookie } from "@/lib/cookie";
import { API_CONFIG } from "@/configs/api.config";
import {
  handleApiRequest,
  buildHeaders,
  createApiResponseSchema,
} from "@/lib/api-handler";
import axios from "axios";
import { revalidateIncidentCache } from "@/features/incident/services/incident.cache";
import {
  IIncidentStaff,
  incidenStaffSchema,
} from "@/features/incident/schemas/incident.schema";
import {
  completeIncidentStaffSchema,
  ICompleteIncidentStaff,
} from "../schemas/incident/complete-incident.schema";
import {
  IRequestMoreTeamIncidentStaff,
  requestMoreTeamIncidentStaffSchema,
} from "../schemas/incident/request-more-team.schema";
import {
  cancelAssignmentIncidentStaffSchema,
  ICancelAssignmentIncidentStaff,
} from "../schemas/incident/cancel-assignment.schema";
import { applyCacheConfig } from "@/lib/cache";
import {
  getIncidentStaffGlobalTag,
  getIncidentStaffIdTag,
  revalidateIncidentStaffCache,
} from "./staff-incident.cache";
import z from "zod";

export async function acceptIncidentStaff(input: IAcceptIncidentStaff) {
  try {
    // get token
    const token = await cookie.getToken();

    // validate
    const { success, error, data } =
      acceptIncidentStaffSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // api
    const { result, error: errorResponse } = await handleApiRequest(
      axios.post(
        `${API_CONFIG.BASE_URL}/api/staffs/incidents/${data.incidentId}/accept`,
        null,
        {
          headers: buildHeaders({ token }),
        },
      ),
      {
        option: {
          validateResponse: createApiResponseSchema(incidenStaffSchema),
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
    revalidateIncidentCache(
      data.incidentId.toString(),
      result.data.incident.reporter.id.toString(),
    );
    revalidateIncidentStaffCache(data.incidentId.toString());
    revalidateIncidentCache(
      data.incidentId.toString(),
      result.data.incident.reporter.id.toString(),
    );
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function completeIncidentStaff(
  input: ICompleteIncidentStaff,
) {
  try {
    // get token
    const token = await cookie.getToken();

    // validate
    const { success, error, data } =
      completeIncidentStaffSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre body
    const requestBody = {
      note: data.note,
    };

    // api
    const { result, error: errorResponse } = await handleApiRequest(
      axios.post(
        `${API_CONFIG.BASE_URL}/api/staffs/incidents/${data.incidentId}/complete`,
        requestBody,
        {
          headers: buildHeaders({ token }),
        },
      ),
      {
        option: {
          validateResponse: createApiResponseSchema(incidenStaffSchema),
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
    revalidateIncidentCache(
      data.incidentId.toString(),
      result.data.incident.reporter.id.toString(),
    );
    revalidateIncidentStaffCache(data.incidentId.toString());
    revalidateIncidentCache(
      data.incidentId.toString(),
      result.data.incident.reporter.id.toString(),
    );
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function requestMoreTeamsIncidentStaff(
  input: IRequestMoreTeamIncidentStaff,
) {
  try {
    // get token
    const token = await cookie.getToken();

    // validate
    const { success, error, data } =
      requestMoreTeamIncidentStaffSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre body
    const requestBody = {
      additionalTeams: data.additionalTeams,
      reason: data.reason,
    };

    // api
    const { result, error: errorResponse } = await handleApiRequest(
      axios.post(
        `${API_CONFIG.BASE_URL}/api/staffs/incidents/${data.incidentId}/request-more-teams`,
        requestBody,
        {
          headers: buildHeaders({ token }),
        },
      ),
      {
        option: {
          validateResponse: createApiResponseSchema(incidenStaffSchema),
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
    revalidateIncidentCache(
      data.incidentId.toString(),
      result.data.incident.reporter.id.toString(),
    );
    revalidateIncidentStaffCache(data.incidentId.toString());
    revalidateIncidentCache(
      data.incidentId.toString(),
      result.data.incident.reporter.id.toString(),
    );
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function cancelAssignmentIncidentStaff(
  input: ICancelAssignmentIncidentStaff,
) {
  try {
    // get token
    const token = await cookie.getToken();

    // validate
    const { success, error, data } =
      cancelAssignmentIncidentStaffSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // api
    const { result, error: errorResponse } = await handleApiRequest(
      axios.put(
        `${API_CONFIG.BASE_URL}/api/staffs/incidents/${data.incidentId}/cancel-assignment`,
        null,
        {
          headers: buildHeaders({ token }),
        },
      ),
      {
        option: {
          validateResponse: createApiResponseSchema(incidenStaffSchema),
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
    revalidateIncidentCache(
      data.incidentId.toString(),
      result.data.incident.reporter.id.toString(),
    );
    revalidateIncidentStaffCache(data.incidentId.toString());
    revalidateIncidentCache(
      data.incidentId.toString(),
      result.data.incident.reporter.id.toString(),
    );
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getIncidentStaffList(
  token: string,
): Promise<IIncidentStaff[]> {
  "use cache";
  applyCacheConfig({
    life: "hours",
    tag: getIncidentStaffGlobalTag(),
  });

  try {
    // api
    const { result, error } = await handleApiRequest(
      axios.get(`${API_CONFIG.BASE_URL}/api/staffs/incidents`, {
        headers: buildHeaders({ token }),
      }),
      {
        option: {
          validateResponse: createApiResponseSchema(
            z.array(incidenStaffSchema),
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

export async function getIncidentStaffById(
  token: string,
  incidentId: number,
): Promise<IIncidentStaff | null> {
  "use cache";
  applyCacheConfig({
    life: "hours",
    tag: getIncidentStaffIdTag(incidentId.toString()),
  });
  try {
    // api
    const { result, error } = await handleApiRequest(
      axios.get(
        `${API_CONFIG.BASE_URL}/api/staffs/incidents/${incidentId}`,
        {
          headers: buildHeaders({ token }),
        },
      ),
      {
        option: {
          validateResponse: createApiResponseSchema(
            incidenStaffSchema.nullable(),
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
