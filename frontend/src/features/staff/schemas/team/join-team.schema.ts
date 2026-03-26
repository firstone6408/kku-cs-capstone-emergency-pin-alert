import z from "zod";

export const joinTeamStaffSchema = z.object({
  teamId: z.number(),
});

export type IJoinTeamStaff = z.infer<typeof joinTeamStaffSchema>;
