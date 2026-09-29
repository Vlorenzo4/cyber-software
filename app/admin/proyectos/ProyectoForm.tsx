import type { Proyecto } from "@prisma/client";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";
import { TIPO_OPCIONES, ESTADO_PROYECTO_OPCIONES } from "@/lib/proyectos";

type ProyectoFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  proyecto?: Proyecto;
  submitLabel: string;
};

const inputClass =
  "w-full border border-white/[0.12] bg-[#0A0A0A] px-[14px] py-[12px] text-sm text-foreground placeholder:text-[#5A5A5A] focus:border-cyan/60 focus:outline-none";
const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8C8C8C]";

export default function ProyectoForm({
  action,
  proyecto,
  submitLabel,
}: ProyectoFormProps) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="clienteNombre">
            Cliente *
          </label>
          <input
            id="clienteNombre"
            name="clienteNombre"
            required
            defaultValue={proyecto?.clienteNombre}
            className={inputClass}
            placeholder="Nombre del cliente"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="nombreProyecto">
            Proyecto *
          </label>
          <input
            id="nombreProyecto"
            name="nombreProyecto"
            required
            defaultValue={proyecto?.nombreProyecto}
            className={inputClass}
            placeholder="Nombre del proyecto"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="tipo">
            Tipo *
          </label>
          <select
            id="tipo"
            name="tipo"
            required
            defaultValue={proyecto?.tipo ?? ""}
            className={inputClass}
          >
            <option value="" disabled>
              Elegí un tipo
            </option>
            {TIPO_OPCIONES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="estado">
            Estado
          </label>
          <select
            id="estado"
            name="estado"
            defaultValue={proyecto?.estado ?? "EN_DESARROLLO"}
            className={inputClass}
          >
            {ESTADO_PROYECTO_OPCIONES.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="stack">
            Stack
          </label>
          <input
            id="stack"
            name="stack"
            defaultValue={proyecto?.stack ?? ""}
            className={inputClass}
            placeholder="Next.js, Prisma, Supabase..."
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="urlProduccion">
            URL de producción
          </label>
          <input
            id="urlProduccion"
            name="urlProduccion"
            type="url"
            defaultValue={proyecto?.urlProduccion ?? ""}
            className={inputClass}
            placeholder="https://..."
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="adminStatsUrl">
            URL de /admin/stats (para el Centro de control)
          </label>
          <input
            id="adminStatsUrl"
            name="adminStatsUrl"
            type="url"
            defaultValue={proyecto?.adminStatsUrl ?? ""}
            className={inputClass}
            placeholder="https://.../admin/stats"
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="notas">
            Notas
          </label>
          <textarea
            id="notas"
            name="notas"
            rows={4}
            defaultValue={proyecto?.notas ?? ""}
            className={`${inputClass} resize-none`}
            placeholder="Notas internas sobre el proyecto"
          />
        </div>
      </div>

      <button
        type="submit"
        className="self-start bg-yellow px-8 py-3 text-sm font-bold uppercase tracking-[0.06em] text-background transition-[filter] hover:brightness-95"
        style={{ clipPath: CUT_CORNERS_CLIP }}
      >
        {submitLabel}
      </button>
    </form>
  );
}
