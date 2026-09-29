-- CreateEnum
CREATE TYPE "OrigenTicket" AS ENUM ('CLIENTE', 'SISTEMA');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "origen" "OrigenTicket" NOT NULL DEFAULT 'CLIENTE',
ALTER COLUMN "remitenteNombre" DROP NOT NULL,
ALTER COLUMN "remitenteEmail" DROP NOT NULL;
