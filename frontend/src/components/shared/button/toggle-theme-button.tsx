"use client";

import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/types/components/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function ToggleThemeButton({ children, ...props }: ButtonProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button
      className="cursor-pointer"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      {...props}
    >
      {children || (
        <>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </>
      )}
    </Button>
  );
}
