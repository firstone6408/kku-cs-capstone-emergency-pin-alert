import { Textarea } from "@/components/ui/textarea";
import { LabeledControl } from "./labeled-control";
import { cn } from "@/lib/utils";
import { ErrorActionType } from "@/types/actions/action";

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name?: string;
  errorMessage?: React.ReactNode | ErrorActionType;
  optional?: boolean;
  hiddenIcon?: boolean;
}

export function TextareaField({
  label,
  name,
  required = false,
  optional,
  hiddenIcon,
  errorMessage,
  ...props
}: TextareaFieldProps) {
  return (
    <LabeledControl
      label={label}
      name={name}
      required={required}
      errorMessage={errorMessage}
      readOnly={props.readOnly}
      optional={optional}
      hiddenIcon={hiddenIcon}
    >
      <Textarea
        id={name}
        name={name}
        required={required}
        {...props}
        className={cn(
          props.readOnly && "cursor-default input-readonly",
          props.className,
        )}
      />
    </LabeledControl>
  );
}
