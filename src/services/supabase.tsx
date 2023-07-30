import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_PROJECT_URL_SUPABASE
const supabaseKey = import.meta.env.VITE_PROJECT_ANON_KEY_SUPABASE
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }