import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Borrando datos existentes...");
  // Orden: primero los modelos con relación a Proyecto, después Proyecto.
  await prisma.cobro.deleteMany();
  await prisma.ticket.deleteMany();
  await prisma.consulta.deleteMany();
  await prisma.proyecto.deleteMany();

  console.log("Creando proyectos...");
  const norteInsumos = await prisma.proyecto.create({
    data: {
      clienteNombre: "Norte Insumos SRL",
      nombreProyecto: "Sistema de gestión Norte",
      tipo: "SISTEMA_GESTION",
      estado: "ACTIVO",
      stack: "Next.js, Prisma, Supabase",
      urlProduccion: "https://norteinsumos.example.com",
      notas: "Cliente con abono mensual de mantenimiento.",
    },
  });

  const tiendaDeAna = await prisma.proyecto.create({
    data: {
      clienteNombre: "La Tienda de Ana",
      nombreProyecto: "Tienda online Ana",
      tipo: "TIENDA_WEB",
      estado: "EN_DESARROLLO",
      stack: "Next.js, Mercado Pago",
      notas: "Falta integrar facturación AFIP antes de lanzar.",
    },
  });

  const riffdeck = await prisma.proyecto.create({
    data: {
      clienteNombre: "RiffDeck",
      nombreProyecto: "Plataforma RiffDeck",
      tipo: "SAAS",
      estado: "ACTIVO",
      stack: "Next.js, Prisma, Supabase, Stripe",
      urlProduccion: "https://riffdeck.example.com",
      adminStatsUrl: "https://riffdeck.example.com/admin/stats",
      notas: "Producto propio, no de cliente.",
    },
  });

  const estudioRios = await prisma.proyecto.create({
    data: {
      clienteNombre: "Estudio Contable Ríos",
      nombreProyecto: "Asistente de WhatsApp",
      tipo: "AUTOMATIZACION_IA",
      estado: "PAUSADO",
      stack: "Next.js, OpenAI, WhatsApp Business API",
      notas: "Pausado hasta que el cliente confirme presupuesto ampliado.",
    },
  });

  console.log("Creando cobros...");
  await prisma.cobro.create({
    data: {
      proyectoId: norteInsumos.id,
      montoTotal: 500000,
      montoCobrado: 500000,
      estado: "PAGADO",
      notas: "Pago único, proyecto entregado.",
    },
  });

  await prisma.cobro.create({
    data: {
      proyectoId: tiendaDeAna.id,
      montoTotal: 300000,
      montoCobrado: 100000,
      estado: "PARCIAL",
      notas: "Anticipo del 33% cobrado al inicio.",
    },
  });

  await prisma.cobro.create({
    data: {
      proyectoId: riffdeck.id,
      montoTotal: 800000,
      montoCobrado: 0,
      estado: "PENDIENTE",
      notas: "Presupuestado, esperando aprobación del cliente.",
    },
  });

  console.log("Creando consultas...");
  await prisma.consulta.create({
    data: {
      nombre: "Carlos Fernández",
      email: "carlos@example.com",
      telefono: "+54 9 351 555-1111",
      empresa: "Ferretería Fernández",
      necesidad: "SISTEMA_GESTION",
      mensaje:
        "Necesitamos un sistema para manejar stock y cuentas corrientes de nuestros clientes mayoristas.",
      estado: "NUEVA",
    },
  });

  await prisma.consulta.create({
    data: {
      nombre: "Marina López",
      email: "marina@example.com",
      telefono: null,
      empresa: "Estudio Jurídico López",
      necesidad: "AUTOMATIZACION_IA",
      mensaje:
        "Queremos un asistente que responda consultas frecuentes de clientes por WhatsApp.",
      estado: "NUEVA",
    },
  });

  await prisma.consulta.create({
    data: {
      nombre: "Diego Suárez",
      email: "diego@example.com",
      telefono: "+54 9 11 4444-2222",
      empresa: "Indumentaria DS",
      necesidad: "TIENDA_WEB",
      mensaje: "Quiero vender online con envíos y cobro con Mercado Pago.",
      estado: "CONTACTADA",
    },
  });

  await prisma.consulta.create({
    data: {
      nombre: "Valeria Gómez",
      email: "valeria@example.com",
      telefono: "+54 9 351 777-3333",
      empresa: null,
      necesidad: "INTEGRACIONES",
      mensaje:
        "Tenemos varios sistemas sueltos (facturación, stock, redes) y queremos que hablen entre sí.",
      estado: "CONTRATADA",
    },
  });

  console.log("Creando tickets...");
  // NUEVO + ALTA: borde celeste (por NUEVO) y punto rojo (por ALTA sin resolver), a la vez.
  await prisma.ticket.create({
    data: {
      proyectoId: norteInsumos.id,
      asunto: "Error al emitir factura",
      descripcion:
        "Al intentar facturar a un cliente con cuenta corriente, el sistema tira error 500.",
      estado: "NUEVO",
      prioridad: "ALTA",
      origen: "CLIENTE",
      remitenteNombre: "Ana Martínez",
      remitenteEmail: "ana@norteinsumos.com",
    },
  });

  // EN_REVISION + ALTA: solo punto rojo (ya no es NUEVO, pero sigue sin resolver).
  await prisma.ticket.create({
    data: {
      proyectoId: riffdeck.id,
      asunto: "Uso de CPU elevado",
      descripcion:
        "El servidor de producción viene con picos de CPU sostenidos por encima del 90% en horario pico.",
      estado: "EN_REVISION",
      prioridad: "ALTA",
      origen: "SISTEMA",
    },
  });

  // NUEVO + MEDIA: solo borde celeste, sin punto rojo.
  await prisma.ticket.create({
    data: {
      proyectoId: tiendaDeAna.id,
      asunto: "Duda sobre configuración de envíos",
      descripcion:
        "No entiendo cómo configurar las zonas de envío y sus costos en el panel.",
      estado: "NUEVO",
      prioridad: "MEDIA",
      origen: "CLIENTE",
      remitenteNombre: "Ana Pérez",
      remitenteEmail: "ana@latiendadeana.com",
    },
  });

  // RESUELTO + ALTA: ningún indicador (ni borde ni punto), pese a la prioridad alta.
  await prisma.ticket.create({
    data: {
      proyectoId: estudioRios.id,
      asunto: "Falso positivo en respuestas automáticas",
      descripcion:
        "El asistente respondía con información desactualizada; ya se corrigió la base de conocimiento.",
      estado: "RESUELTO",
      prioridad: "ALTA",
      origen: "CLIENTE",
      remitenteNombre: "Julián Ríos",
      remitenteEmail: "julian@estudiorios.com",
    },
  });

  console.log("Seed completo.");
  console.log(`Proyectos: 4, Cobros: 3, Consultas: 4, Tickets: 4`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
