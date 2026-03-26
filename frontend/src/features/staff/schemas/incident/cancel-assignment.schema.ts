import z from "zod";

export const cancelAssignmentIncidentStaffSchema = z.object({
  incidentId: z.number(),
});

export type ICancelAssignmentIncidentStaff = z.infer<
  typeof cancelAssignmentIncidentStaffSchema
>;
