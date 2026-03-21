"use client";

import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/types/components/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface NavigateButtonProps extends ButtonProps {
  query?: string;
  queryKey?: string;
  href?: string;
  back?: boolean;
  reload?: boolean;
}

export function NavigateButton({
  query,
  queryKey,
  href,
  variant,
  back,
  reload,
  className,
  ...props
}: NavigateButtonProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onClick = () => {
    // console.log("ko");
    if (back) {
      // console.log("ko");
      router.back();
      return;
    }
    if (reload) {
      router.refresh();
      return;
    }
    let url = href ?? "";

    if (queryKey) {
      const params = new URLSearchParams(searchParams.toString());

      if (query) {
        params.set(queryKey, query);
      } else {
        params.delete(queryKey);
      }

      const queryString = params.toString();
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
    router.push(url);
  };

  return (
    <Button
      variant={variant}
      className={cn("cursor-pointer", className)}
      onClick={onClick}
      {...props}
    />
  );
}

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function BackPageButton({ children, className }: Props) {
  return (
    <NavigateButton
      className={cn("w-full cursor-pointer", className)}
      variant={"default"}
      back
    >
      {children}
    </NavigateButton>
  );
}

export function ReloadPageButton({ children, className }: Props) {
  return (
    <NavigateButton
      className={cn("w-full cursor-pointer", className)}
      reload
      variant={"destructive"}
    >
      {children}
    </NavigateButton>
  );
}
