import Link from "next/link";
import { EstadoProyecto, EstadoTicket } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";
import { ESTADO_PROYECTO_OPCIONES, tipoLabel, estadoProyectoLabel } from "@/lib/proyectos";

const FILTROS = [
  { value: "TODOS", label: "Todos" },
  ...ESTADO_PROYECTO_OPCIONES.map((o) => ({ value: o.value as string, label: o.label })),
];

export default async function ProyectosPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado } = await searchParams;
  const filtroActivo =
    estado && estado in EstadoProyecto ? (estado as EstadoProyecto) : "TODOS";

  const proyectos = await prisma.proyecto.findMany({
    where: filtroActivo !== "TODOS" ? { estado: filtroActivo } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { tickets: { where: { estado: EstadoTicket.ABIERTO } } },
      },
    },
  });

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold uppercase tracking-[-0.01em] text-foreground">
          Proyectos
        </h1>
        <Link
          href="/admin/proyectos/nuevo"
          className="bg-yellow px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-background transition-[filter] hover:brightness-95"
          style={{ clipPath: CUT_CORNERS_CLIP }}
        >
          + Nuevo proyecto
        </Link>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {FILTROS.map((f) => (
          <Link
            key={f.value}
            href={f.value === "TODOS" ? "/admin/proyectos" : `/admin/proyectos?estado=${f.value}`}
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

      {proyectos.length === 0 ? (
        <p className="text-sm text-[#9A9A9A]">No hay proyectos en este filtro.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((p) => (
            <Link
              key={p.id}
              href={`/admin/proyectos/${p.id}`}
              className="block bg-white/10 p-[1px]"
              style={{ clipPath: CUT_CORNERS_CLIP }}
            >
              <div
                className="h-full bg-[#131313] p-6 transition-colors hover:bg-[#181818]"
                style={{ clipPath: CUT_CORNERS_CLIP }}
              >
                <div className="mb-1 text-xs uppercase tracking-[0.08em] text-[#5A5A5A]">
                  {p.clienteNombre}
                </div>
                <h2 className="mb-3 font-display text-base font-semibold uppercase text-foreground">
                  {p.nombreProyecto}
                </h2>
                <div className="mb-4 flex flex-wrap gap-2 text-xs">
                  <span className="border border-white/15 px-2 py-1 text-[#B8B8B8]">
                    {tipoLabel(p.tipo)}
                  </span>
                  <span className="border border-cyan/50 px-2 py-1 text-cyan">
                    {estadoProyectoLabel(p.estado)}
                  </span>
                </div>
                {p._count.tickets > 0 && (
                  <div className="text-xs font-semibold text-yellow">
                    {p._count.tickets} ticket{p._count.tickets > 1 ? "s" : ""} abierto
                    {p._count.tickets > 1 ? "s" : ""}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
