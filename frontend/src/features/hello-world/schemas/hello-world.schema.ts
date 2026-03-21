import { createApiResponseSchema } from "@/lib/api-handler";
import z from "zod";

export const helloWorldSchema = createApiResponseSchema(
  z.object({
    message: z.string(),
  }),
);
