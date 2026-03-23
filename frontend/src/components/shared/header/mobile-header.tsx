import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface MobileHeaderProps {
  className?: string;
  title: string;
  href?: string;
}

export function MobileHeader({
  className,
  title,
  href,
}: MobileHeaderProps) {
  return (
    <div
      className={cn(
        "bg-background md:rounded-t-xl px-4 pt-6 pb-4 flex items-center gap-3 border-b border-border",
        className,
      )}
    >
      {href && (
        <Link
          href={href}
          className="p-1 -ml-1 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="size-5 text-foreground" />
        </Link>
      )}

      <h1 className="text-xl font-bold text-foreground">{title}</h1>
    </div>
  );
}
