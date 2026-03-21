import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModalProps } from "@/types/components/modal";
import { cn } from "@/lib/utils";

interface ModalProp extends ModalProps {
  children: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  trigger?: React.ReactNode;
  useServer?: boolean;
}

export function Modal({
  children,
  onOpenChange,
  open,
  title,
  description,
  className,
  trigger,
  useServer = false,
}: ModalProp) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger}
      <DialogOverlay className="backdrop-blur-sm bg-black/20 dark:bg-white/20" />
      <DialogContent
        className={cn(
          "sm:max-w-lg transition-all duration-200",
          open
            ? "opacity-100 scale-100"
            : `${!useServer && "opacity-0 scale-95"}`,
          className,

          // use server คือ ตอนที่ render แบบ server site open มันจะไม่ถูก trigger
          // แล้วมันจะไปแล้ว else เลยทำให้ content ไม่ขึ้น เลยดักด้วย use server
        )}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {/* Content */}
        <div className="overflow-y-auto p-1">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

interface ModalTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function ModalTrigger({ children, asChild }: ModalTriggerProps) {
  return <DialogTrigger asChild={asChild}>{children}</DialogTrigger>;
}

interface ModalCloseProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}
export function ModalClose({
  children,
  asChild,
  className,
}: ModalCloseProps) {
  return (
    <DialogClose asChild={asChild} className={className}>
      {children}
    </DialogClose>
  );
}
