import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SidebarLinkProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClose: () => void;
}

export function SidebarLink({
  label,
  href,
  icon,
  isActive,
  onClose,
}: SidebarLinkProps) {
  return (
    <Button
      onClick={() => onClose()}
      variant={isActive ? "secondary" : "ghost"}
      asChild
    >
      <Link
        href={href}
        className={cn(
          "w-full justify-start gap-3",
          // เมื่อ Active font จะหน้าขึ้น
          isActive
            ? "font-semibold"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        {icon}
        <span>{label}</span>
      </Link>
    </Button>
  );
}
