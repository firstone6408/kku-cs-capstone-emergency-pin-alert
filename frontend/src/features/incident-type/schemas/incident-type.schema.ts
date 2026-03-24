import z from "zod";

export const incidentTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  priorityLevel: z.number(),
});

export type IIncidentType = z.infer<typeof incidentTypeSchema>;
