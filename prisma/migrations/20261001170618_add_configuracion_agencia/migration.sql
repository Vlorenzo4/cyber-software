-- CreateTable
CREATE TABLE "ConfiguracionAgencia" (
    "id" TEXT NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfiguracionAgencia_pkey" PRIMARY KEY ("id")
);
