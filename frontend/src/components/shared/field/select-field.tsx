import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectFieldProps } from "@/types/components/select";

type Option = {
  value: string;
  label: string;
};

interface SelectFieldUnifiedProps extends SelectFieldProps {
  data: string[] | Record<string, string> | Option[];
}

function normalizeData(data: SelectFieldUnifiedProps["data"]): Option[] {
  // array of string
  if (Array.isArray(data) && typeof data[0] === "string") {
    return (data as string[]).map((item) => ({
      value: item,
      label: item,
    }));
  }

  // array of object
  if (Array.isArray(data)) {
    return data as Option[];
  }

  // record
  return Object.entries(data).map(([key, value]) => ({
    value: key,
    label: value,
  }));
}

export function SelectField({
  data,
  translateFn,
  placeholder,
  className,
  autoFocus,
  ...props
}: SelectFieldUnifiedProps) {
  const options = normalizeData(data);

  return (
    <Select {...props}>
      <SelectTrigger
        className={cn("h-10!", className)}
        autoFocus={autoFocus}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.length > 0 ? (
          options.map((opt, index) => (
            <SelectItem key={index} value={opt.value}>
              {translateFn ? translateFn(opt.label) : opt.value}
            </SelectItem>
          ))
        ) : (
          <SelectItem
            value="not-found"
            className="text-red-500 font-semibold"
            disabled
          >
            ไม่พบตัวเลือก
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
