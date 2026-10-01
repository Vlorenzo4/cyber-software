import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Script de una sola vez para cargar los proyectos reales del portfolio
// público (mostrarEnLanding: true). A diferencia de seed.ts (data de demo
// para el panel admin, que se borra y recrea en cada corrida), este script
// es idempotente: si el proyecto ya existe (por nombreProyecto), lo
// actualiza en vez de duplicarlo.
const PROYECTOS_PORTFOLIO = [
  {
    clienteNombre: "Valentín Lorenzo",
    nombreProyecto: "LaBanda",
    tipo: "SAAS" as const,
    estado: "ACTIVO" as const,
    mostrarEnLanding: true,
    tagsPortfolio: ["PRODUCTO PROPIO", "SISTEMA COMPLETO"],
    imagenPortfolioUrl: "/proyectos/labanda.png",
    descripcionPortfolio:
      "App para organizar juntadas entre amigos: eventos, gastos compartidos, encuestas y torneos integrados, con sistema de amigos y notificaciones.",
    // TODO: no tengo la URL real de LaBanda todavía — reemplazar acá (o
    // actualizar el registro directo en la base) en cuanto esté disponible.
    linkPublico: null,
  },
  {
    clienteNombre: "Valentín Lorenzo",
    nombreProyecto: "Kembron",
    tipo: "SISTEMA_GESTION" as const,
    estado: "ACTIVO" as const,
    mostrarEnLanding: true,
    tagsPortfolio: ["SISTEMA COMPLETO"],
    imagenPortfolioUrl: "/proyectos/obras.png",
    descripcionPortfolio:
      "Plataforma de gestión de obras de construcción, con panel de administrador (presupuestos, Gantt, Curva S) y panel de supervisor para cargar avance desde el celular en obra.",
    linkPublico: null,
  },
  {
    clienteNombre: "Valentín Lorenzo",
    nombreProyecto: "Montevino",
    tipo: "TIENDA_WEB" as const,
    estado: "ACTIVO" as const,
    mostrarEnLanding: true,
    tagsPortfolio: ["SISTEMA COMPLETO"],
    imagenPortfolioUrl: "/proyectos/montevinov2.png",
    descripcionPortfolio:
      "Sistema de reservas para restaurantes con selección de platos y pago online. Desarrollé el backend en NestJS: autenticación con Auth0, control de stock en tiempo real, integración con Mercado Pago vía webhooks y notificaciones por email.",
    linkPublico: null,
  },
];

async function main() {
  for (const data of PROYECTOS_PORTFOLIO) {
    const existente = await prisma.proyecto.findFirst({
      where: { nombreProyecto: data.nombreProyecto },
    });

    if (existente) {
      await prisma.proyecto.update({ where: { id: existente.id }, data });
      console.log(`Actualizado: ${data.nombreProyecto}`);
    } else {
      await prisma.proyecto.create({ data });
      console.log(`Creado: ${data.nombreProyecto}`);
    }
  }

  console.log("Portfolio cargado.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
