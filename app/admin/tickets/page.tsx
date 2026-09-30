import Link from "next/link";
import { EstadoTicket, PrioridadTicket } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";
import { estadoTicketLabel, prioridadTicketLabel, origenTicketLabel } from "@/lib/tickets";

const ESTADO_FILTROS = [
  { value: "ABIERTAS", label: "Nuevos + en revisión" },
  { value: "RESUELTAS", label: "Resueltos" },
];

const ORIGEN_FILTROS = [
  { value: "TODOS", label: "Todos" },
  { value: "CLIENTE", label: "Solo clientes" },
  { value: "SISTEMA", label: "Solo sistema" },
];

const PRIORIDAD_RANK: Record<PrioridadTicket, number> = {
  ALTA: 0,
  MEDIA: 1,
  BAJA: 2,
};

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function buildHref(estado: string, origen: string) {
  const params = new URLSearchParams();
  if (estado !== "ABIERTAS") params.set("estado", estado);
  if (origen !== "TODOS") params.set("origen", origen);
  const qs = params.toString();
  return qs ? `/admin/tickets?${qs}` : "/admin/tickets";
}

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string; origen?: string }>;
}) {
  const sp = await searchParams;
  const estadoFiltro = sp.estado === "RESUELTAS" ? "RESUELTAS" : "ABIERTAS";
  const origenFiltro =
    sp.origen === "CLIENTE" || sp.origen === "SISTEMA" ? sp.origen : "TODOS";

  const tickets = await prisma.ticket.findMany({
    where: {
      estado:
        estadoFiltro === "RESUELTAS"
          ? EstadoTicket.RESUELTO
          : { in: [EstadoTicket.NUEVO, EstadoTicket.EN_REVISION] },
      origen: origenFiltro !== "TODOS" ? origenFiltro : undefined,
    },
    include: {
      proyecto: { select: { nombreProyecto: true } },
    },
  });

  tickets.sort(
    (a, b) =>
      PRIORIDAD_RANK[a.prioridad] - PRIORIDAD_RANK[b.prioridad] ||
      b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <h1 className="mb-8 font-display text-2xl font-bold uppercase tracking-[-0.01em] text-foreground">
        Tickets
      </h1>

      <div className="mb-3 flex flex-wrap gap-2">
        {ESTADO_FILTROS.map((f) => (
          <Link
            key={f.value}
            href={buildHref(f.value, origenFiltro)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
              estadoFiltro === f.value
                ? "bg-yellow text-background"
                : "border border-white/15 text-[#B8B8B8] hover:border-cyan hover:text-cyan"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {ORIGEN_FILTROS.map((f) => (
          <Link
            key={f.value}
            href={buildHref(estadoFiltro, f.value)}
            className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors ${
              origenFiltro === f.value
                ? "border border-cyan text-cyan"
                : "border border-white/10 text-[#5A5A5A] hover:border-cyan/50 hover:text-cyan"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {tickets.length === 0 ? (
        <p className="text-sm text-[#9A9A9A]">No hay tickets en este filtro.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {tickets.map((t) => {
            const esNuevo = t.estado === "NUEVO";
            const esUrgente = t.prioridad === "ALTA" && t.estado !== "RESUELTO";
            return (
              <Link
                key={t.id}
                href={`/admin/tickets/${t.id}`}
                className={`block ${esNuevo ? "bg-cyan p-[2px]" : "bg-white/10 p-[1px]"}`}
                style={{ clipPath: CUT_CORNERS_CLIP }}
              >
                <div
                  className="relative flex flex-col gap-3 bg-[#131313] p-6 transition-colors hover:bg-[#181818] sm:flex-row sm:items-center sm:justify-between"
                  style={{ clipPath: CUT_CORNERS_CLIP }}
                >
                  {esUrgente && (
                    <span
                      className="absolute right-4 top-4 h-[10px] w-[10px] animate-pulse rounded-full bg-red-500"
                      style={{ boxShadow: "0 0 10px 3px rgba(239,68,68,0.7)" }}
                      title="Prioridad alta, sin resolver"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      {esNuevo && (
                        <span className="inline-block h-[8px] w-[8px] shrink-0 bg-cyan" />
                      )}
                      <span
                        className={`border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] ${
                          t.origen === "CLIENTE"
                            ? "border-cyan/50 text-cyan"
                            : "border-yellow/50 text-yellow"
                        }`}
                      >
                        {t.origen === "CLIENTE" ? "👤" : "⚠"} {origenTicketLabel(t.origen)}
                      </span>
                      <span className="text-xs uppercase tracking-[0.08em] text-[#5A5A5A]">
                        {t.proyecto.nombreProyecto}
                      </span>
                    </div>
                    <h2 className="font-display text-base font-semibold uppercase text-foreground">
                      {t.asunto}
                    </h2>
                    {t.origen === "CLIENTE" && t.remitenteNombre && (
                      <div className="mt-1 text-sm text-[#9A9A9A]">
                        De: {t.remitenteNombre}
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-4 text-xs">
                    <span
                      className={`font-semibold uppercase tracking-[0.06em] ${
                        t.prioridad === "ALTA" ? "text-yellow" : "text-[#B8B8B8]"
                      }`}
                    >
                      {prioridadTicketLabel(t.prioridad)}
                    </span>
                    <span className="text-cyan">{estadoTicketLabel(t.estado)}</span>
                    <span className="text-[#5A5A5A]">
                      {dateFormatter.format(t.createdAt)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
