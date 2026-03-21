import { createGlobalCacheTag } from "@/lib/cache";

const HELLO_WORLD_TAG = "hello-world";

export function getHelloWorldGlobalTag() {
  return createGlobalCacheTag(HELLO_WORLD_TAG);
}
