import {
  createServerClient,
  type CookieOptions,
  serialize,
} from "@supabase/ssr";
import { NextApiRequest, NextApiResponse } from "next";

export const createClient = (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_PROJECT_URL!,
    process.env.SERVICE_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.appendHeader("Set-Cookie", serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.appendHeader("Set-Cookie", serialize(name, "", options));
        },
      },
    }
  );

  return supabase;
};
