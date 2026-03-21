import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export interface SubmitButtonProps extends ButtonProps {
  children?: React.ReactNode;
  icon?: LucideIcon;
  isPending?: boolean;
  className?: string;
}
