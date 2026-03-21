import NextForm from "next/form";
import {
  ConfirmButtonModal,
  ConfirmModal,
} from "@/components/shared/modal/confirm";

import { useState } from "react";
import { toast as Toast } from "react-toastify";

interface ConfirmConfig extends ConfirmButtonModal {
  onBeforeConfirm?: (param: { formData: FormData }) =>
    | FormData
    | {
        message?: string;
      };
}

interface FormProps {
  id?: string;
  children: React.ReactNode;
  action: (formData: FormData) => void;
  onChange?: React.FormEventHandler<HTMLFormElement> | undefined;
  confirmConfig?: ConfirmConfig;

  className?: string;
}

export function Form({
  id,
  children,
  action,
  onChange,
  className,
  confirmConfig,
}: FormProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setFormData(data);

    if (confirmConfig) setOpen(true); // เปิด confirm modal
  };

  const handleConfirm = () => {
    if (!formData) return;
    let currentOpen = open;
    if (confirmConfig?.onBeforeConfirm) {
      const result = confirmConfig.onBeforeConfirm({ formData });
      if (result instanceof FormData) {
        action(result);
        currentOpen = false;
      } else {
        Toast.error(result.message || "เกิดข้อผิดพลาด");
        currentOpen = true;
      }
    } else {
      action(formData);
      currentOpen = false;
    }

    setOpen(currentOpen);

    return {
      open: currentOpen,
    };
  };

  if (confirmConfig) {
    return (
      <>
        <form
          id={id}
          className={className}
          onSubmit={handleFormSubmit}
          onChange={onChange}
        >
          {children}
        </form>

        {/* Modal */}
        {confirmConfig && (
          <ConfirmModal
            open={open}
            onOpenChange={setOpen}
            onConfirm={handleConfirm}
            {...confirmConfig}
          />
        )}
      </>
    );
  } else {
    return (
      <NextForm
        id={id}
        className={className}
        action={action}
        onChange={onChange}
      >
        {children}
      </NextForm>
    );
  }
}
