import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";
import { tipoLabel, estadoProyectoLabel } from "@/lib/proyectos";
import { estadoCobroLabel } from "@/lib/cobros";
import { estadoTicketLabel, prioridadTicketLabel } from "@/lib/tickets";

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

function Field({
  label,
  value,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="mb-1 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
        {label}
      </div>
      <div className={`break-words text-sm ${accent ? "text-cyan" : "text-foreground"}`}>
        {value}
      </div>
    </div>
  );
}

export default async function ProyectoDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const proyecto = await prisma.proyecto.findUnique({
    where: { id },
    include: {
      cobros: { orderBy: { createdAt: "desc" } },
      tickets: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!proyecto) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[900px] px-6 py-12">
      <Link
        href="/admin/proyectos"
        className="mb-8 inline-block text-xs font-semibold uppercase tracking-[0.08em] text-[#B8B8B8] transition-colors hover:text-cyan"
      >
        ← Volver a proyectos
      </Link>

      <div className="bg-white/10 p-[1px]" style={{ clipPath: CUT_CORNERS_CLIP }}>
        <div
          className="flex flex-col gap-6 bg-[#131313] p-8"
          style={{ clipPath: CUT_CORNERS_CLIP }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-1 text-xs uppercase tracking-[0.08em] text-[#5A5A5A]">
                {proyecto.clienteNombre}
              </div>
              <h1 className="font-display text-xl font-bold uppercase text-foreground">
                {proyecto.nombreProyecto}
              </h1>
            </div>
            <Link
              href={`/admin/proyectos/${id}/editar`}
              className="border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#B8B8B8] transition-colors hover:border-cyan hover:text-cyan"
            >
              Editar
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
            <Field label="Tipo" value={tipoLabel(proyecto.tipo)} accent />
            <Field label="Estado" value={estadoProyectoLabel(proyecto.estado)} accent />
            <Field label="Stack" value={proyecto.stack || "—"} />
            <Field
              label="URL de producción"
              value={
                proyecto.urlProduccion ? (
                  <a
                    href={proyecto.urlProduccion}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan hover:underline"
                  >
                    {proyecto.urlProduccion}
                  </a>
                ) : (
                  "—"
                )
              }
            />
            <Field
              label="URL /admin/stats"
              value={proyecto.adminStatsUrl || "—"}
            />
          </div>

          {proyecto.notas && (
            <div className="border-t border-white/10 pt-6">
              <div className="mb-2 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
                Notas
              </div>
              <p className="whitespace-pre-wrap text-sm leading-[1.6] text-[#9A9A9A]">
                {proyecto.notas}
              </p>
            </div>
          )}
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 font-display text-lg font-bold uppercase text-foreground">
          Cobros
        </h2>
        {proyecto.cobros.length === 0 ? (
          <p className="text-sm text-[#9A9A9A]">Todavía no hay cobros cargados.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {proyecto.cobros.map((c) => (
              <div
                key={c.id}
                className="flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-[#131313] px-5 py-4 text-sm"
              >
                <div className="text-foreground">
                  {currencyFormatter.format(Number(c.montoTotal))}
                </div>
                <div className="text-[#9A9A9A]">
                  Cobrado: {currencyFormatter.format(Number(c.montoCobrado))}
                </div>
                <div className="text-cyan">{estadoCobroLabel(c.estado)}</div>
                <div className="text-xs text-[#5A5A5A]">
                  {dateFormatter.format(c.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="mb-4 font-display text-lg font-bold uppercase text-foreground">
          Tickets
        </h2>
        {proyecto.tickets.length === 0 ? (
          <p className="text-sm text-[#9A9A9A]">Todavía no hay tickets cargados.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {proyecto.tickets.map((t) => (
              <div
                key={t.id}
                className="flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-[#131313] px-5 py-4 text-sm"
              >
                <div className="min-w-0 flex-1 text-foreground">{t.asunto}</div>
                <div className="text-[#9A9A9A]">{t.remitenteNombre}</div>
                <div className="text-yellow">{prioridadTicketLabel(t.prioridad)}</div>
                <div className="text-cyan">{estadoTicketLabel(t.estado)}</div>
                <div className="text-xs text-[#5A5A5A]">
                  {dateFormatter.format(t.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
