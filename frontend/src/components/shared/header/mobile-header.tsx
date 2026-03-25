import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ToggleThemeButton } from "../button/toggle-theme-button";

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
        "fixed w-full backdrop-blur-sm md:rounded-t-xl px-4 py-4 gap-3 border-b border-border flex justify-between items-center",
        className,
      )}
    >
      <div className="flex items-center gap-2">
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

      <ToggleThemeButton size={"lg"} />
    </div>
  );
}
