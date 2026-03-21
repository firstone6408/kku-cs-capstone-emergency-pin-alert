interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({
  children,
}: Readonly<AuthLayoutProps>) {
  return (
    <div className="min-h-svh flex flex-col justify-center bg-muted">
      <main>{children}</main>
    </div>
  );
}
