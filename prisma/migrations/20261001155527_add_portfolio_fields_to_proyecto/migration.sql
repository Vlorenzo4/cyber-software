-- AlterTable
ALTER TABLE "Proyecto" ADD COLUMN     "descripcionPortfolio" TEXT,
ADD COLUMN     "imagenPortfolioUrl" TEXT,
ADD COLUMN     "linkPublico" TEXT,
ADD COLUMN     "mostrarEnLanding" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resenaAutor" TEXT,
ADD COLUMN     "resenaTexto" TEXT,
ADD COLUMN     "tagsPortfolio" TEXT[] DEFAULT ARRAY[]::TEXT[];
