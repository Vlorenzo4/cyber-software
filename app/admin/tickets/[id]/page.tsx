import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";
import { origenTicketLabel } from "@/lib/tickets";
import TicketControls from "../TicketControls";

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
        {label}
      </div>
      <div className="break-words text-sm text-foreground">{value}</div>
    </div>
  );
}

export default async function TicketDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      proyecto: { select: { id: true, nombreProyecto: true, clienteNombre: true } },
    },
  });

  if (!ticket) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[800px] px-6 py-12">
      <Link
        href="/admin/tickets"
        className="mb-8 inline-block text-xs font-semibold uppercase tracking-[0.08em] text-[#B8B8B8] transition-colors hover:text-cyan"
      >
        ← Volver a tickets
      </Link>

      <div className="bg-cyan p-[2px]" style={{ clipPath: CUT_CORNERS_CLIP }}>
        <div
          className="flex flex-col gap-6 bg-[#131313] p-8"
          style={{ clipPath: CUT_CORNERS_CLIP }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Link
                href={`/admin/proyectos/${ticket.proyecto.id}`}
                className="text-xs font-semibold uppercase tracking-[0.08em] text-cyan hover:underline"
              >
                {ticket.proyecto.nombreProyecto}
              </Link>
              <h1 className="mt-1 font-display text-xl font-bold uppercase text-foreground">
                {ticket.asunto}
              </h1>
              <p className="mt-1 text-xs text-[#5A5A5A]">
                {dateFormatter.format(ticket.createdAt)}
              </p>
            </div>
            <TicketControls
              id={ticket.id}
              estado={ticket.estado}
              prioridad={ticket.prioridad}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
            <Field
              label="Origen"
              value={
                <span className={ticket.origen === "CLIENTE" ? "text-cyan" : "text-yellow"}>
                  {ticket.origen === "CLIENTE" ? "👤" : "⚠"} {origenTicketLabel(ticket.origen)}
                </span>
              }
            />
            <Field
              label="Proyecto"
              value={`${ticket.proyecto.clienteNombre} — ${ticket.proyecto.nombreProyecto}`}
            />

            {ticket.origen === "CLIENTE" && (
              <>
                <Field label="Remitente" value={ticket.remitenteNombre || "—"} />
                <Field
                  label="Email de contacto"
                  value={
                    ticket.remitenteEmail ? (
                      <a
                        href={`mailto:${ticket.remitenteEmail}`}
                        className="text-cyan hover:underline"
                      >
                        {ticket.remitenteEmail}
                      </a>
                    ) : (
                      "—"
                    )
                  }
                />
              </>
            )}
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="mb-2 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
              Descripción
            </div>
            <p className="whitespace-pre-wrap text-sm leading-[1.6] text-[#9A9A9A]">
              {ticket.descripcion}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
