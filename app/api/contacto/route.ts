import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";
import { contactoSchema, NECESIDAD_OPCIONES } from "@/lib/validations/contacto";

const NOTIFICACION_DESTINO = "valenvfx04@gmail.com";

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

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const necesidadLabel =
        NECESIDAD_OPCIONES.find((o) => o.value === necesidad)?.label ?? necesidad;

      await resend.emails.send({
        from: "Cyber Software <onboarding@resend.dev>",
        to: NOTIFICACION_DESTINO,
        subject: `Nueva consulta: ${nombre}`,
        text: [
          "Llegó una consulta nueva desde la landing.",
          "",
          `Nombre: ${nombre}`,
          `Email: ${email}`,
          `Teléfono: ${telefono || "—"}`,
          `Empresa: ${empresa || "—"}`,
          `Necesita: ${necesidadLabel}`,
          "",
          "Mensaje:",
          mensaje,
        ].join("\n"),
      });
    } catch (error) {
      console.error("Error enviando mail de notificación con Resend:", error);
    }
  } else {
    console.warn(
      "RESEND_API_KEY no configurada: se omitió el envío de la notificación por mail."
    );
  }

  return NextResponse.json({ id: consulta.id }, { status: 201 });
}
