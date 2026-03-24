import z from "zod";

export const activeChangeIncidentTypeSchema = z.object({
  incidentTypeId: z.number(),
  isActive: z.boolean(),
});

export type IActiveChangeIncidentType = z.infer<
  typeof activeChangeIncidentTypeSchema
>;
