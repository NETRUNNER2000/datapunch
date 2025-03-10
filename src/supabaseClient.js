import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(
    supabaseUrl, 
    supabaseAnonKey,     
    {
    persistSession: true,  // <-- Ensure this is enabled!
    autoRefreshToken: true,
    detectSessionInUrl: true,}
);