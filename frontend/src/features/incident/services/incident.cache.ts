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

export function getIncidentReporterGlobalTag(reporterId: string) {
  return createGlobalCacheTag(`${INCIDENT_TAG}:${reporterId}`);
}

export function revalidateIncidentCache(
  incidentId: string,
  reporterId: string,
) {
  revalidateTag(getIncidentIdTag(incidentId));
  revalidateTag(getIncidentGlobalTag());
  revalidateTag(getIncidentReporterGlobalTag(reporterId));
}
