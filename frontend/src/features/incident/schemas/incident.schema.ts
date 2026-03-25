import { z } from "zod";

const EvidenceSchema = z.object({
  id: z.number(),
  fileType: z.string(),
  fileUrl: z.string().url(),
  fileName: z.string(),
  fileSize: z.number(),
});

export const IncidentSchema = z.object({
  id: z.number(),

  incidentTypeName: z.string(),

  incidentTypePriorityLevel: z.number(),

  description: z.string(),

  contactPhone: z.string(),

  latitude: z.number(),
  longitude: z.number(),

  status: z.string(),

  maxTeams: z.number(),

  evidence: z.array(EvidenceSchema),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export type IIncident = z.infer<typeof IncidentSchema>;
