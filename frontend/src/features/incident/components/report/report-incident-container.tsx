"use client";

import { IIncidentType } from "@/features/incident-type/schemas/incident-type.schema";
import { useState } from "react";
import { ReportStepIncicator } from "./step/step-indicator";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SelectIncidentTypeStep } from "./step/select-type-step";
import { useObjectState } from "@/hooks/use-object-state";
import { ReportIncidentDetailStep } from "./step/detail-step";
import { cn } from "@/lib/utils";
import { ControlStepButton } from "./step/control-step-button";
import { IUser } from "@/features/auth/schemas/user.schema";
import { useDeviceLocation } from "@/hooks/use-device-location";
import { GoogleMapProvider } from "@/components/providers/google-map-provider";
import { ReportIncidentConfirmStep } from "./step/confirm-step";

export interface ReportIncidentFormObject {
  incidentType: IIncidentType | undefined;
  description: string | undefined;
  contactPhone: string | undefined;
  location:
    | {
        lat: number;
        lng: number;
      }
    | undefined;
  address: string | undefined;
  files: File[] | undefined;
}

interface IReportIncidentContainerProps {
  user: IUser;
  incidentTypes: IIncidentType[];
  className?: string;
}

export function ReportIncidentContainer({
  user,
  incidentTypes,
  className,
}: IReportIncidentContainerProps) {
  const { latitude, longitude, isLoading } = useDeviceLocation();

  // 3 step
  const [currentStep, setCurrentStep] = useState<number>(0);

  // object form
  const { state: form, set: setForm } =
    useObjectState<ReportIncidentFormObject>({
      incidentType: undefined,
      description: undefined,
      contactPhone: undefined,
      location: undefined,
      address: undefined,
      files: undefined,
    });

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const isStepValid = () => {
    if (currentStep === 0) {
      return form.incidentType !== undefined;
    }

    if (currentStep === 1) {
      return (
        !!form.description?.trim() &&
        !!form.contactPhone?.trim() &&
        !!form.files &&
        form.files.length > 0
      );
    }

    return true;
  };

  if (isLoading || !latitude || !longitude) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMapProvider>
      <div
        className={cn(
          "flex flex-col p-2 gap-2 h-svh md:h-full",
          className,
        )}
      >
        {/* Step Indicator */}
        <ReportStepIncicator currentStep={currentStep} />

        <Separator />

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <ScrollArea className="h-full">
            {currentStep === 0 && (
              <SelectIncidentTypeStep
                incidentTypes={incidentTypes}
                selected={form.incidentType ?? null}
                onSelect={(incident) => setForm("incidentType", incident)}
              />
            )}
            {currentStep === 1 && form.incidentType && (
              <ReportIncidentDetailStep
                user={user}
                location={{ lat: latitude, lng: longitude }}
                incidentType={form.incidentType}
                reportIncidentFormObject={form}
                setReportIncidentFormObject={setForm}
              />
            )}
            {currentStep === 2 && (
              <ReportIncidentConfirmStep
                user={user}
                reportIncidentFormObject={form}
              />
            )}
          </ScrollArea>
        </div>

        {/* Button Control */}
        <ControlStepButton
          currentStep={currentStep}
          handlePrevStep={handlePrevStep}
          handleNextStep={handleNextStep}
          reportIncidentFormObject={form}
          isNextDisabled={!isStepValid()}
        />
      </div>
    </GoogleMapProvider>
  );
}
