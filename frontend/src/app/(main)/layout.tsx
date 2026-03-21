import { getAuthenticatedUser } from "@/lib/auth";

interface MainLayoutProps {
  children: React.ReactNode;
}
export default async function MainLayout({
  children,
}: Readonly<MainLayoutProps>) {
  const {} = await getAuthenticatedUser();

  return children;
}
