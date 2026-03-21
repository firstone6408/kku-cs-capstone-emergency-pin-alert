import { createEntityCacheTag, revalidateTag } from "@/lib/cache";

const AUTH_USER_TAG = "auth-users";

export function getAuthUserIdTag(userId: string) {
  return createEntityCacheTag(AUTH_USER_TAG, userId);
}

export function revalidateAuthUserCache(userId: string) {
  revalidateTag(getAuthUserIdTag(userId));
}
