import { useState } from "react";

export function useModal<T>() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<T | null>(null);

  const openModal = (input: T | (() => T)) => {
    // console.log(isOpen);
    const value =
      typeof input === "function" ? (input as () => T)() : input;
    setSelected(value);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelected(null);
  };

  return {
    isOpen,
    selected,
    openModal,
    closeModal,
    setIsOpen,
  };
}
