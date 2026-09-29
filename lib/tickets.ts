import { EstadoTicket, PrioridadTicket } from "@prisma/client";

export const ESTADO_TICKET_OPCIONES = [
  { value: EstadoTicket.ABIERTO, label: "Abierto" },
  { value: EstadoTicket.EN_REVISION, label: "En revisión" },
  { value: EstadoTicket.RESUELTO, label: "Resuelto" },
] as const;

export const PRIORIDAD_TICKET_OPCIONES = [
  { value: PrioridadTicket.BAJA, label: "Baja" },
  { value: PrioridadTicket.MEDIA, label: "Media" },
  { value: PrioridadTicket.ALTA, label: "Alta" },
] as const;

export function estadoTicketLabel(estado: EstadoTicket): string {
  return ESTADO_TICKET_OPCIONES.find((o) => o.value === estado)?.label ?? estado;
}

export function prioridadTicketLabel(prioridad: PrioridadTicket): string {
  return (
    PRIORIDAD_TICKET_OPCIONES.find((o) => o.value === prioridad)?.label ?? prioridad
  );
}
