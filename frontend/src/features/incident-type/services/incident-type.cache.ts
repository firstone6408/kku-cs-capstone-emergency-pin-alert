import {
  createEntityCacheTag,
  createGlobalCacheTag,
  revalidateTag,
} from "@/lib/cache";

const INCIDENT_TYPE_TAG = "incident-type" as const;

export function getIncidentTypeIdTag(incidentTypeId: string) {
  return createEntityCacheTag(INCIDENT_TYPE_TAG, incidentTypeId);
}

export function getIncidentTypeGlobalTag() {
  return createGlobalCacheTag(INCIDENT_TYPE_TAG);
}

export function revalidateIncidentTypeCache(incidentTypeId: string) {
  revalidateTag(getIncidentTypeIdTag(incidentTypeId));
  revalidateTag(getIncidentTypeGlobalTag());
}
