import {
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
};
