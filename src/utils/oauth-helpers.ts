import { Provider } from "@supabase/supabase-js";
import { supabase } from "./supabase/client";
import { setCookie } from "cookies-next";
import { AuthContextValues } from "@context/auth-provider";
import { ToastContextValues } from "@context/toast-provider";
import { authCookieOptions } from "./misc";

type authenticator = AuthContextValues["authenticator"];
type openToast = ToastContextValues["openToast"];

// current implementation of the OAuth handlers
// are too tight-coupled with the toastContext.
// decouple it.

export const OAuthSignIn = (
  provider: Provider,
  logUserIn: authenticator,
  showToast: openToast
) => {
  async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: "http://localhost:5173/oauth",
      },
    });

    if (!error) {
      logUserIn(true);
      setCookie("_prov", data.provider, {
        ...authCookieOptions,
      });

      showToast("Processing...", "success");
    }

    showToast("Something went wrong! Try again.", "error");
  };
};

export const exchange = async (token: string) => {
  const { data } = await supabase.auth.getUser(token);

  return data?.user;
};
