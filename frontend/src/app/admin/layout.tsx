import { AdminMainContent } from "@/components/layout/admin/admin-content";
import { AdminHeader } from "@/components/layout/admin/header";
import { AdminSidebar } from "@/components/layout/admin/sidebar";
import { SidebarProvider } from "@/components/providers/sidebar-provider";
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
        <div className="min-h-svh flex">
          <AdminSidebar user={user} />
          <div className="flex-1 flex flex-col overflow-hidden ">
            <AdminHeader />
            <AdminMainContent>{children}</AdminMainContent>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
