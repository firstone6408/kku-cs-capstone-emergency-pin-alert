import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthContainerProps {
  type: "signIn" | "signUp" | "forgot-password" | "reset-password";
  children: React.ReactNode;
}

export default function AuthContainer({
  children,
  type,
}: AuthContainerProps) {
  let title = "";
  let description = "";
  switch (type) {
    case "signUp":
      title = "สมัครสมาชิก";
      description = "กรุณากรอกข้อมูลเพื่อสมัครสมาชิก";
      break;
    case "signIn":
      title = "เข้าสู่ระบบ";
      description = "กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ";
      break;
    case "forgot-password":
      title = "ลืมรหัสผ่าน";
      description = "กรุณากรอกอีเมลเพื่อรีเซ็ตรหัสผ่าน";
      break;
    case "reset-password":
      title = "รีเซ็ตรหัสผ่าน";
      description = "กรุณากรอกรหัสผ่านใหม่";
    default:
      break;
  }

  return (
    <div className="px-4 md:px-0">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        {children}
      </Card>
    </div>
  );
}
