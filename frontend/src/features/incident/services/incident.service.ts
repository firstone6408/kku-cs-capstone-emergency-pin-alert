import { API_CONFIG } from "@/configs/api.config";
import {
  handleApiRequest,
  buildHeaders,
  createApiResponseSchema,
} from "@/lib/api-handler";
import { applyCacheConfig } from "@/lib/cache";
import axios from "axios";
import z from "zod";
import { IIncident, IncidentSchema } from "../schemas/incident.schema";
import {
  getIncidentGlobalTag,
  getIncidentReporterGlobalTag,
} from "./incident.cache";
import { IUser, UserRoleEnum } from "@/features/auth/schemas/user.schema";

export async function getIncidentListByUser(
  token: string,
  user: IUser,
): Promise<IIncident[]> {
  "use cache";
  applyCacheConfig({
    life: "minutes",
    tag:
      user.role === UserRoleEnum.REPORTER
        ? getIncidentReporterGlobalTag(user.id.toString())
        : getIncidentGlobalTag(),
  });

  try {
    // api
    const endpoint =
      user.role === UserRoleEnum.REPORTER
        ? "/api/incidents/reporter"
        : "/api/incidents";
    const { result, error } = await handleApiRequest(
      axios.get(`${API_CONFIG.BASE_URL}${endpoint}`, {
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
