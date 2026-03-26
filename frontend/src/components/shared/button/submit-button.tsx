import { Button } from "@/components/ui/button";
import { SubmitButtonProps } from "@/types/components/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function SubmitButton({
  children,
  className,
  icon,
  isPending,
  ...props
}: SubmitButtonProps) {
  const Icon = icon;
  const hasIcon = !!Icon;

  return (
    <Button
      type="submit"
      className={cn("cursor-pointer", className)}
      disabled={isPending}
      {...props}
    >
      {/* มี icon */}
      {hasIcon && (
        <>
          {isPending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Icon size={16} />
          )}
        </>
      )}

      {/* ไม่มี icon */}
      {!hasIcon && isPending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        children && <span>{children}</span>
      )}
    </Button>
  );
}
