import { userSchema } from "@/features/auth/schemas/user.schema";
import { createApiResponseSchema } from "@/lib/api-handler";
import z from "zod";

export const staffResponseSchema = createApiResponseSchema(
  z.array(userSchema),
);
