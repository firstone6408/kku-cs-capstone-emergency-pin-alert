import { userSchema } from "@/features/auth/schemas/user.schema";
import z from "zod";

export enum TeamStaffStatusEnum {
  AVAILABLE = "AVAILABLE", // ว่าง, พร้อมรับงาน
  ON_MISSION = "ON_MISSION", // กำลังปฏิบัติงาน
}

const teamStaffMemberSchema = z.object({
  id: z.number(),
  staff: userSchema,
  joinedAt: z.string(), // ISO date
  leftAt: z.string().nullable(), // nullable
});

export const teamStaffSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.nativeEnum(TeamStaffStatusEnum),
  members: z.array(teamStaffMemberSchema),
  createdAt: z.string(),
});

export type ITeamStaff = z.infer<typeof teamStaffSchema>;

export type ITeamStaffMember = z.infer<typeof teamStaffMemberSchema>;
