import { ErrorMessage } from "@/components/shared/error/error-message";
import { HelloWorldContainer } from "@/features/hello-world/components/hello-world-container";
import { getHelloWorld } from "@/features/hello-world/services/hello-world.service";

export default async function Home() {
  const helloworld = await getHelloWorld();

  if (!helloworld) {
    return <ErrorMessage message="ไม่สามารถดึงข้อมูลได้" />;
  }

  return <HelloWorldContainer message={helloworld.message} />;
}
