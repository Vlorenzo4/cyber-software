import RevealOnScroll from "./RevealOnScroll";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";

const PROYECTOS = [
  {
    shot: "PRODUCT SHOT — RIFFDECK",
    badge: "EN PRODUCCIÓN · PRODUCTO PROPIO",
    badgeVariant: "cyan" as const,
    titulo: "RIFFDECK",
    texto:
      "App para armar setlists y llevar letras y acordes en vivo, pensada para bandas.",
  },
  {
    shot: "PRODUCT SHOT — NORTE INSUMOS",
    badge: "EN DESARROLLO · CLIENTE",
    badgeVariant: "neutral" as const,
    titulo: "NORTE INSUMOS",
    texto:
      "Sistema de gestión para una distribuidora de insumos industriales, con stock y cuentas corrientes.",
  },
  {
    shot: "PRODUCT SHOT — LA TIENDA DE ANA",
    badge: "ENTREGADO · CLIENTE",
    badgeVariant: "neutral" as const,
    titulo: "LA TIENDA DE ANA",
    texto: "Tienda online con integración de Mercado Pago y facturación AFIP.",
  },
];

export default function Proyectos() {
  return (
    <section id="proyectos" className="mx-auto max-w-[1500px] px-[6vw] py-[100px]">
      <RevealOnScroll>
        <h2 className="mb-14 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-bold uppercase tracking-[-0.01em]">
          PROYECTOS
        </h2>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {PROYECTOS.map((p) => (
            <div
              key={p.titulo}
              className="bg-cyan p-[2px]"
              style={{ clipPath: CUT_CORNERS_CLIP }}
            >
              <div
                className="h-full bg-[#131313]"
                style={{ clipPath: CUT_CORNERS_CLIP }}
              >
                <div
                  className="flex aspect-[16/10] items-center justify-center"
                  style={{
                    background:
                      "repeating-linear-gradient(135deg, #1A1A1A 0 10px, #151515 10px 20px)",
                  }}
                >
                  <span className="font-mono text-xs tracking-[0.05em] text-[#5A5A5A]">
                    {p.shot}
                  </span>
                </div>
                <div className="p-6">
                  <div
                    className={`mb-4 inline-block border px-[10px] py-1 text-[11px] uppercase tracking-[0.08em] ${
                      p.badgeVariant === "cyan"
                        ? "border-cyan text-cyan"
                        : "border-white/25 text-[#B8B8B8]"
                    }`}
                  >
                    {p.badge}
                  </div>
                  <h3 className="mb-2 font-display text-[19px] font-semibold uppercase">
                    {p.titulo}
                  </h3>
                  <p className="text-sm leading-[1.6] text-[#9A9A9A]">{p.texto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
