"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { ReportIncidentFormObject } from "../report-incident-container";
import { useForm } from "@/hooks/use-form";
import { createReportIncidentAction } from "@/features/incident/actions/report-incident.action";
import { Form } from "@/lib/form";
import { SubmitButton } from "@/components/shared/button/submit-button";

interface ControlStepButtonProps {
  currentStep: number;
  handlePrevStep: () => void;
  handleNextStep: () => void;
  reportIncidentFormObject: ReportIncidentFormObject;
  isNextDisabled?: boolean;
}

export function ControlStepButton({
  currentStep,
  handlePrevStep,
  handleNextStep,
  reportIncidentFormObject,
  isNextDisabled,
}: ControlStepButtonProps) {
  const { formAction, isPending } = useForm({
    action: createReportIncidentAction,
    redirectTo: "/",
    mode: "controlled",
  });

  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        className="h-12 "
        variant={"outline"}
        size={"lg"}
        onClick={handlePrevStep}
        disabled={currentStep === 0}
      >
        <span>ย้อนกลับ</span>
        <span>
          <ArrowLeft />
        </span>
      </Button>
      {currentStep === 2 ? (
        // Submit
        <Form
          action={formAction}
          className="col-span-2"
          confirmConfig={{
            title: "ส่งการแจ้งเหตุไปยังเจ้าหน้าที่",
            description:
              "⚠️ กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนส่ง ทีมช่วยเหลือจะได้รับแจ้งทันที",

            onBeforeConfirm: ({ formData }) => {
              // console.log(reportIncidentFormObject);
              // return {
              //   message: "TEST",
              // };

              formData.append(
                "incident-type-id",
                reportIncidentFormObject.incidentType?.id.toString() || "",
              );
              formData.append(
                "report-incident-description",
                reportIncidentFormObject.description!,
              );
              formData.append(
                "report-incident-contact-phone",
                reportIncidentFormObject.contactPhone!,
              );
              formData.append(
                "report-incident-location",
                JSON.stringify(reportIncidentFormObject.location),
              );

              reportIncidentFormObject.files?.forEach((file) => {
                formData.append("files", file);
              });

              return formData;
            },
          }}
        >
          <SubmitButton
            className="h-12 w-full"
            size={"lg"}
            isPending={isPending}
            icon={Save}
          >
            <span>ส่งการแจ้งเหตุ</span>
          </SubmitButton>
        </Form>
      ) : (
        // Next
        <Button
          className="h-12 col-span-2"
          size={"lg"}
          onClick={handleNextStep}
          disabled={isNextDisabled}
        >
          <span>ถัดไป</span>
          <span>
            <ArrowRight />
          </span>
        </Button>
      )}
    </div>
  );
}
