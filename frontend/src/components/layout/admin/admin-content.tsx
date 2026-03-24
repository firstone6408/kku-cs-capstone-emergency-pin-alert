interface AdminMainContentProps {
  children: React.ReactNode;
}

export function AdminMainContent({ children }: AdminMainContentProps) {
  return (
    <main
      className={`flex-1 overflow-y-auto  pt-16 ml-0 md:ml-64 transition-all duration-300`}
    >
      <div className="p-4 sm:p-6 space-y-4">{children}</div>
    </main>
  );
}
