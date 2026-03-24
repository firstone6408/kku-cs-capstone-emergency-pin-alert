import {
  IUser,
  StaffRoleEnum,
  UserRoleEnum,
} from "@/features/auth/schemas/user.schema";

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
        return "สำคัญมาก";
      case "2":
        return "สำคัญ";
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
};
