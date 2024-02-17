import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const authCookieOptions = {
  path: "/",
  maxAge: 60 * 6 * 24,
};

export const authProviderFromSignIn = getCookie("_prov");

export const dateFromNow = (value: string) => {
  return dayjs(value).fromNow();
};

export const Quotas = {
  FREE: 10,
  BASIC: 50,
  PRO: 150,
};

export const lastUpdated = dayjs("02/16/2024").format("MMM DD, YYYY");
