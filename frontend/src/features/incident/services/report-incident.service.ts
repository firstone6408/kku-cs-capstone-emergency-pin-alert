import { ACTION_CONFIG } from "@/configs/action.config";
import {
  createReportIncidentSchema,
  ICreateReportIncident,
} from "../schemas/report/create-report-incident.schema";
import { cookie } from "@/lib/cookie";
import { API_CONFIG } from "@/configs/api.config";
import {
  handleApiRequest,
  buildHeaders,
  createApiResponseSchema,
} from "@/lib/api-handler";
import axios from "axios";
import { IIncident, IncidentSchema } from "../schemas/incident.schema";
import {
  getIncidentGlobalTag,
  revalidateIncidentCache,
} from "./incident.cache";
import { applyCacheConfig } from "@/lib/cache";
import z from "zod";

export async function createReportIncident(input: ICreateReportIncident) {
  try {
    // get token
    const token = await cookie.getToken();

    // validate
    const { success, error, data } =
      createReportIncidentSchema.safeParse(input);

    if (!success) {
      return {
        message: ACTION_CONFIG.RESPONSE.ERROR.VALIDATION,
        error: error.flatten().fieldErrors,
      };
    }

    // pre body
    const formData = new FormData();
    formData.append("incidentTypeId", data.incidentTypeId.toString());
    formData.append("description", data.description);
    formData.append("contactPhone", data.contactPhone);
    formData.append("latitude", data.location.lat.toString());
    formData.append("longitude", data.location.lng.toString());
    data.files.forEach((file) => {
      formData.append("files", file);
    });

    // api
    const { result, error: responseError } = await handleApiRequest(
      axios.post(`${API_CONFIG.BASE_URL}/api/incidents`, formData, {
        headers: buildHeaders({ token, uploadHeaders: true }),
      }),
      {
        option: {
          validateResponse: createApiResponseSchema(IncidentSchema),
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
    revalidateIncidentCache(result.data.id.toString());
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}

export async function getIncidentList(
  token: string,
): Promise<IIncident[]> {
  "use cache";
  applyCacheConfig({
    life: "minutes",
    tag: getIncidentGlobalTag(),
  });

  try {
    // api
    const { result, error } = await handleApiRequest(
      axios.get(`${API_CONFIG.BASE_URL}/api/incidents/reporter`, {
        headers: buildHeaders({ token }),
      }),
      {
        option: {
          validateResponse: createApiResponseSchema(
            z.array(IncidentSchema),
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
