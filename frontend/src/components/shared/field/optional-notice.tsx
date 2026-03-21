import { Circle } from "lucide-react";

export function OptionalNotice() {
  return (
    <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
      <Circle size={12} />
      ไม่จำเป็นต้องกรอก
    </p>
  );
}
