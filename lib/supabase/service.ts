import "server-only";

import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./env";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedServiceClient: any = null;

/**
 * Returns a privileged Supabase client with the service role key.
 * Used strictly in secure server-side API handlers, webhooks, and background processing.
 * NEVER expose this client or its credentials to the browser.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createSupabaseServiceClient(): any {
  if (cachedServiceClient) return cachedServiceClient;

  const config = getSupabaseConfig();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!config?.url || !serviceKey) {
    console.warn("createSupabaseServiceClient: SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL is missing.");
    return null;
  }

  cachedServiceClient = createClient(config.url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return cachedServiceClient;
}
