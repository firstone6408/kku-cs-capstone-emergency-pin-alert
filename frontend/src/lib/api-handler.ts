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

interface GetHeadersOptions {
  token?: string; // ถ้าต้องการส่ง token
  uploadHeaders?: boolean; // ถ้าต้องการใช้ Content-Type สำหรับการอัปโหลดไฟล์
  jsonContent?: boolean; // ถ้าต้องการใช้ Content-Type เป็น application/json
  customHeaders?: Record<string, string>; // ถ้ามี headers พิเศษ
  corsHeaders?: boolean; // ถ้าต้องการ CORS headers
  acceptHeader?: string; // ถ้าอยากตั้งค่า Accept header
  cacheControl?: string; // ถ้าอยากตั้งค่า Cache-Control
  csrfToken?: string; // ถ้าใช้ CSRF token
  userAgent?: string; // ถ้าต้องการระบุ User-Agent
  cookie?: string; // ถ้าต้องการส่ง cookie
  xFrameOptions?: string; // ถ้าต้องการตั้งค่า X-Frame-Options
  pragma?: string; // ถ้าต้องการตั้งค่า Pragma
  contentDisposition?: string; // ถ้าต้องการตั้งค่า Content-Disposition
}

/**
 * ฟังก์ชันนี้ใช้สำหรับสร้าง HTTP headers ตามตัวเลือกที่กำหนด
 * สามารถใช้ในการตั้งค่าหรือจัดการ header ต่างๆ ตามความต้องการ เช่น การส่ง token, การอัปโหลดไฟล์, การตั้งค่า Content-Type, และอื่นๆ
 *
 * This function is used to create HTTP headers based on the provided options.
 * It can be used to set or manage various headers as needed, such as sending a token, file uploads, Content-Type settings, and more.
 *
 * @param {Object} options - อ็อบเจ็กต์ที่มีตัวเลือกสำหรับตั้งค่า headers
 * @param {boolean} options.token - ถ้าต้องการส่ง token จะเพิ่ม Authorization header
 * @param {boolean} options.uploadHeaders - ถ้าต้องการใช้ Content-Type สำหรับการอัปโหลดไฟล์
 * @param {boolean} options.jsonContent - ถ้าต้องการตั้งค่า Content-Type เป็น application/json
 * @param {Record<string, string>} options.customHeaders - ถ้ามี headers พิเศษที่ต้องการเพิ่ม
 * @param {boolean} options.corsHeaders - ถ้าต้องการ CORS headers (เช่น Accept, Origin, X-Requested-With)
 * @param {string} options.acceptHeader - ถ้าต้องการตั้งค่า Accept header
 * @param {string} options.cacheControl - ถ้าต้องการตั้งค่า Cache-Control
 * @param {string} options.csrfToken - ถ้าต้องการใช้ CSRF token
 * @param {string} options.userAgent - ถ้าต้องการระบุ User-Agent
 * @param {string} options.cookie - ถ้าต้องการส่ง Cookie
 * @param {string} options.xFrameOptions - ถ้าต้องการตั้งค่า X-Frame-Options
 * @param {string} options.pragma - ถ้าต้องการตั้งค่า Pragma
 * @param {string} options.contentDisposition - ถ้าต้องการตั้งค่า Content-Disposition
 *
 * @returns {Record<string, string>} - อ็อบเจ็กต์ของ headers ที่สร้างขึ้น
 *
 * @example
 * const headers = buildHeaders({
 *   token: "YOUR_TOKEN",
 *   uploadHeaders: true,
 *   jsonContent: true,
 *   acceptHeader: 'application/json',
 *   csrfToken: 'example-csrf-token',
 * });
 * // ผลลัพธ์จะเป็นอ็อบเจ็กต์ที่มี header ตามที่กำหนด
 *
 * @example
 * const headers = buildHeaders({
 *   customHeaders: {
 *     'X-Custom-Header': 'value',
 *     'X-Another-Header': 'another-value',
 *   },
 * });
 * // ผลลัพธ์จะเป็นอ็อบเจ็กต์ที่รวม custom headers ด้วย
 */
const buildHeaders = ({
  token,
  uploadHeaders,
  jsonContent,
  customHeaders,
  corsHeaders,
  acceptHeader,
  cacheControl,
  csrfToken,
  userAgent,
  cookie,
  xFrameOptions,
  pragma,
  contentDisposition,
}: GetHeadersOptions) => {
  const headers: Record<string, string> = {};

  // ถ้าต้องการ token ให้เพิ่ม Authorization header
  if (token) {
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  // ถ้าต้องการ headers สำหรับการอัปโหลดไฟล์
  if (uploadHeaders) {
    headers["Content-Type"] = "multipart/form-data";
  }

  // ถ้าต้องการ Content-Type เป็น application/json
  if (jsonContent) {
    headers["Content-Type"] = "application/json";
  }

  // ถ้ามี headers พิเศษที่ต้องการเพิ่ม
  if (customHeaders) {
    Object.assign(headers, customHeaders); // เพิ่ม custom headers
  }

  // ถ้าต้องการ CORS headers (เช่น Accept, Origin, X-Requested-With)
  if (corsHeaders) {
    headers["Accept"] = "application/json"; // default เป็น json
    headers["X-Requested-With"] = "XMLHttpRequest";
    headers["Origin"] = window.location.origin; // ใช้ origin ของ current window
  }

  // ถ้าต้องการตั้งค่า Accept header
  if (acceptHeader) {
    headers["Accept"] = acceptHeader;
  }

  // ถ้าต้องการตั้งค่า Cache-Control header
  if (cacheControl) {
    headers["Cache-Control"] = cacheControl;
  }

  // ถ้าต้องการใช้ CSRF token
  if (csrfToken) {
    headers["X-CSRF-Token"] = csrfToken;
  }

  // ถ้าต้องการระบุ User-Agent
  if (userAgent) {
    headers["User-Agent"] = userAgent;
  }

  // ถ้าต้องการส่ง Cookie
  if (cookie) {
    headers["Cookie"] = cookie;
  }

  // ถ้าต้องการตั้งค่า X-Frame-Options
  if (xFrameOptions) {
    headers["X-Frame-Options"] = xFrameOptions;
  }

  // ถ้าต้องการตั้งค่า Pragma
  if (pragma) {
    headers["Pragma"] = pragma;
  }

  // ถ้าต้องการตั้งค่า Content-Disposition
  if (contentDisposition) {
    headers["Content-Disposition"] = contentDisposition;
  }

  return headers;
};

export { createApiResponseSchema, handleApiRequest, axios, buildHeaders };
