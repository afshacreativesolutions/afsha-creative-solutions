import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./env";

let cachedPublicClient: ReturnType<typeof createClient> | null = null;

export function createSupabasePublicClient() {
  if (cachedPublicClient) return cachedPublicClient;

  const config = getSupabaseConfig();
  if (!config) return null;

  cachedPublicClient = createClient(config.url, config.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return cachedPublicClient;
}
