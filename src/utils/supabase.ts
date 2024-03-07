import { createClient } from "@supabase/supabase-js";
import { deleteCookie, setCookie } from "cookies-next";
import { authCookieOptions } from "./misc";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_PROJECT_URL as string,
  process.env.NEXT_PUBLIC_PROJECT_KEY as string
);

supabase.auth.onAuthStateChange((event, session) => {
  if (session && session.provider_token) {
    localStorage.setItem("oauth_provider_token", session.provider_token);
    setCookie("_opt", session?.provider_token, {
      ...authCookieOptions,
    });
  }

  if (session && session.provider_refresh_token) {
    localStorage.setItem(
      "oauth_provider_refresh_token",
      session.provider_refresh_token
    );

    setCookie("_oprt", session?.provider_refresh_token, {
      ...authCookieOptions,
    });
  }

  if (event === "SIGNED_OUT") {
    localStorage.removeItem("oauth_provider_token");
    localStorage.removeItem("oauth_provider_refresh_token");

    deleteCookie("_oprt", {
      ...authCookieOptions,
    });

    deleteCookie("_opt", {
      ...authCookieOptions,
    });
  }
});
