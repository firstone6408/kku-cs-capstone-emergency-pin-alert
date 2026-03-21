import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ErrorActionType } from "@/types/actions/action";
import { LabeledControl } from "./labeled-control";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name?: string;
  errorMessage?: React.ReactNode | ErrorActionType;
  optional?: boolean;
  hiddenIcon?: boolean;
  description?: React.ReactNode | string;
}

export function InputField({
  label,
  name,
  required = false,
  optional,
  hiddenIcon,
  errorMessage,
  description,
  ...props
}: InputFieldProps) {
  return (
    <>
      <LabeledControl
        label={label}
        name={name}
        required={required}
        errorMessage={errorMessage}
        readOnly={props.readOnly}
        optional={optional}
        hiddenIcon={hiddenIcon}
        description={description}
      >
        <Input
          id={name}
          name={name}
          required={required}
          readOnly={props.readOnly}
          {...props}
          className={cn(
            props.readOnly && "cursor-default input-readonly",
            props.className,
          )}
        />
      </LabeledControl>
    </>
  );
}
