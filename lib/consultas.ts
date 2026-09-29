import { EstadoConsulta } from "@prisma/client";

export const ESTADO_OPCIONES = [
  { value: EstadoConsulta.NUEVA, label: "Nueva" },
  { value: EstadoConsulta.CONTACTADA, label: "Contactada" },
  { value: EstadoConsulta.CONVERTIDA, label: "Convertida" },
  { value: EstadoConsulta.DESCARTADA, label: "Descartada" },
] as const;

export function estadoLabel(estado: EstadoConsulta): string {
  return ESTADO_OPCIONES.find((o) => o.value === estado)?.label ?? estado;
}
