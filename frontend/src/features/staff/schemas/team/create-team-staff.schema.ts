import z from "zod";

export const createTeamStaffSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อทีม"),
});

export type ICreateTeamStaff = z.infer<typeof createTeamStaffSchema>;
