import { getHelloWorldGlobalTag } from "./hello-world.cache";
import { API_CONFIG } from "@/configs/api.config";
import z from "zod";
import { applyCacheConfig } from "@/lib/cache";
import { axios, handleApiRequest } from "@/lib/api-handler";

export async function getHelloWorld() {
  "use cache";
  applyCacheConfig({
    life: "weeks",
    tag: getHelloWorldGlobalTag(),
  });

  try {
    const { result, error } = await handleApiRequest(
      axios.get(`${API_CONFIG.BASE_URL}/api/hello`),
      {
        option: {
          validateResponse: z.object({
            message: z.string(),
          }),
        },
      },
    );

    if (error.status === "error") {
      console.error(error.errorMessage);
      return null;
    }

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
