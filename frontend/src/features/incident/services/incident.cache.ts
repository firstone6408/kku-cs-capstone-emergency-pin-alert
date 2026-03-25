import {
  createEntityCacheTag,
  createGlobalCacheTag,
  revalidateTag,
} from "@/lib/cache";

const INCIDENT_TAG = "incident" as const;

export function getIncidentIdTag(incidentId: string) {
  return createEntityCacheTag(INCIDENT_TAG, incidentId);
}

export function getIncidentGlobalTag() {
  return createGlobalCacheTag(INCIDENT_TAG);
}

export function revalidateIncidentCache(incidentId: string) {
  revalidateTag(getIncidentIdTag(incidentId));
  revalidateTag(getIncidentGlobalTag());
}
