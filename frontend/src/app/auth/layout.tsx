import { cookie } from "@/lib/cookie";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({
  children,
}: Readonly<AuthLayoutProps>) {
  const token = await cookie.getToken();

  if (token) {
    redirect("/");
  }

  return (
    <div className="min-h-svh flex flex-col justify-center bg-muted">
      <main>{children}</main>
    </div>
  );
}
