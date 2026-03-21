import { unstable_cacheLife, unstable_cacheTag } from "next/cache";

/**
 * 🏷️ Create global cache tag
 *
 * ใช้สำหรับ cache ที่ไม่ผูกกับ entity ใด ๆ (เช่น list ทั้งหมด)
 *
 * @param tag - ชื่อของ feature/domain เช่น "user", "post"
 *
 * @returns string ในรูปแบบ `global:<tag>`
 *
 * ----------------------------------------
 *
 * @example
 * const tag = createGlobalCacheTag("user");
 * // "global:user"
 */
export function createGlobalCacheTag(tag: string) {
  return `global:${tag}` as const;
}

/**
 * 🏷️ Create entity-specific cache tag
 *
 * ใช้สำหรับ cache ที่ผูกกับ resource เฉพาะ (เช่น user by id)
 *
 * @param tag - ชื่อของ feature/domain
 * @param id - identifier ของ entity
 *
 * @returns string ในรูปแบบ `id:<id>-<tag>`
 *
 * ----------------------------------------
 *
 * @example
 * const tag = createEntityCacheTag("user", "123");
 * // "id:123-user"
 */
export function createEntityCacheTag(tag: string, id: string) {
  return `id:${id}-${tag}` as const;
}

type CacheLife =
  | "default"
  | "max"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "weeks";

interface DynamicOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paramValues: { [key: string]: any }; // object param ที่จะเช็คค่า
  life?: CacheLife; // ถ้า dynamic ใช้ life ไหน (optional)
}

interface CachingType {
  life: CacheLife;
  tag: string[] | string;
  options?: {
    dynamic?: DynamicOptions;
  };
}

/**
 * ⚙️ Apply cache configuration (Next.js cache API)
 *
 * ทำหน้าที่:
 * - กำหนด cache lifetime (`unstable_cacheLife`)
 * - กำหนด cache tag (`unstable_cacheTag`)
 * - รองรับ dynamic tag จาก param (เช่น filter/query)
 *
 * ----------------------------------------
 *
 * @param life - อายุของ cache (seconds, minutes, hours, ...)
 * @param tag - cache tag (string หรือ array)
 * @param options.dynamic - ใช้สำหรับสร้าง tag แบบ dynamic จาก param
 *
 * ----------------------------------------
 *
 * 🟢 Basic Usage
 *
 * @example
 * applyCacheConfig({
 *   life: "hours",
 *   tag: createGlobalCacheTag("user"),
 * });
 *
 * ----------------------------------------
 *
 * 🟢 Multiple Tags
 *
 * @example
 * applyCacheConfig({
 *   life: "minutes",
 *   tag: [
 *     createGlobalCacheTag("user"),
 *     createEntityCacheTag("user", "123"),
 *   ],
 * });
 *
 * ----------------------------------------
 *
 * 🟢 Dynamic Tag (based on params)
 *
 * @example
 * applyCacheConfig({
 *   life: "hours",
 *   tag: createGlobalCacheTag("post"),
 *   options: {
 *     dynamic: {
 *       paramValues: {
 *         page: 1,
 *         search: "react",
 *       },
 *       life: "seconds",
 *     },
 *   },
 * });
 *
 * ----------------------------------------
 *
 * ⚠️ Notes
 * - paramValues ที่เป็น undefined, null, "" หรือ [] จะไม่ถูกนำไปสร้าง tag
 * - ถ้ามี dynamic tag จะ override life ด้วย dynamicLife (default = "seconds")
 *
 * 💡 Best Practice
 * - ใช้ tag แยกตาม feature (เช่น user, post)
 * - ใช้ global tag สำหรับ list, entity tag สำหรับ detail
 * - ใช้ dynamic tag สำหรับ query/filter
 */
export function applyCacheConfig({ life, tag, options }: CachingType) {
  // ถ้ามี dynamic ให้สร้าง tag ใหม่ โดยเอา tag หลัก + param ที่ไม่ว่าง
  if (options?.dynamic) {
    const { paramValues, life: dynamicLife = "seconds" } = options.dynamic;

    // เริ่มต้น tagList จาก tag ที่ส่งมา (ถ้าเป็น string ให้แปลงเป็น array)
    let tagList: string[] = [];
    if (typeof tag === "string") {
      tagList = [tag];
    } else if (Array.isArray(tag)) {
      tagList = [...tag];
    }

    // เพิ่ม key=value ของ param ที่มีค่า
    for (const [key, value] of Object.entries(paramValues)) {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        tagList.push(`${key}:${value}`);
      }
    }

    if (tagList.length > 1) {
      // แทน tag ด้วย tagList ที่สร้างใหม่
      tag = tagList;

      // ถ้ามี dynamicLife ให้ override life
      life = dynamicLife;
    }
  }

  switch (life) {
    case "default":
      unstable_cacheLife("default");
      break;
    case "max":
      unstable_cacheLife("max");
      break;
    case "seconds":
      unstable_cacheLife("seconds");
      break;
    case "minutes":
      unstable_cacheLife("minutes");
      break;
    case "hours":
      unstable_cacheLife("hours");
      break;
    case "days":
      unstable_cacheLife("days");
      break;
    case "weeks":
      unstable_cacheLife("weeks");
      break;
    default:
      // fallback ถ้ามี case ที่ไม่คาดคิด
      console.warn("Unknown cache life:", life);
      break;
  }
  if (Array.isArray(tag)) {
    unstable_cacheTag(...tag);
  } else {
    unstable_cacheTag(tag);
  }

  // return {
  //   tag,
  //   life,
  // };
}

// export function generateCacheTag({
//   tags,
// }: {
//   tags: (string | number | undefined)[];
// }) {
//   return tags
//     .filter((tag) => tag !== undefined && tag !== null && tag !== "")
//     .map(String)
//     .join("-");
// }
