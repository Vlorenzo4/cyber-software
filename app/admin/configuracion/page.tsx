import { prisma } from "@/lib/prisma";
import { createAdminClient } from "@/lib/supabase/admin";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";
import { actualizarConfiguracion } from "./actions";
import UsuariosSection from "./UsuariosSection";

export const dynamic = "force-dynamic";

const inputClass =
  "w-full border border-white/[0.12] bg-[#0A0A0A] px-[14px] py-[12px] text-sm text-foreground placeholder:text-[#5A5A5A] focus:border-cyan/60 focus:outline-none";
const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8C8C8C]";

export default async function ConfiguracionPage() {
  const config = await prisma.configuracionAgencia.findFirst();

  const supabaseAdmin = createAdminClient();
  const { data: usersData, error: usersError } =
    await supabaseAdmin.auth.admin.listUsers();

  const usuarios = (usersData?.users ?? []).map((u) => ({
    id: u.id,
    email: u.email ?? "(sin email)",
    createdAt: u.created_at,
  }));

  return (
    <div className="mx-auto max-w-[800px] px-6 py-12">
      <h1 className="mb-10 font-display text-2xl font-bold uppercase tracking-[-0.01em] text-foreground">
        Configuración
      </h1>

      <div className="mb-12 bg-cyan p-[2px]" style={{ clipPath: CUT_CORNERS_CLIP }}>
        <div className="bg-[#131313] p-8" style={{ clipPath: CUT_CORNERS_CLIP }}>
          <h2 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.08em] text-cyan">
            Datos de la agencia
          </h2>

          <form action={actualizarConfiguracion} className="flex flex-col gap-5">
            <div>
              <label className={labelClass} htmlFor="razonSocial">
                Razón social
              </label>
              <input
                id="razonSocial"
                name="razonSocial"
                required
                defaultValue={config?.razonSocial}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                defaultValue={config?.email}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="whatsapp">
                WhatsApp
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                required
                defaultValue={config?.whatsapp}
                className={inputClass}
                placeholder="+54 11 5771 0063"
              />
            </div>

            <button
              type="submit"
              className="self-start bg-yellow px-8 py-3 text-sm font-bold uppercase tracking-[0.06em] text-background transition-[filter] hover:brightness-95"
              style={{ clipPath: CUT_CORNERS_CLIP }}
            >
              Guardar cambios
            </button>
          </form>
        </div>
      </div>

      <div className="bg-cyan p-[2px]" style={{ clipPath: CUT_CORNERS_CLIP }}>
        <div className="bg-[#131313] p-8" style={{ clipPath: CUT_CORNERS_CLIP }}>
          {usersError ? (
            <p className="text-sm text-red-500">
              No se pudieron cargar los usuarios: {usersError.message}
            </p>
          ) : (
            <UsuariosSection usuarios={usuarios} />
          )}
        </div>
      </div>
    </div>
  );
}
