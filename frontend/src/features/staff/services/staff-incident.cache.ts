import {
  createEntityCacheTag,
  createGlobalCacheTag,
  revalidateTag,
} from "@/lib/cache";

const STAFF_INCIDENT_TAG = "staff-incident" as const;

export function getIncidentStaffIdTag(incidentId: string) {
  return createEntityCacheTag(STAFF_INCIDENT_TAG, incidentId);
}

export function getIncidentStaffGlobalTag() {
  return createGlobalCacheTag(STAFF_INCIDENT_TAG);
}

export function revalidateIncidentStaffCache(incidentId: string) {
  revalidateTag(getIncidentStaffIdTag(incidentId));
  revalidateTag(getIncidentStaffGlobalTag());
}
