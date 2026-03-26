import { ButtonNavigation } from "@/components/layout/navigation/buttom-navigation";
import { GoogleMap } from "@/components/shared/map/google-map";
import { Button } from "@/components/ui/button";
import { MapPinPlus } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export default function HomePage() {
  return (
    <Fragment>
      <div className="absolute size-full pb-16 sm:pb-0 border border-primary rounded-md overflow-hidden">
        <Button
          asChild
          size={"lg"}
          className="absolute right-3 bottom-1/3 -translate-y-1/2 z-50"
        >
          <Link href="/incidents/create">
            <MapPinPlus />
          </Link>
        </Button>
        <GoogleMap />
      </div>

      {/* Bottom Navigation (Mobile) */}
      <div className="flex sm:hidden flex-col h-screen overflow-hidden">
        <nav className="shrink-0">
          <ButtonNavigation className="fixed bottom-0 left-0 w-full z-50" />
        </nav>
      </div>
    </Fragment>
  );
}
