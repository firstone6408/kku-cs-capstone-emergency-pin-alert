import {
  IUser,
  StaffRoleEnum,
  UserRoleEnum,
} from "@/features/auth/schemas/user.schema";
import { IncidentStatusEnum } from "@/features/incident/schemas/incident.schema";

export const translateEnum = {
  userRoleEnum: function (value: UserRoleEnum) {
    switch (value) {
      case "REPORTER":
        return "ผู้แจ้งเหตุ";
      case "STAFF":
        return "เจ้าหน้าที่ / อาสา";
      case "ADMIN":
        return "ผู้ดูแลระบบ";
      default:
        return value;
    }
  },
  staffRoleEnum: function (value: StaffRoleEnum) {
    switch (value) {
      case "VOLUNTEER":
        return "อาสา";
      case "OFFICER":
        return "เจ้าหน้าที่";
      default:
        return value;
    }
  },
  userActiveStatus: function (user: IUser) {
    return user.isBlocked ? "ถูกระงับ" : "ปกติ";
  },
  incidentTypePriorityLevel: function (value: string) {
    switch (value) {
      case "1":
        return "สูงมาก";
      case "2":
        return "สูง";
      case "3":
        return "ปานกลาง";
      case "4":
        return "น้อย";
      case "5":
        return "น้อยมาก";
      default:
        return value;
    }
  },
  incidentStatusEnum: function (value: IncidentStatusEnum | string) {
    switch (value) {
      case "REPORTED":
        return "รอดำเนินการ";
      case "IN_PROGRESS":
        return "กำลังดำเนินการ";
      case "NEED_MORE_TEAMS":
        return "ต้องการทีมเพิ่ม";
      case "COMPLETED":
        return "เสร็จสิ้น";
      case "CANCELLED":
        return "ยกเลิก";
      case "ALL":
        return "ทั้งหมด";
      default:
        return value;
    }
  },
};
