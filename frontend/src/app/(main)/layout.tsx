import { MainHeader } from "@/components/layout/main/header";
import { MainSidebar } from "@/components/layout/main/sidebar";
import { SidebarProvider } from "@/components/providers/sidebar-provider";
import { UserRoleEnum } from "@/features/auth/schemas/user.schema";
import { getAuthenticatedUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Fragment } from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}
export default async function MainLayout({
  children,
}: Readonly<MainLayoutProps>) {
  const { user } = await getAuthenticatedUser();

  if (user.role === UserRoleEnum.ADMIN) {
    redirect("/admin");
  }

  return (
    <Fragment>
      {/* Desktop */}
      <div className="hidden sm:flex flex-col h-screen">
        <SidebarProvider>
          <div className="min-h-svh flex">
            <MainSidebar user={user} />
            <div className="flex-1 flex flex-col overflow-hidden ">
              <MainHeader />
              <main
                className={
                  "flex-1 overflow-y-auto  pt-16 ml-0 md:ml-64 transition-all duration-300"
                }
              >
                <div className="p-4 sm:p-6 space-y-4 size-full">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </div>

      {/* Mobile */}
      <div className="flex sm:hidden flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </Fragment>
  );
}
