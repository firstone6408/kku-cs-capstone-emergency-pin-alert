import z from "zod";

export const requestMoreTeamIncidentStaffSchema = z.object({
  incidentId: z.number(),
  additionalTeams: z.number().min(1, "กรุณาระบุจำนวนทีมที่ต้องการเพิ่ม"),
  reason: z.string().nullable(),
});

export type IRequestMoreTeamIncidentStaff = z.infer<
  typeof requestMoreTeamIncidentStaffSchema
>;
