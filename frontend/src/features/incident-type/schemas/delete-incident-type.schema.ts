import z from "zod";

export const deleteIncidentTypeSchema = z.object({
  incidentTypeId: z.number(),
});

export type IDeleteIncidentType = z.infer<typeof deleteIncidentTypeSchema>;
