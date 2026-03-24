import {
  IIncidentType,
  incidentTypeSchema,
} from "@/features/incident-type/schemas/incident-type.schema";
import { applyCacheConfig } from "@/lib/cache";
import {
  getIncidentTypeGlobalTag,
  revalidateIncidentTypeCache,
} from "./incident-type.cache";
import { API_CONFIG } from "@/configs/api.config";
import {
  handleApiRequest,
  buildHeaders,
  createApiResponseSchema,
} from "@/lib/api-handler";
import axios from "axios";
import {
  IUpsertIncidentType,
  upsertIncidentTypeSchema,
} from "../schemas/upsert-incident-type.schema";
import { ACTION_CONFIG } from "@/configs/action.config";
import { cookie } from "@/lib/cookie";
import z from "zod";
import { IDeleteIncidentType } from "../schemas/delete-incident-type.schema";
import {
  activeChangeIncidentTypeSchema,
  IActiveChangeIncidentType,
} from "../schemas/active-change-incident-type.schema";

export async function upsertIncidentType(
  type: "create" | "update",
  input: IUpsertIncidentType,
) {
  try {
    // get token
    const token = await cookie.getToken();

    // validate
    const { success, error, data } =
      upsertIncidentTypeSchema.safeParse(input);
    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }
    if (type === "update" && !data.incidentTypeId) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
      };
    }

    // pre body
    const requestBody = {
      name: data.name,
      priorityLevel: data.priorityLevel,
    };

    // api
    const method = type === "update" ? "put" : "post";

    const endpoint =
      type === "update"
        ? `/api/incident-types/${data.incidentTypeId}`
        : "/api/incident-types";

    const { result, error: responseError } = await handleApiRequest(
      axios[method](`${API_CONFIG.BASE_URL}${endpoint}`, requestBody, {
        headers: buildHeaders({ token }),
      }),
      {
        option: {
          validateResponse: createApiResponseSchema(incidentTypeSchema),
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
    revalidateIncidentTypeCache(result.data.id.toString());
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function deleteIncidentType(input: IDeleteIncidentType) {
  try {
    // get token
    const token = await cookie.getToken();

    // api
    const { error } = await handleApiRequest(
      axios.delete(
        `${API_CONFIG.BASE_URL}/api/incident-types/${input.incidentTypeId}`,
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
    revalidateIncidentTypeCache(input.incidentTypeId.toString());
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function activeChangeIncidentType(
  input: IActiveChangeIncidentType,
) {
  try {
    // get token
    const token = await cookie.getToken();

    // validate
    const { success, error, data } =
      activeChangeIncidentTypeSchema.safeParse(input);

    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre body
    const requestBody = {
      isActive: data.isActive,
    };

    // api
    const { error: responseError } = await handleApiRequest(
      axios.patch(
        `${API_CONFIG.BASE_URL}/api/incident-types/${data.incidentTypeId}/active-status`,
        requestBody,
        {
          headers: buildHeaders({ token }),
        },
      ),
    );

    if (responseError.status === "error") {
      console.error(responseError.errorMessage);
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
      };
    }

    // clear cache
    revalidateIncidentTypeCache(data.incidentTypeId.toString());
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getIncidentTypeList(
  token: string,
): Promise<IIncidentType[]> {
  "use cache";
  applyCacheConfig({
    life: "hours",
    tag: getIncidentTypeGlobalTag(),
  });

  try {
    // api
    const { result, error } = await handleApiRequest(
      axios.get(`${API_CONFIG.BASE_URL}/api/incident-types`, {
        headers: buildHeaders({ token }),
      }),
      {
        option: {
          validateResponse: createApiResponseSchema(
            z.array(incidentTypeSchema),
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
