import {
  createEntityCacheTag,
  createGlobalCacheTag,
  revalidateTag,
} from "@/lib/cache";

const STAFF_TEAM_TAG = "staff-team" as const;

export function getStaffTeamIdTag(staffId: string) {
  return createEntityCacheTag(STAFF_TEAM_TAG, staffId);
}

export function getStaffTeamGlobalTag() {
  return createGlobalCacheTag(STAFF_TEAM_TAG);
}

export function revalidateStaffTeamCache(staffId: string) {
  revalidateTag(getStaffTeamIdTag(staffId));
  revalidateTag(getStaffTeamGlobalTag());
}
