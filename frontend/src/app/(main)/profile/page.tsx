import { Header } from "@/components/shared/header/header";
import { MobileHeader } from "@/components/shared/header/mobile-header";
import { UserProfileContainer } from "@/features/auth/components/profile/user-profile-container";
import { getAuthenticatedUser } from "@/lib/auth";

export default async function ProfilePage() {
  const { user } = await getAuthenticatedUser();

  return (
    <div>
      {/* Header */}
      <MobileHeader className="flex md:hidden" title="โปรไฟล์" href="/" />
      <Header className="hidden md:flex" title="โปรไฟล์" />
      {/* Content */}
      <UserProfileContainer
        className="content-with-mobile-header"
        user={user}
      />
      ;
    </div>
  );
}
