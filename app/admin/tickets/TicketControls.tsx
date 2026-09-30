"use client";

import { useTransition, type ChangeEvent } from "react";
import type { EstadoTicket, PrioridadTicket } from "@prisma/client";
import { ESTADO_TICKET_OPCIONES, PRIORIDAD_TICKET_OPCIONES } from "@/lib/tickets";
import { actualizarTicket } from "./actions";

type TicketControlsProps = {
  id: string;
  estado: EstadoTicket;
  prioridad: PrioridadTicket;
};

export default function TicketControls({
  id,
  estado,
  prioridad,
}: TicketControlsProps) {
  const [isPending, startTransition] = useTransition();

  function handleEstadoChange(e: ChangeEvent<HTMLSelectElement>) {
    const nuevoEstado = e.target.value as EstadoTicket;
    startTransition(() => {
      actualizarTicket(id, { estado: nuevoEstado });
    });
  }

  function handlePrioridadChange(e: ChangeEvent<HTMLSelectElement>) {
    const nuevaPrioridad = e.target.value as PrioridadTicket;
    startTransition(() => {
      actualizarTicket(id, { prioridad: nuevaPrioridad });
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div>
        <div className="mb-1 text-[10px] uppercase tracking-[0.08em] text-[#5A5A5A]">
          Estado
        </div>
        <select
          value={estado}
          onChange={handleEstadoChange}
          disabled={isPending}
          className="border border-white/[0.15] bg-[#0A0A0A] px-3 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-foreground focus:border-cyan/60 focus:outline-none disabled:opacity-50"
        >
          {ESTADO_TICKET_OPCIONES.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="mb-1 text-[10px] uppercase tracking-[0.08em] text-[#5A5A5A]">
          Prioridad
        </div>
        <select
          value={prioridad}
          onChange={handlePrioridadChange}
          disabled={isPending}
          className="border border-white/[0.15] bg-[#0A0A0A] px-3 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-foreground focus:border-cyan/60 focus:outline-none disabled:opacity-50"
        >
          {PRIORIDAD_TICKET_OPCIONES.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
