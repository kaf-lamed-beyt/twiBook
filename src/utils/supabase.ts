import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.PROJECT_URL as string,
  process.env.PROJECT_KEY as string
);
