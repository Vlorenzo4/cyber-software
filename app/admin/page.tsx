import { prisma } from "@/lib/prisma";
import { TICKET_URGENTE_WHERE } from "@/lib/tickets";
import ControlCenterFlow from "./control-center/ControlCenterFlow";
import type { ProyectoResumen } from "./control-center/types";

// Esta pantalla tiene que reflejar el estado real de los proyectos/tickets
// en cada visita (el indicador de tickets urgentes es en vivo), no una
// versión generada una sola vez en build time.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const proyectos = await prisma.proyecto.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      tickets: {
        where: TICKET_URGENTE_WHERE,
        select: { id: true },
      },
    },
  });

  const resumen: ProyectoResumen[] = proyectos.map((p) => ({
    id: p.id,
    nombreProyecto: p.nombreProyecto,
    clienteNombre: p.clienteNombre,
    tipo: p.tipo,
    hasTicketUrgente: p.tickets.length > 0,
  }));

  return (
    <div className="flex h-[80vh] min-h-[560px] w-full flex-col">
      {resumen.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display text-2xl font-bold uppercase tracking-[-0.01em] text-foreground">
            Centro de control
          </h1>
          <p className="mt-3 max-w-md text-sm text-[#9A9A9A]">
            Todavía no hay proyectos cargados. Creá uno desde &ldquo;Proyectos&rdquo;
            para verlo acá.
          </p>
        </div>
      ) : (
        <ControlCenterFlow proyectos={resumen} />
      )}
    </div>
  );
}
