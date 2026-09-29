import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";
import { ESTADO_COBRO_OPCIONES } from "@/lib/cobros";
import { crearCobro } from "../actions";

const inputClass =
  "w-full border border-white/[0.12] bg-[#0A0A0A] px-[14px] py-[12px] text-sm text-foreground placeholder:text-[#5A5A5A] focus:border-cyan/60 focus:outline-none";
const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8C8C8C]";

export default async function NuevoCobroPage() {
  const proyectos = await prisma.proyecto.findMany({
    orderBy: { clienteNombre: "asc" },
    select: { id: true, clienteNombre: true, nombreProyecto: true },
  });

  return (
    <div className="mx-auto max-w-[700px] px-6 py-12">
      <Link
        href="/admin/cobros"
        className="mb-8 inline-block text-xs font-semibold uppercase tracking-[0.08em] text-[#B8B8B8] transition-colors hover:text-cyan"
      >
        ← Volver a cobros
      </Link>

      <h1 className="mb-8 font-display text-2xl font-bold uppercase tracking-[-0.01em] text-foreground">
        Nuevo cobro
      </h1>

      {proyectos.length === 0 ? (
        <p className="text-sm text-[#9A9A9A]">
          Todavía no hay proyectos cargados. Creá un proyecto primero.
        </p>
      ) : (
        <form action={crearCobro} className="flex flex-col gap-5">
          <div>
            <label className={labelClass} htmlFor="proyectoId">
              Proyecto *
            </label>
            <select
              id="proyectoId"
              name="proyectoId"
              required
              defaultValue=""
              className={inputClass}
            >
              <option value="" disabled>
                Elegí un proyecto
              </option>
              {proyectos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.clienteNombre} — {p.nombreProyecto}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="montoTotal">
                Monto total *
              </label>
              <input
                id="montoTotal"
                name="montoTotal"
                type="number"
                step="0.01"
                min="0"
                required
                className={inputClass}
                placeholder="0.00"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="montoCobrado">
                Monto cobrado
              </label>
              <input
                id="montoCobrado"
                name="montoCobrado"
                type="number"
                step="0.01"
                min="0"
                defaultValue="0"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="estado">
              Estado
            </label>
            <select
              id="estado"
              name="estado"
              defaultValue="PENDIENTE"
              className={inputClass}
            >
              {ESTADO_COBRO_OPCIONES.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="notas">
              Notas
            </label>
            <textarea
              id="notas"
              name="notas"
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Notas internas sobre este cobro"
            />
          </div>

          <button
            type="submit"
            className="self-start bg-yellow px-8 py-3 text-sm font-bold uppercase tracking-[0.06em] text-background transition-[filter] hover:brightness-95"
            style={{ clipPath: CUT_CORNERS_CLIP }}
          >
            Crear cobro
          </button>
        </form>
      )}
    </div>
  );
}
