import { cn } from "@/lib/utils";
import { MapPin, User } from "lucide-react";
import Link from "next/link";

interface DesktopNavigationProps {
  className?: string;
}

export function DesktopNavigation({ className }: DesktopNavigationProps) {
  return (
    <header
      className={cn(
        "border-b bg-background dark:bg-muted backdrop-blur px-6 py-3",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-orange-600"
        >
          <MapPin className="size-5" />
          KKU Alert
        </Link>

        {/* Right: Profile */}
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-full px-3 py-1.5 hover:bg-orange-50 transition"
        >
          <User className="size-4 text-orange-600" />
          <span className="text-sm font-medium">โปรไฟล์</span>
        </Link>
      </div>
    </header>
  );
}
