import AuthContainer from "@/features/auth/components/auth-container";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <AuthContainer type="signUp">
      <RegisterForm />
    </AuthContainer>
  );
}
