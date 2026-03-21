import { LogoutButton } from "@/features/auth/components/logout-button";
import { getAuthenticatedUser } from "@/lib/auth";

export default async function HomePage() {
  const { user } = await getAuthenticatedUser();
  return (
    <div>
      <div>{user.role}</div>
      <LogoutButton>ออกจากระบบ</LogoutButton>
    </div>
  );
}
