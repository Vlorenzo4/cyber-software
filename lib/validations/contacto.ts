import { z } from "zod";
import { NecesidadConsulta } from "@prisma/client";

export const NECESIDAD_OPCIONES = [
  { value: NecesidadConsulta.SISTEMA_GESTION, label: "Sistema de gestión a medida" },
  { value: NecesidadConsulta.AUTOMATIZACION_IA, label: "Automatización con IA" },
  { value: NecesidadConsulta.TIENDA_WEB, label: "Tienda o web a medida" },
  { value: NecesidadConsulta.INTEGRACIONES, label: "Integraciones" },
  { value: NecesidadConsulta.MANTENIMIENTO, label: "Mantenimiento" },
  { value: NecesidadConsulta.NO_SE, label: "Otro / no estoy seguro" },
] as const;

const NECESIDAD_VALORES = NECESIDAD_OPCIONES.map((o) => o.value) as [
  NecesidadConsulta,
  ...NecesidadConsulta[],
];

export const contactoSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre completo")
    .max(120, "Nombre demasiado largo"),
  email: z.string().trim().email("Ingresá un email válido"),
  telefono: z
    .string()
    .trim()
    .max(40, "Teléfono demasiado largo")
    .optional()
    .or(z.literal("")),
  empresa: z
    .string()
    .trim()
    .max(120, "Nombre de empresa demasiado largo")
    .optional()
    .or(z.literal("")),
  necesidad: z.enum(NECESIDAD_VALORES, {
    message: "Elegí qué necesitás",
  }),
  mensaje: z
    .string()
    .trim()
    .min(10, "Contanos un poco más sobre tu operación")
    .max(2000, "Mensaje demasiado largo"),
});

export type ContactoInput = z.infer<typeof contactoSchema>;
