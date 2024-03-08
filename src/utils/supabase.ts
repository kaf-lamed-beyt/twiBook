import { createClient } from "@supabase/supabase-js";
import { deleteCookie, setCookie } from "cookies-next";
import { authCookieOptions } from "./misc";

const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZ3FraXNjcHV5dW5pdG16b2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3MDk0MTksImV4cCI6MjAyMjI4NTQxOX0.KkBZ09jgKtzXaQ096lvZhJOpeee0Tvh46UMUWAUKGSs";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_PROJECT_URL as string,
  key
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
