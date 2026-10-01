import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";
import { prisma } from "@/lib/prisma";

export default async function Proyectos() {
  const proyectos = await prisma.proyecto.findMany({
    where: { mostrarEnLanding: true },
    orderBy: { createdAt: "asc" },
  });

  if (proyectos.length === 0) return null;

  return (
    <section id="proyectos" className="mx-auto max-w-[1600px] px-[6vw] py-[120px]">
      <RevealOnScroll>
        <h2 className="mb-20 font-display text-[clamp(2.2rem,4vw,3.2rem)] font-bold uppercase tracking-[-0.01em]">
          PROYECTOS
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((p) => (
            <div
              key={p.id}
              className="bg-cyan p-[2px]"
              style={{ clipPath: CUT_CORNERS_CLIP }}
            >
              <div
                className="flex h-full flex-col bg-[#131313]"
                style={{ clipPath: CUT_CORNERS_CLIP }}
              >
                {p.imagenPortfolioUrl && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.imagenPortfolioUrl}
                      alt={p.nombreProyecto}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-8">
                  {p.tagsPortfolio.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {p.tagsPortfolio.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block border border-cyan px-3 py-1.5 text-xs uppercase tracking-[0.08em] text-cyan"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3 className="mb-3 font-display text-2xl font-semibold uppercase">
                    {p.nombreProyecto}
                  </h3>
                  {p.descripcionPortfolio && (
                    <p className="text-base leading-[1.65] text-[#9A9A9A]">
                      {p.descripcionPortfolio}
                    </p>
                  )}

                  {p.resenaTexto && (
                    <div className="mt-6 border-l-2 border-cyan/40 pl-4">
                      <p className="text-sm italic leading-[1.6] text-[#B8B8B8]">
                        &ldquo;{p.resenaTexto}&rdquo;
                      </p>
                      {p.resenaAutor && (
                        <p className="mt-2 text-xs uppercase tracking-[0.06em] text-[#5A5A5A]">
                          — {p.resenaAutor}
                        </p>
                      )}
                    </div>
                  )}

                  {p.linkPublico && (
                    <a
                      href={p.linkPublico}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-block self-start border border-cyan px-5 py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-cyan transition-colors hover:bg-cyan hover:text-background"
                    >
                      Usar app
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
