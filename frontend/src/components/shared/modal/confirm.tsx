"use client";

import { Button } from "@/components/ui/button";
import { InputField } from "../field/input-field";
import { useEffect, useState } from "react";
import { SubmitButton } from "../button/submit-button";
import { Check, LucideIcon, X } from "lucide-react";
import { Modal } from "./modal";

export interface ConfirmButtonModal {
  title?: string;
  description?: string;
  actionIcons?: {
    confirm: LucideIcon;
    cancel: LucideIcon;
  };
  confirmationTextRequired?: string;
}

interface ConfirmModalProps extends ConfirmButtonModal {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  onConfirm: () =>
    | {
        open: boolean;
      }
    | undefined;
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmationTextRequired,
  className,
  actionIcons,
  onConfirm,
}: ConfirmModalProps) {
  const [text, setText] = useState<string | undefined>(undefined);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  useEffect(() => {
    if (!open) {
      setText(undefined); // รีเซ็ตค่าเมื่อ modal ปิด
      setIsDisable(false); // ปิดปุ่มไปด้วย
    }
  }, [open]);

  useEffect(() => {
    if (confirmationTextRequired) {
      const compare = text === confirmationTextRequired;
      setIsDisable(!compare);
    }
  }, [confirmationTextRequired, text]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className={className}
      title={`ยืนยันที่จะ ${title} หรือไม่?`}
      description={description || ""}
    >
      {confirmationTextRequired && (
        <div className="mb-2">
          <InputField
            label={`กรุณาพิมพ์ "${confirmationTextRequired}" ในช่องนี้เพื่อกดยืนยัน`}
            onChange={(event) => setText(event.target.value)}
            required
          />
        </div>
      )}
      <div className="flex justify-around sm:justify-end gap-2">
        <Button
          size={"lg"}
          variant={"destructive"}
          className="cursor-pointer"
          onClick={() => onOpenChange(false)}
        >
          {actionIcons && actionIcons.cancel ? (
            <actionIcons.cancel size={16} />
          ) : (
            <X size={16} />
          )}
          <span>ยกเลิก</span>
        </Button>
        <SubmitButton
          icon={actionIcons?.confirm || Check}
          size={"lg"}
          disabled={isDisable}
          onClick={() => {
            const confirm = onConfirm();
            onOpenChange(confirm ? confirm.open : false);
          }}
        >
          ยืนยัน
        </SubmitButton>
      </div>
    </Modal>
  );
}
