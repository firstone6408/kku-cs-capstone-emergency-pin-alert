import { AdminSidebar } from "@/components/layout/admin/sidebar/admin-sidebar";
import { ToggleThemeButton } from "@/components/shared/button/toggle-theme-button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UserRoleEnum } from "@/features/auth/schemas/user.schema";
import { getAuthenticatedUser } from "@/lib/auth";
import { redirect } from "next/navigation";

interface AdminLaytouProps {
  children: React.ReactNode;
}

export default async function AdminLaytou({ children }: AdminLaytouProps) {
  const { user } = await getAuthenticatedUser();

  if (user.role !== UserRoleEnum.ADMIN) {
    redirect("/");
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AdminSidebar user={user} />
        <main className="p-4 sm:p-6 space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <SidebarTrigger />
            <ToggleThemeButton />
          </div>
          {children}
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
