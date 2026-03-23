import { UserProfileContainer } from "@/features/auth/components/profile/user-profile-container";
import { getAuthenticatedUser } from "@/lib/auth";

export default async function ProfilePage() {
  const { user } = await getAuthenticatedUser();

  return <UserProfileContainer user={user} />;
}
