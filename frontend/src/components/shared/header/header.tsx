import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function Header({ title, description, className }: HeaderProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
