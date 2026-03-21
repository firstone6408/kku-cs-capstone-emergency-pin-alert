import { Label } from "@/components/ui/label";
import { RequiredMark } from "./required-mark";
import { ReadOnlyNotice } from "./read-only-notice";
import { OptionalNotice } from "./optional-notice";
import { cn } from "@/lib/utils";
import { ErrorActionType } from "@/types/actions/action";
import { ErrorMessage } from "../error/error-message";

export interface LabeledControlProps {
  label?: string;
  size?: "sm" | "lg" | "default";
  name?: string;
  required?: boolean;
  errorMessage?: React.ReactNode | ErrorActionType;
  children?: React.ReactNode;
  readOnly?: boolean;
  optional?: boolean;
  hiddenIcon?: boolean;
  description?: React.ReactNode | string;
}

export function LabeledControl({
  label,
  size = "default",
  name,
  required = false,
  readOnly = false,
  optional = false,
  errorMessage,
  hiddenIcon = false,
  children,
  description,
}: LabeledControlProps) {
  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <div>
          {label && (
            <Label
              htmlFor={name}
              className={cn(
                "font-semibold h-6",
                size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "",
              )}
            >
              {label}{" "}
              {!hiddenIcon && (
                <>
                  {required && <RequiredMark />}
                  {readOnly && <ReadOnlyNotice />}
                  {optional && <OptionalNotice />}
                </>
              )}
            </Label>
          )}
          {/* Description */}
          {description && typeof description === "string" ? (
            <p className="text-destructive text-sm">{description}</p>
          ) : (
            description
          )}
        </div>
        {/* Input ... */}
        {children}
      </div>
      {/* Error Message */}
      <>
        {typeof errorMessage === "string" ||
        Array.isArray(errorMessage) ? (
          <ErrorMessage message={errorMessage[0]} />
        ) : (
          <>{errorMessage}</>
        )}
      </>
    </div>
  );
}
