import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only treat it as configured if it looks like a real HTTP(S) URL.
export const hasSupabaseConfig =
  Boolean(supabaseUrl && supabaseAnonKey) &&
  /^https?:\/\//i.test(String(supabaseUrl));

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

