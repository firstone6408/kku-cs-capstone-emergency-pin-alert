import z from "zod";

export const upsertIncidentTypeSchema = z.object({
  incidentTypeId: z.number().optional(),
  name: z.string().min(1, "กรุณากรอกหัวข้อปัญหา"),
  priorityLevel: z.number().min(1, "กรุณากรอกความสําคัญ"),
});

export type IUpsertIncidentType = z.infer<typeof upsertIncidentTypeSchema>;
