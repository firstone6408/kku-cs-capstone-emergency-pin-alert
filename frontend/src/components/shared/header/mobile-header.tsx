"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { ToggleThemeButton } from "../button/toggle-theme-button";
import { useRouter } from "next/navigation";

interface MobileHeaderProps {
  className?: string;
  title: string;
}

export function MobileHeader({
  className,
  title,
  // href,
}: MobileHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      className={cn(
        "fixed z-100 w-full backdrop-blur-sm md:rounded-t-xl px-4 py-4 gap-3 border-b border-border flex justify-between items-center",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <button
          onClick={handleBack}
          className="p-1 -ml-1 rounded-lg hover:bg-muted transition-colors"
        >
          <ArrowLeft className="size-5 text-foreground" />
        </button>

        <h1 className="text-xl font-bold text-foreground">{title}</h1>
      </div>

      <ToggleThemeButton size={"lg"} />
    </div>
  );
}
