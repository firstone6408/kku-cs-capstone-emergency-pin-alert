import { ButtonNavigation } from "@/components/layout/navigation/buttom-navigation";
import { DesktopNavigation } from "@/components/layout/navigation/desktop-navigation";
import { UserRoleEnum } from "@/features/auth/schemas/user.schema";
import { getAuthenticatedUser } from "@/lib/auth";
import { redirect } from "next/navigation";

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
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Top Navigation */}
      <header className="hidden sm:block shrink-0">
        <DesktopNavigation className="sticky top-0 z-50 w-full " />
      </header>

      <main className="flex-1 overflow-hidden mb-16 sm:mb-0">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="block sm:hidden shrink-0">
        <ButtonNavigation className="fixed bottom-0 left-0 w-full z-50" />
      </nav>
    </div>
  );
}
