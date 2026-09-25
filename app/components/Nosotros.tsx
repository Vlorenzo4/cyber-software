import RevealOnScroll from "./RevealOnScroll";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";

export default function Nosotros() {
  return (
    <section id="nosotros" className="mx-auto max-w-[1200px] px-[6vw] py-[100px]">
      <RevealOnScroll>
        <h2 className="mb-14 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-bold uppercase tracking-[-0.01em] text-background">
          QUIÉNES SOMOS
        </h2>
        <div
          className="bg-cyan p-[2px]"
          style={{ clipPath: CUT_CORNERS_CLIP }}
        >
          <div
            className="flex flex-wrap items-start gap-12 bg-[#131313] p-8"
            style={{ clipPath: CUT_CORNERS_CLIP }}
          >
            <div
              className="flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-full border-2 border-cyan/50"
              style={{
                background:
                  "repeating-linear-gradient(45deg, #1A1A1A 0 8px, #151515 8px 16px)",
              }}
            >
              <span className="font-display text-[13px] text-[#8C8C8C]">
                FOTO
              </span>
            </div>
            <div className="min-w-[260px] flex-1">
              <h3 className="mb-1 font-display text-[22px] font-semibold uppercase text-foreground">
                NICOLÁS DUARTE
              </h3>
              <div className="mb-5 flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] text-cyan">
                <span className="inline-block h-[6px] w-[6px] shrink-0 bg-cyan" />
                FULL-STACK DEVELOPER &amp; FUNDADOR
              </div>
              <p className="mb-7 max-w-[520px] text-[15px] leading-[1.6] text-[#9A9A9A]">
                Hablás directo con quien programa tu sistema, no con un
                vendedor intermediario.
              </p>
              <div className="flex flex-wrap gap-8">
                <div>
                  <div className="mb-1.5 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
                    BASE
                  </div>
                  <div className="text-sm text-foreground">
                    Buenos Aires, Argentina
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
                    TRABAJO
                  </div>
                  <div className="text-sm text-foreground">A medida</div>
                </div>
                <div>
                  <div className="mb-1.5 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
                    DISPONIBILIDAD
                  </div>
                  <div className="text-sm text-foreground">Agenda abierta</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
