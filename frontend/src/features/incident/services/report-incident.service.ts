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
import { incidentSchema } from "../schemas/incident.schema";
import { revalidateIncidentCache } from "./incident.cache";
import { getCurrentUser } from "@/features/auth/services/auth.service";

export async function createReportIncident(input: ICreateReportIncident) {
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
    formData.append("address", data.address);
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
          validateResponse: createApiResponseSchema(incidentSchema),
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
    revalidateIncidentCache(result.data.id.toString(), user.id.toString());
  } catch (error) {
    console.error(error);
    return {
      message: ACTION_CONFIG.RESPONSE.ERROR.UNKNOWN,
    };
  }
}
