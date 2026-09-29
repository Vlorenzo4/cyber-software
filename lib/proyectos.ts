import { TipoProyecto, EstadoProyecto } from "@prisma/client";

export const TIPO_OPCIONES = [
  { value: TipoProyecto.SISTEMA_GESTION, label: "Sistema de gestión" },
  { value: TipoProyecto.TIENDA_WEB, label: "Tienda web" },
  { value: TipoProyecto.SAAS, label: "SaaS" },
  { value: TipoProyecto.AUTOMATIZACION_IA, label: "Automatización con IA" },
  { value: TipoProyecto.OTRO, label: "Otro" },
] as const;

export const ESTADO_PROYECTO_OPCIONES = [
  { value: EstadoProyecto.EN_DESARROLLO, label: "En desarrollo" },
  { value: EstadoProyecto.ACTIVO, label: "Activo" },
  { value: EstadoProyecto.PAUSADO, label: "Pausado" },
  { value: EstadoProyecto.FINALIZADO, label: "Finalizado" },
] as const;

export function tipoLabel(tipo: TipoProyecto): string {
  return TIPO_OPCIONES.find((o) => o.value === tipo)?.label ?? tipo;
}

export function estadoProyectoLabel(estado: EstadoProyecto): string {
  return ESTADO_PROYECTO_OPCIONES.find((o) => o.value === estado)?.label ?? estado;
}
