import { NextResponse } from "next/server";
import { OrigenTicket } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ticketSchema } from "@/lib/validations/ticket";
import { enviarTelegram } from "@/lib/telegram";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (!checkRateLimit(`tickets:${ip}`, 20, 60_000)) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Probá de nuevo en un minuto." },
      { status: 429 }
    );
  }

  const apiKey = request.headers.get("x-api-key");
  const expectedApiKey = process.env.TICKETS_API_KEY;

  if (!expectedApiKey || apiKey !== expectedApiKey) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { error: "Cuerpo de la solicitud inválido" },
      { status: 400 }
    );
  }

  const parsed = ticketSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const {
    proyectoId,
    asunto,
    descripcion,
    prioridad,
    origen,
    remitenteNombre,
    remitenteEmail,
  } = parsed.data;

  const proyecto = await prisma.proyecto.findUnique({
    where: { id: proyectoId },
    select: { id: true, nombreProyecto: true },
  });

  if (!proyecto) {
    return NextResponse.json(
      { error: "El proyecto indicado no existe" },
      { status: 404 }
    );
  }

  const ticket = await prisma.ticket.create({
    data: {
      proyectoId,
      asunto,
      descripcion,
      prioridad,
      origen,
      remitenteNombre: remitenteNombre || null,
      remitenteEmail: remitenteEmail || null,
    },
  });

  const mensaje =
    origen === OrigenTicket.CLIENTE
      ? `🎫 Nuevo ticket de soporte\n\nProyecto: ${proyecto.nombreProyecto}\nDe: ${remitenteNombre} (${remitenteEmail})\nPrioridad: ${prioridad}\n\n${asunto}\n${descripcion}`
      : `⚠️ Alerta automática\n\nProyecto: ${proyecto.nombreProyecto}\nPrioridad: ${prioridad}\n\n${asunto}\n${descripcion}`;

  await enviarTelegram(mensaje);

  return NextResponse.json({ id: ticket.id }, { status: 201 });
}
