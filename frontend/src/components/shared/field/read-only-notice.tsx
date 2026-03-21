import { X } from "lucide-react";

export function ReadOnlyNotice() {
  return (
    <p className="flex items-center gap-1 font-semibold text-destructive text-[12px]">
      <X className="font-semibold" size={12} />
      ไม่สามารถแก้ไขได้
    </p>
  );
}
