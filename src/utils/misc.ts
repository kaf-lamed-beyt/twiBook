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
  FREE: 15,
  BASIC: 50,
  PRO: 150,
  FREE_PREVIEWS: 8,
};

export const lastUpdated = dayjs("02/16/2024").format("MMM DD, YYYY");

export const LEMSQUEEZY_BASE_ENDPOINT = "api.lemonsqueezy.com/v1/";
export const REQUEST_HEADERS = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
  Authorization: `Bearer ${process.env.LEMSQUEEZY_KEY}`,
};

export const extractTweetIdFromLink = (link: string) => {
  const id = link.split("/status/");

  return id[1];
};
