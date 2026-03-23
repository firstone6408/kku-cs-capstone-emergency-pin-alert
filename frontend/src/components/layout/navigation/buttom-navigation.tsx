import { MapPin, User } from "lucide-react";
import Link from "next/link";

interface ButtonNavigationProps {
  className?: string;
}

export function ButtonNavigation({ className }: ButtonNavigationProps) {
  return (
    <div className={className}>
      <div className="relative bg-orange-500 rounded-t-3xl px-12 pt-4 pb-6 flex justify-between items-end shadow-lg">
        {/* Left: Map */}
        <Link
          href="/"
          className="flex flex-col items-center text-white text-sm"
        >
          <MapPin className="size-5 mb-1" />
          <span>แผนที่</span>
        </Link>

        {/* Center: Big Button */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-4">
          <Link
            href="/report/create"
            className="bg-white rounded-full p-4 shadow-md border-2 flex items-center justify-center"
          >
            <MapPin className="size-10 text-orange-500" />
          </Link>
        </div>

        {/* Right: Profile */}
        <Link
          href="/profile"
          className="flex flex-col items-center text-white text-sm"
        >
          <User className="size-5 mb-1" />
          <span>โปรไฟล์</span>
        </Link>
      </div>
    </div>
  );
}
