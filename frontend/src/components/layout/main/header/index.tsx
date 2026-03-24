"use client";

import { useSidebar } from "@/components/providers/sidebar-provider";
import { ToggleThemeButton } from "@/components/shared/button/toggle-theme-button";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function MainHeader() {
  const { toggleSidebar, isSidebarOpen } = useSidebar();

  return (
    <header
      className={`fixed top-0 inset-x-0 ${
        isSidebarOpen ? "md:ms-64" : "ms-0 md:ms-16"
      } h-16 border-b z-10
    backdrop-blur-sm shadow-sm transition-all duration-300`}
    >
      <div className="flex justify-between items-center h-full px-4">
        <div>
          <Button
            className="cursor-pointer block md:hidden"
            variant={"outline"}
            onClick={() => toggleSidebar()}
          >
            <Menu size={20} />
          </Button>
        </div>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-2">
          <ToggleThemeButton />
        </div>
      </div>
    </header>
  );
}
