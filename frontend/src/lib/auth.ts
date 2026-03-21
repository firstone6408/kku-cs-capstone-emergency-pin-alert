import { cookie } from "@/lib/cookie";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/services/auth.service";
import { IUser } from "@/features/auth/schemas/user.schema";
import { cache } from "react";

export const getAuthenticatedUser = cache(
  async (): Promise<{ user: IUser; token: string }> => {
    const token = await cookie.getToken();

    if (!token) redirect("/auth/login");

    const user = await getCurrentUser(token);

    if (!user) {
      // ! BUG
      // await cookie.deleteToken();
      redirect("/auth/login");
    }

    return { user, token };
  },
);
