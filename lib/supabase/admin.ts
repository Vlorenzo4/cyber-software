import "server-only";
import { createClient } from "@supabase/supabase-js";

// Cliente con la service_role key: solo para uso server-side (Server
// Actions, Route Handlers). Nunca importar desde un componente cliente —
// el import "server-only" hace fallar el build si eso pasa por error.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
