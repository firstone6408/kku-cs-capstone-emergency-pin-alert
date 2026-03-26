import z from "zod";

export const completeIncidentStaffSchema = z.object({
  incidentId: z.number(),
  note: z.string().nullable(),
});

export type ICompleteIncidentStaff = z.infer<
  typeof completeIncidentStaffSchema
>;
