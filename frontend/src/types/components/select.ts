import { Select } from "@/components/ui/select";
import { ComponentPropsWithoutRef } from "react";

export interface SelectFieldProps
  extends ComponentPropsWithoutRef<typeof Select> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translateFn?: (value: any) => any;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}
