import { userSchema } from "@/features/auth/schemas/user.schema";
import { incidentTypeSchema } from "@/features/incident-type/schemas/incident-type.schema";
import { teamStaffSchema } from "@/features/staff/schemas/team/team-staff.schema";
import { z } from "zod";

export enum IncidentStatusEnum {
  REPORTED = "REPORTED",
  IN_PROGRESS = "IN_PROGRESS",
  NEED_MORE_TEAMS = "NEED_MORE_TEAMS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum AssignmentStatusEnum {
  ACCEPTED = "ACCEPTED", // ทีมรับงาน
  COMPLETED = "COMPLETED", // ทีมทำเสร็จ
  CANCELLED = "CANCELLED", // ทีมยกเลิก
}

const EvidenceSchema = z.object({
  id: z.number(),
  fileType: z.string(),
  fileUrl: z.string().url(),
  fileName: z.string(),
  fileSize: z.number(),
});

export const incidentSchema = z.object({
  id: z.number(),
  incidentCode: z.string(),

  incidentType: incidentTypeSchema,

  description: z.string(),

  contactPhone: z.string(),

  address: z.string(),

  latitude: z.number(),
  longitude: z.number(),

  status: z.nativeEnum(IncidentStatusEnum),

  maxTeams: z.number(),

  evidence: z.array(EvidenceSchema),
  reporter: userSchema,

  createdAt: z.string(),
  updatedAt: z.string(),
});

const assignmentSchema = z.object({
  id: z.number(),
  team: teamStaffSchema,
  status: z.nativeEnum(AssignmentStatusEnum),
});

export const incidenStaffSchema = z.object({
  incident: incidentSchema,
  assignments: z.array(assignmentSchema),
  currentTeams: z.number().nullable(),
});

export type IIncident = z.infer<typeof incidentSchema>;

export type IIncidentStaff = z.infer<typeof incidenStaffSchema>;
