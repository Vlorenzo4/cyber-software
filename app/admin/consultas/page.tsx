import Link from "next/link";
import { EstadoConsulta } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";
import { NECESIDAD_OPCIONES } from "@/lib/validations/contacto";
import { ESTADO_OPCIONES } from "@/lib/consultas";
import EstadoSelect from "./EstadoSelect";

const FILTROS = [
  { value: "TODAS", label: "Todas" },
  ...ESTADO_OPCIONES.map((o) => ({
    value: o.value,
    label: `${o.label}s`,
  })),
];

function necesidadLabel(valor: string) {
  return NECESIDAD_OPCIONES.find((o) => o.value === valor)?.label ?? valor;
}

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function ConsultasPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado } = await searchParams;
  const filtroActivo =
    estado && estado in EstadoConsulta ? (estado as EstadoConsulta) : "TODAS";

  const consultas = await prisma.consulta.findMany({
    where: filtroActivo !== "TODAS" ? { estado: filtroActivo } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="mb-8 font-display text-2xl font-bold uppercase tracking-[-0.01em] text-foreground">
        Consultas
      </h1>

      <div className="mb-8 flex flex-wrap gap-2">
        {FILTROS.map((f) => (
          <Link
            key={f.value}
            href={f.value === "TODAS" ? "/admin/consultas" : `/admin/consultas?estado=${f.value}`}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
              filtroActivo === f.value
                ? "bg-yellow text-background"
                : "border border-white/15 text-[#B8B8B8] hover:border-cyan hover:text-cyan"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {consultas.length === 0 ? (
        <p className="text-sm text-[#9A9A9A]">No hay consultas en este filtro.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {consultas.map((c) => {
            const esNueva = c.estado === "NUEVA";
            return (
              <div
                key={c.id}
                className={esNueva ? "bg-cyan p-[2px]" : "bg-white/10 p-[1px]"}
                style={{ clipPath: CUT_CORNERS_CLIP }}
              >
                <div
                  className="flex flex-col gap-4 bg-[#131313] p-6 sm:flex-row sm:items-center sm:justify-between"
                  style={{ clipPath: CUT_CORNERS_CLIP }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      {esNueva && (
                        <span className="inline-block h-[8px] w-[8px] shrink-0 bg-cyan" />
                      )}
                      <h2 className="font-display text-base font-semibold uppercase text-foreground">
                        {c.nombre}
                      </h2>
                      <span className="text-xs text-[#5A5A5A]">
                        {dateFormatter.format(c.createdAt)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-[#9A9A9A] sm:grid-cols-2">
                      <div>{c.email}</div>
                      <div>{c.telefono || "Sin teléfono"}</div>
                      <div>{c.empresa || "Sin empresa"}</div>
                      <div className="text-cyan">{necesidadLabel(c.necesidad)}</div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-3">
                    <EstadoSelect id={c.id} estado={c.estado} />
                    <Link
                      href={`/admin/consultas/${c.id}`}
                      className="border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#B8B8B8] transition-colors hover:border-cyan hover:text-cyan"
                    >
                      Ver detalle →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
