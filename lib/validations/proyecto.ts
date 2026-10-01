import { z } from "zod";

const basePortfolioSchema = z.object({
  mostrarEnLanding: z.boolean(),
  imagenPortfolioUrl: z.string().trim().min(1).nullable(),
  descripcionPortfolio: z.string().trim().min(1).nullable(),
  tagsPortfolio: z.array(z.string()),
  linkPublico: z.string().trim().nullable(),
  resenaTexto: z.string().trim().nullable(),
  resenaAutor: z.string().trim().nullable(),
});

export const portfolioSchema = basePortfolioSchema.superRefine((data, ctx) => {
  if (data.mostrarEnLanding) {
    if (!data.imagenPortfolioUrl) {
      ctx.addIssue({
        code: "custom",
        path: ["imagenPortfolioUrl"],
        message:
          "La imagen es obligatoria cuando el proyecto se muestra en la landing",
      });
    }
    if (!data.descripcionPortfolio) {
      ctx.addIssue({
        code: "custom",
        path: ["descripcionPortfolio"],
        message:
          "La descripción pública es obligatoria cuando el proyecto se muestra en la landing",
      });
    }
    if (data.tagsPortfolio.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["tagsPortfolio"],
        message:
          "Tenés que cargar al menos un tag cuando el proyecto se muestra en la landing",
      });
    }
  }
});

export type PortfolioInput = z.infer<typeof portfolioSchema>;
