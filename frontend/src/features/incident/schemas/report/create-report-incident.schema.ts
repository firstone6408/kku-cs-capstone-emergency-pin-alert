import z from "zod";

export const createReportIncidentSchema = z.object({
  incidentTypeId: z.number().min(1, "กรุณาเลือกหัวข้อปัญหา"),
  description: z.string().min(1, "กรุณากรอกรายละเอียดปัญหา"),
  contactPhone: z
    .string()
    .regex(/^[0-9]{9,10}$/, "เบอร์โทรต้องเป็นตัวเลข 9-10 หลัก"),
  address: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  files: z.array(z.instanceof(File)),
});

export type ICreateReportIncident = z.infer<
  typeof createReportIncidentSchema
>;
