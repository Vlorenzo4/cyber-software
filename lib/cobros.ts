import { EstadoCobro } from "@prisma/client";

export const ESTADO_COBRO_OPCIONES = [
  { value: EstadoCobro.PENDIENTE, label: "Pendiente" },
  { value: EstadoCobro.PARCIAL, label: "Parcial" },
  { value: EstadoCobro.PAGADO, label: "Pagado" },
  { value: EstadoCobro.MANTENIMIENTO, label: "Mantenimiento" },
] as const;

export function estadoCobroLabel(estado: EstadoCobro): string {
  return ESTADO_COBRO_OPCIONES.find((o) => o.value === estado)?.label ?? estado;
}
