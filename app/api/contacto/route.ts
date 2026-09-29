import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactoSchema, NECESIDAD_OPCIONES } from "@/lib/validations/contacto";
import { enviarTelegram } from "@/lib/telegram";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { error: "Cuerpo de la solicitud inválido" },
      { status: 400 }
    );
  }

  const parsed = contactoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { nombre, email, telefono, empresa, necesidad, mensaje } = parsed.data;

  const consulta = await prisma.consulta.create({
    data: {
      nombre,
      email,
      telefono: telefono || null,
      empresa: empresa || null,
      necesidad,
      mensaje,
    },
  });

  const necesidadLabel =
    NECESIDAD_OPCIONES.find((o) => o.value === necesidad)?.label ?? necesidad;

  await enviarTelegram(
    `🔔 Nueva consulta\n\nNombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono || "No especificado"}\nEmpresa: ${empresa || "No especificado"}\nNecesita: ${necesidadLabel}\n\nMensaje:\n${mensaje}`
  );

  return NextResponse.json({ id: consulta.id }, { status: 201 });
}
