import { cookies } from "next/headers";

const cookie = {
  setToken: async (token: string) => {
    const store = await cookies();
    store.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  },

  deleteToken: async () => {
    const store = await cookies();
    store.delete("token");
  },

  getToken: async () => {
    const store = await cookies();
    return store.get("token")?.value;
  },
};

export { cookie, cookies };
