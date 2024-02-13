import { getCookie } from "cookies-next";

export const authCookieOptions = {
  path: "/",
  maxAge: 60 * 6 * 24,
};

export const authProviderFromSignIn = getCookie("_prov");
