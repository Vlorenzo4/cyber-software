import ClipOutlineButton from "./ClipOutlineButton";
import HeroGem from "./HeroGem";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden px-[6vw] pt-[210px] pb-20"
    >
      <div
        className="animate-hero-glow pointer-events-none absolute -top-[10%] left-1/2 h-[1100px] w-[1100px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(244,228,0,0.38), rgba(244,228,0,0.10) 42%, transparent 68%)",
        }}
      />

      <HeroGem />

      <div className="relative z-10 max-w-[820px]">
        <div className="mb-6 flex items-center gap-2 text-[13px] font-semibold tracking-[0.18em] text-cyan">
          <span className="inline-block h-[6px] w-[6px] bg-cyan" />
          ARGENTINA · DESDE 2026
        </div>

        <h1 className="mb-6 font-display text-[clamp(2.4rem,5.6vw,4.4rem)] font-bold uppercase leading-[1.06] tracking-[-0.01em] text-background">
          TU EMPRESA YA SABE CÓMO TRABAJA. NOSOTROS HACEMOS EL{" "}
          <span className="bg-background px-2 text-yellow">SISTEMA</span> QUE
          LA SIGUE.
        </h1>

        <p className="mb-10 max-w-[520px] text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.6] text-background/70">
          Desarrollamos software a medida entendiendo primero cómo trabaja tu
          negocio, y después construimos el sistema que se adapta a eso — no
          al revés.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#contacto"
            className="bg-background px-[30px] py-4 text-[14px] font-bold tracking-[0.06em] text-yellow hover:brightness-125 transition-[filter]"
            style={{ clipPath: CUT_CORNERS_CLIP }}
          >
            PEDIR PRESUPUESTO
          </a>
          <ClipOutlineButton
            href="#proyectos"
            borderColorClass="bg-cyan"
            fillClass="bg-yellow"
            textColorClass="text-background"
            hoverClass="hover:bg-background/10"
            className="px-[30px] py-4 text-[14px] font-bold tracking-[0.06em]"
          >
            VER PROYECTOS
          </ClipOutlineButton>
        </div>
      </div>
    </section>
  );
}
