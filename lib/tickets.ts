import { EstadoTicket, PrioridadTicket, OrigenTicket } from "@prisma/client";

export const ESTADO_TICKET_OPCIONES = [
  { value: EstadoTicket.NUEVO, label: "Nuevo" },
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

export const ORIGEN_TICKET_OPCIONES = [
  { value: OrigenTicket.CLIENTE, label: "Cliente" },
  { value: OrigenTicket.SISTEMA, label: "Sistema" },
] as const;

export function origenTicketLabel(origen: OrigenTicket): string {
  return ORIGEN_TICKET_OPCIONES.find((o) => o.value === origen)?.label ?? origen;
}

// Condición de "ticket urgente": prioridad ALTA y no resuelto (se mantiene
// tanto en NUEVO como en EN_REVISION, desaparece recién al marcarse RESUELTO).
export const TICKET_URGENTE_WHERE = {
  prioridad: PrioridadTicket.ALTA,
  estado: { not: EstadoTicket.RESUELTO },
} as const;
