import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectFieldProps } from "@/types/components/select";

interface SelectArrFieldProps extends SelectFieldProps {
  data: string[] | Record<string, string>;
}

interface SelectArrObjFieldProps extends SelectFieldProps {
  data: {
    value: string;
    label: string;
  }[];
}

export function SelectArrField({
  data,
  translateFn,
  placeholder,
  className,
  autoFocus,
  ...props
}: SelectArrFieldProps) {
  const values = Object.values(data);

  return (
    <Select {...props}>
      <SelectTrigger className={className} autoFocus={autoFocus}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {values.length > 0 ? (
          values.map((value, index) => (
            <SelectItem key={index} value={value}>
              {translateFn ? translateFn(value) : value}
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

export function SelectArrObjField({
  data,
  translateFn,
  placeholder,
  className,
  autoFocus,
  ...props
}: SelectArrObjFieldProps) {
  return (
    <Select {...props}>
      <SelectTrigger className={className} autoFocus={autoFocus}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data.length > 0 ? (
          data.map((value, index) => (
            <SelectItem key={index} value={value.value}>
              {translateFn ? translateFn(value.label) : value.label}
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
