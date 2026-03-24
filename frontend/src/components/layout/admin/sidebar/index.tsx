"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/providers/sidebar-provider";
import {
  LayoutDashboard,
  LogOut,
  Proportions,
  ShieldPlus,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarLink } from "./sidebar-link";
import { IUser } from "@/features/auth/schemas/user.schema";

interface SidebarLinkType {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SIDE_BAR_LINKS: SidebarLinkType[] = [
  {
    label: "หน้าหลัก",
    href: "/admin",
    icon: <LayoutDashboard size={20} />,
  },
];

const INCIDENT_LINKS: SidebarLinkType[] = [
  {
    label: "ประเภทการแจ้งเหตุ",
    href: "/admin/incident-types",
    icon: <Proportions size={20} />,
  },
  // {
  //   label: "แจ้งเหตุ",
  //   href: "/admin/incidents",
  //   icon: <Proportions size={20} />,
  // },
];

const USER_LINKS: SidebarLinkType[] = [
  {
    label: "ผู้แจ้งเหตุ",
    href: "/admin/reporters",
    icon: <Users size={20} />,
  },
  {
    label: "เจ้าหน้าที่",
    href: "/admin/staffs",
    icon: <Users size={20} />,
  },
];

interface AdminSidebarProps {
  user: IUser;
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  // ใช้เพื่อทำ Link Active
  const pathname = usePathname();

  return (
    <div>
      {/* Moblie Overlay */}
      {/* ให้กดตรงไหนก็ได้ แล้วให้ปิด sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => toggleSidebar()}
        />
      )}

      {/* Sidebar */}
      <aside
        // การกำหนดการ หุบของ sidebar ถ้ามือถือให้หุบ ถ้าจอใหญ่ไม่ต้องหุบ
        className={cn(
          "fixed top-0 start-0 z-40 h-svh w-64 bg-card border-r rounded-r-xl md:rounded-none flex flex-col transition-all duration-300",
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b bg-log">
          {/* Logo */}
          <Link href={"/"}>
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1 rounded-md">
                <span className="text-secondary font-bold">Emergency</span>
              </div>
              <span className="text-xl font-bold">Admin</span>
            </div>
          </Link>

          {/* Toggle Sidebar Button */}
          <Button
            variant={"ghost"}
            size={"icon"}
            className="md:hidden"
            onClick={() => toggleSidebar()}
          >
            <X size={20} />
          </Button>
        </div>

        {/* Main Content Area */}
        {/* h-[calc(100wv-128px)] คือ ถ้าจอสูงแค่ไหนจะถูกลบไป 128px */}
        <div className="flex-1 h-[calc(100wv-128px)] overflow-hidden">
          <ScrollArea>
            <div className="p-4">
              {/* Profile box */}
              <div className="flex items-center gap-3 bg-muted p-3 rounded-lg mb-6">
                <Avatar className="size-10 border-2 border-primary shadow">
                  {/* <AvatarImage
                    src={user.picture || undefined}
                    alt={`${user.email}-image-profile`}
                  /> */}
                  <AvatarFallback className="text-lg">
                    {user.email.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold leading-none">
                    {user.fullName || "User"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Menu */}
              <nav className="space-y-2">
                {SIDE_BAR_LINKS.map((sidebarLink) => (
                  <SidebarLink
                    key={sidebarLink.href}
                    label={sidebarLink.label}
                    href={sidebarLink.href}
                    icon={sidebarLink.icon}
                    isActive={pathname === sidebarLink.href}
                    onClose={() => toggleSidebar()}
                  />
                ))}

                {/* Incident Section */}
                <h4 className="text-sm text-muted-foreground flex items-center gap-1 pt-3">
                  <ShieldPlus size={14} />
                  <span>จัดการผู้ใช้</span>
                </h4>
                {INCIDENT_LINKS.map((sidebarLink) => (
                  <SidebarLink
                    key={sidebarLink.href}
                    label={sidebarLink.label}
                    href={sidebarLink.href}
                    icon={sidebarLink.icon}
                    isActive={pathname === sidebarLink.href}
                    onClose={() => toggleSidebar()}
                  />
                ))}

                {/* User Section */}
                <h4 className="text-sm text-muted-foreground flex items-center gap-1 pt-3">
                  <ShieldPlus size={14} />
                  <span>จัดการผู้ใช้</span>
                </h4>
                {USER_LINKS.map((sidebarLink) => (
                  <SidebarLink
                    key={sidebarLink.href}
                    label={sidebarLink.label}
                    href={sidebarLink.href}
                    icon={sidebarLink.icon}
                    isActive={pathname === sidebarLink.href}
                    onClose={() => toggleSidebar()}
                  />
                ))}
              </nav>
            </div>
          </ScrollArea>
        </div>

        {/* Footer Section */}
        <div className="border-t p-2">
          <LogoutButton
            icon={LogOut}
            variant={"destructive"}
            className="w-full"
            size={"lg"}
          >
            ออกจากระบบ
          </LogoutButton>
        </div>
      </aside>
    </div>
  );
}
