import { LucideIcon } from "lucide-react";

export interface BaseCardProps {
  card: {
    container?: boolean;
    header?: boolean;
    content?: boolean;
    footer?: boolean;
  };
  headerTitleIcon?: LucideIcon;
  headerTitle?: React.ReactNode;
  headerDescription?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;

  className?: string;
  headerClassName?: string;
  headerTitleClassName?: string;
  headerDescriptionClassName?: string;
  contentClassName?: string;
  footerClassName?: string;

  customHeader?: React.ReactNode;
  customContent?: React.ReactNode;
  customFooter?: React.ReactNode;
}
