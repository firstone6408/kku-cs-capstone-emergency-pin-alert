import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ComponentProps } from "react";
import { AdminNavMain } from "./admin-nav-main";
import { ChartLine } from "lucide-react";
import { AdminNavUser } from "./admin-nav-user";
import { IUser } from "@/features/auth/schemas/user.schema";

const navLinks = {
  main: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: ChartLine,
    },
  ],
};

interface AdminSidebarProps extends ComponentProps<typeof Sidebar> {
  string?: string;
  user: IUser;
}

export function AdminSidebar({ user, ...props }: AdminSidebarProps) {
  return (
    <Sidebar {...props}>
      {/* Header Section */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/admin">
                <span className="text-base font-semibold">
                  Emergency Admin
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content Section */}
      <SidebarContent>
        <AdminNavMain items={navLinks.main} />
      </SidebarContent>

      {/* Footer Section */}
      <SidebarFooter>
        <AdminNavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
