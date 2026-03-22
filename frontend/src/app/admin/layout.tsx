import { AdminSidebar } from "@/components/layout/admin/sidebar/admin-sidebar";
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
        <main>
          <SidebarTrigger />
          <div className="p-3">{children}</div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
