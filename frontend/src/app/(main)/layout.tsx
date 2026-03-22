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

  return children;
}
