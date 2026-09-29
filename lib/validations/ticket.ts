import { z } from "zod";
import { PrioridadTicket, OrigenTicket } from "@prisma/client";

const PRIORIDAD_VALORES = Object.values(PrioridadTicket) as [
  PrioridadTicket,
  ...PrioridadTicket[],
];

const ORIGEN_VALORES = Object.values(OrigenTicket) as [
  OrigenTicket,
  ...OrigenTicket[],
];

const baseTicketSchema = z.object({
  proyectoId: z.string().trim().min(1, "proyectoId es obligatorio"),
  asunto: z.string().trim().min(2, "El asunto es demasiado corto").max(200),
  descripcion: z
    .string()
    .trim()
    .min(2, "La descripción es demasiado corta")
    .max(5000),
  prioridad: z.enum(PRIORIDAD_VALORES).default(PrioridadTicket.MEDIA),
  origen: z.enum(ORIGEN_VALORES),
  remitenteNombre: z.string().trim().max(120).optional(),
  remitenteEmail: z.string().trim().email("Email inválido").optional(),
});

export const ticketSchema = baseTicketSchema.superRefine((data, ctx) => {
  if (data.origen === OrigenTicket.CLIENTE) {
    if (!data.remitenteNombre) {
      ctx.addIssue({
        code: "custom",
        path: ["remitenteNombre"],
        message: "remitenteNombre es obligatorio cuando origen es CLIENTE",
      });
    }
    if (!data.remitenteEmail) {
      ctx.addIssue({
        code: "custom",
        path: ["remitenteEmail"],
        message: "remitenteEmail es obligatorio cuando origen es CLIENTE",
      });
    }
  }
});

export type TicketInput = z.infer<typeof ticketSchema>;
