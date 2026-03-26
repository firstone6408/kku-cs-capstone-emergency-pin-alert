import { incidentTypeSchema } from "@/features/incident-type/schemas/incident-type.schema";
import { z } from "zod";

export enum IncidentStatusEnum {
  REPORTED = "REPORTED",
  IN_PROGRESS = "IN_PROGRESS",
  NEED_MORE_TEAMS = "NEED_MORE_TEAMS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

const EvidenceSchema = z.object({
  id: z.number(),
  fileType: z.string(),
  fileUrl: z.string().url(),
  fileName: z.string(),
  fileSize: z.number(),
});

export const IncidentSchema = z.object({
  id: z.number(),

  incidentType: incidentTypeSchema,

  description: z.string(),

  contactPhone: z.string(),

  address: z.string(),

  latitude: z.number(),
  longitude: z.number(),

  status: z.nativeEnum(IncidentStatusEnum),

  maxTeams: z.number(),

  evidence: z.array(EvidenceSchema),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export type IIncident = z.infer<typeof IncidentSchema>;
