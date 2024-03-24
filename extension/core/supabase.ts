import { createClient } from "@supabase/supabase-js"

import { Storage } from "@plasmohq/storage"

const storage = new Storage({
  area: "local"
})

export const supabase = createClient(
  process.env.PLASMO_PUBLIC_SUPABASE_URL as string,
  process.env.PLASMO_PUBLIC_SUPABASE_KEY as string,
  {
    auth: {
      storage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)
