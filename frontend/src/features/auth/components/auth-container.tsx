import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AuthContainerProps {
  type: "signIn" | "signUp" | "forgot-password" | "reset-password";
  children: React.ReactNode;
}

export default function AuthContainer({
  children,
  type,
}: AuthContainerProps) {
  return (
    <div className="px-0 md:px-4">
      <div className="max-w-md mx-auto">
        {/* === Login: Hero Section === */}
        {type === "signIn" && (
          <div className="bg-linear-to-br from-primary to-primary/80 rounded-t-none md:rounded-t-xl px-6 pt-12 pb-8 flex flex-col items-center gap-3">
            {/* Icon */}
            <div className="bg-white/90 rounded-2xl p-3 shadow-md">
              <MapPin className="size-8 text-primary" />
            </div>
            {/* App Name */}
            <h1 className="text-2xl font-bold text-white">KKU Alert</h1>
            {/* Subtitle */}
            <p className="text-white/80 text-sm text-center leading-relaxed">
              เข้าสู่ระบบเพื่อใช้งาน
              <br />
              ระบบแจ้งเหตุฉุกเฉิน
            </p>
          </div>
        )}

        {/* === Register: Back Arrow Header === */}
        {type === "signUp" && (
          <div className="bg-white md:rounded-t-xl px-4 pt-6 pb-4 flex items-center gap-3 border-b border-border">
            <Link
              href="/auth/login"
              className="p-1 -ml-1 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="size-5 text-foreground" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">สมัครสมาชิก</h1>
          </div>
        )}

        {/* === Card Body === */}
        <Card
          className={`
            rounded-none md:rounded-b-xl ring-0 md:ring-1 md:ring-foreground/10 shadow-none md:shadow-sm
            ${type === "signIn" || type === "signUp" ? "md:rounded-t-none" : "md:rounded-t-xl"}
          `}
        >
          {/* Card Header — for signIn only (below hero) */}
          {type === "signIn" && <div />}

          {/* Forgot Password / Reset Password headers */}
          {(type === "forgot-password" || type === "reset-password") && (
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                {type === "forgot-password"
                  ? "ลืมรหัสผ่าน"
                  : "รีเซ็ตรหัสผ่าน"}
              </CardTitle>
              <CardDescription className="text-center">
                {type === "forgot-password"
                  ? "กรุณากรอกอีเมลเพื่อรีเซ็ตรหัสผ่าน"
                  : "กรุณากรอกรหัสผ่านใหม่"}
              </CardDescription>
            </CardHeader>
          )}

          {children}
        </Card>
      </div>
    </div>
  );
}
