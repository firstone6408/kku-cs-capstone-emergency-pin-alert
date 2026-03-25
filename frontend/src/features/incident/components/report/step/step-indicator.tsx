"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const STEPS = ["ประเภทเหตุ", "รายละเอียด", "ยืนยัน"];

interface ReportStepIndicatorProps {
  className?: string;
  currentStep: number;
}

export function ReportStepIncicator({
  className,
  currentStep,
}: ReportStepIndicatorProps) {
  return (
    <div className={cn("w-full grid grid-cols-3", className)}>
      {STEPS.map((label, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={index} className="">
            {/* Step */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-4 text-sm font-medium transition-all",
                  {
                    // ✅ step ที่ทำเสร็จแล้ว
                    "bg-primary text-primary-foreground border-primary":
                      isCompleted,

                    // ✅ step ปัจจุบัน (วงขาว ขอบ primary)
                    "bg-background text-primary border-primary": isCurrent,

                    // ✅ step ที่ยังไม่ถึง
                    "bg-muted text-muted-foreground border-muted":
                      !isCompleted && !isCurrent,
                  },
                )}
              >
                {isCompleted ? <Check /> : <span>{index + 1}</span>}
              </div>

              <span
                className={cn("mt-2 text-sm", {
                  "text-foreground font-medium": isCurrent,
                  "text-muted-foreground": !isCurrent,
                })}
              >
                {label}
              </span>
            </div>

            {/* Line */}
            {/* {index !== STEPS.length - 1 && (
              <div
                className={cn("flex-1 h-[2px] mx-2 transition-colors", {
                  "bg-primary": index < currentStep,
                  "bg-muted": index >= currentStep,
                })}
              />
            )} */}
          </div>
        );
      })}
    </div>
  );
}
