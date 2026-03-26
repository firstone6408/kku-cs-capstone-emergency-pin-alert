import z from "zod";

export const acceptIncidentStaffSchema = z.object({
  incidentId: z.number(),
});

export type IAcceptIncidentStaff = z.infer<
  typeof acceptIncidentStaffSchema
>;
