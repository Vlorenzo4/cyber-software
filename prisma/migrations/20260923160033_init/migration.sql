-- CreateEnum
CREATE TYPE "TipoProyecto" AS ENUM ('SISTEMA_GESTION', 'TIENDA_WEB', 'SAAS', 'AUTOMATIZACION_IA', 'OTRO');

-- CreateEnum
CREATE TYPE "EstadoProyecto" AS ENUM ('EN_DESARROLLO', 'ACTIVO', 'PAUSADO', 'FINALIZADO');

-- CreateEnum
CREATE TYPE "EstadoCobro" AS ENUM ('PENDIENTE', 'PARCIAL', 'PAGADO', 'MANTENIMIENTO');

-- CreateEnum
CREATE TYPE "EstadoTicket" AS ENUM ('ABIERTO', 'EN_REVISION', 'RESUELTO');

-- CreateEnum
CREATE TYPE "PrioridadTicket" AS ENUM ('BAJA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "EstadoConsulta" AS ENUM ('NUEVA', 'CONTACTADA', 'CONVERTIDA', 'DESCARTADA');

-- CreateEnum
CREATE TYPE "NecesidadConsulta" AS ENUM ('SISTEMA_GESTION', 'AUTOMATIZACION_IA', 'TIENDA_WEB', 'INTEGRACIONES', 'MANTENIMIENTO', 'NO_SE');

-- CreateTable
CREATE TABLE "Proyecto" (
    "id" TEXT NOT NULL,
    "clienteNombre" TEXT NOT NULL,
    "nombreProyecto" TEXT NOT NULL,
    "tipo" "TipoProyecto" NOT NULL,
    "estado" "EstadoProyecto" NOT NULL DEFAULT 'EN_DESARROLLO',
    "stack" TEXT,
    "urlProduccion" TEXT,
    "adminStatsUrl" TEXT,
    "notas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cobro" (
    "id" TEXT NOT NULL,
    "proyectoId" TEXT NOT NULL,
    "montoTotal" DECIMAL(12,2) NOT NULL,
    "montoCobrado" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "estado" "EstadoCobro" NOT NULL DEFAULT 'PENDIENTE',
    "notas" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cobro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "proyectoId" TEXT NOT NULL,
    "asunto" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "estado" "EstadoTicket" NOT NULL DEFAULT 'ABIERTO',
    "prioridad" "PrioridadTicket" NOT NULL DEFAULT 'MEDIA',
    "remitenteNombre" TEXT NOT NULL,
    "remitenteEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consulta" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT,
    "empresa" TEXT,
    "necesidad" "NecesidadConsulta" NOT NULL,
    "mensaje" TEXT NOT NULL,
    "estado" "EstadoConsulta" NOT NULL DEFAULT 'NUEVA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cobro" ADD CONSTRAINT "Cobro_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_proyectoId_fkey" FOREIGN KEY ("proyectoId") REFERENCES "Proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE;
