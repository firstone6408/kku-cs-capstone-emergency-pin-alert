import { Search } from "lucide-react";
import { InputField } from "../field/input-field";
import { cn } from "@/lib/utils";

interface InputSearchProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  placeholder: string;
}

export function InputSearch({
  setSearchTerm,
  className,
  placeholder,
}: InputSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        size={16}
        className="absolute left-2.5 top-6.5 -translate-y-1/2 text-gray-400"
      />
      <InputField
        placeholder={placeholder}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="pl-8"
      />
    </div>
  );
}
