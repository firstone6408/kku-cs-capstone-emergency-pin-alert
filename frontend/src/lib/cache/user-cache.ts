import { UserRoleEnum } from "@/features/auth/schemas/user.schema";
import {
  createEntityCacheTag,
  createGlobalCacheTag,
  revalidateTag,
} from "@/lib/cache";

const USER_TAG = {
  REPORTER: "user-reporter",
  STAFF: "user-staff",
  ADMIN: "user-admin",
} as const;

export function getUserIdTag(role: UserRoleEnum, userId: string) {
  return createEntityCacheTag(USER_TAG[role], userId);
}

export function getUserGlobalTag(role: UserRoleEnum) {
  return createGlobalCacheTag(USER_TAG[role]);
}

export function revalidateUserCache(role: UserRoleEnum, userId: string) {
  revalidateTag(getUserIdTag(role, userId));
  revalidateTag(getUserGlobalTag(role));
}
