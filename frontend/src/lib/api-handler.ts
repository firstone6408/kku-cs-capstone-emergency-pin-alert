/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */

import axios, { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

/**
 * 🔧 Create a standard API response schema
 *
 * ใช้สำหรับ validate response ที่มีรูปแบบมาตรฐานจาก backend:
 * ```ts
 * {
 *   ok: boolean
 *   status: number
 *   message: string
 *   data: T
 *   timestamp: string
 * }
 * ```
 *
 * @param zodSchema - schema ของ data field
 * @returns Zod schema สำหรับ validate response ทั้งก้อน
 *
 * @example
 * const userSchema = z.object({ id: z.string(), name: z.string() });
 * const responseSchema = createApiResponseSchema(userSchema);
 */
function createApiResponseSchema<T>(zodSchema: z.ZodSchema<T>) {
  return z.object({
    ok: z.boolean(),
    status: z.number(),
    message: z.string(),
    data: zodSchema,
    timestamp: z.string(),
  });
}

/**
 * 🔒 Validate response จาก server ด้วย Zod schema
 *
 * @internal ใช้ภายใน handleApiRequest เท่านั้น
 *
 * @throws Error ถ้า response ไม่ตรง schema
 */
function validateResponseFromServer<T>(
  axiosResponse: AxiosResponse<any>,
  responseSchema: z.ZodSchema<T>,
) {
  //  console.log(axiosResponse.data);

  const validatedResult = responseSchema.safeParse(axiosResponse.data);
  if (!validatedResult.success) {
    const errorMessage = validatedResult.error.message;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }

  return validatedResult.data;
}

// --------------------------------------------------------------------------------------------

/**
 * 📦 Result type ของ handleApiRequest
 */
type handleApiRequestResType<T> = {
  error: {
    status: "success" | "error";
    errorMessage: string;
  };
  result: T;
};

/**
 * 🚀 Handle API request
 *
 * Features:
 * - error handling (Axios + unknown)
 * - response validation (optional, using Zod)
 * - รองรับทั้ง Promise และ function
 *
 * @param request - Promise หรือ function ที่ return Promise (เช่น axios.get)
 * @param config.option.validateResponse - Zod schema สำหรับ validate response
 *
 * @returns { result, error }
 *
 * ----------------------------------------
 *
 * 🟢 Basic Usage
 *
 * @example
 * const { result, error } = await handleApiRequest(
 *   axios.get("/api/hello")
 * );
 *
 * if (error.status === "error") {
 *   console.error(error.errorMessage);
 * }
 *
 * console.log(result);
 *
 * ----------------------------------------
 *
 * 🟢 With Zod Validation
 *
 * @example
 * const helloSchema = z.object({
 *   message: z.string(),
 * });
 *
 * const { result, error } = await handleApiRequest(
 *   axios.get("/api/hello"),
 *   {
 *     option: {
 *       validateResponse: helloSchema,
 *     },
 *   }
 * );
 *
 * ----------------------------------------
 *
 * 🟢 Using Function (lazy execution)
 *
 * @example
 * const { result } = await handleApiRequest(
 *   () => axios.get("/api/hello")
 * );
 *
 * ----------------------------------------
 *
 * ⚠️ Notes
 * - result อาจเป็น undefined ถ้า error เกิดขึ้น
 * - ควรเช็ค error.status ก่อนใช้งาน result
 *
 * 💡 Best Practice
 * - ใช้ร่วมกับ schema แยกไฟล์ (schemas/)
 * - ใช้ผ่าน service layer (features/.../services)
 */
async function handleApiRequest<T>(
  request: Promise<any> | (() => Promise<any>),
  config?: {
    option?: {
      validateResponse?: z.ZodSchema<T>;
    };
  },
): Promise<handleApiRequestResType<T>> {
  let status: handleApiRequestResType<T>["error"]["status"] = "success";
  let errorMessage = "No error";
  let result;
  try {
    // รองรับทั้งสองแบบ: function หรือ promise
    if (typeof request === "function") {
      result = await request();
    } else {
      result = await request;
    }
    if (config) {
      const { option } = config;
      if (option?.validateResponse) {
        result = validateResponseFromServer(
          result,
          option.validateResponse,
        );
      }
    }
  } catch (error: any) {
    status = "error";
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data.message || "Unknown Axios error";
    } else {
      errorMessage = String(error);
    }
  }

  return { result, error: { status, errorMessage } };
}

export { createApiResponseSchema, handleApiRequest, axios };
