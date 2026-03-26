import z from "zod";

export const kickMemberTeamStaffSchema = z.object({
  memberId: z.number(),
});

export type IKickMemberTeamStaff = z.infer<
  typeof kickMemberTeamStaffSchema
>;
