import RevealOnScroll from "./RevealOnScroll";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";

const SERVICIOS = [
  {
    titulo: "SISTEMAS DE GESTIÓN A MEDIDA",
    texto:
      "Ventas, stock, cuentas corrientes y permisos por rol, en un sistema hecho para tu operación.",
    tags: "VENTAS · STOCK · ROLES",
  },
  {
    titulo: "AUTOMATIZACIÓN CON IA",
    texto:
      "Asistentes, avisos automáticos y respuestas con catálogo y stock en tiempo real.",
    tags: "ASISTENTES · AVISOS · CATÁLOGO",
  },
  {
    titulo: "TIENDAS Y WEBS A MEDIDA",
    texto: "Dominio propio, cobros online, envíos y SEO, todo construido para tu marca.",
    tags: "DOMINIO · COBROS · SEO",
  },
  {
    titulo: "INTEGRACIONES",
    texto: "AFIP/ARCA, Mercado Pago, Mercado Libre y WhatsApp conectados a tu sistema.",
    tags: "AFIP · MERCADO PAGO · WHATSAPP",
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="mx-auto max-w-[1600px] px-[6vw] py-[120px]">
      <RevealOnScroll>
        <h2 className="mb-20 font-display text-[clamp(2.2rem,4vw,3.2rem)] font-bold uppercase tracking-[-0.01em]">
          SERVICIOS
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICIOS.map((s) => (
            <div
              key={s.titulo}
              className="bg-cyan p-[2px]"
              style={{ clipPath: CUT_CORNERS_CLIP }}
            >
              <div
                className="h-full bg-[#131313] p-10"
                style={{ clipPath: CUT_CORNERS_CLIP }}
              >
                <div className="mb-6 h-[12px] w-[12px] bg-yellow" />
                <h3 className="mb-4 font-display text-2xl font-semibold uppercase">
                  {s.titulo}
                </h3>
                <p className="mb-5 text-base leading-[1.65] text-[#9A9A9A]">
                  {s.texto}
                </p>
                <div className="text-sm tracking-[0.05em] text-cyan">
                  {s.tags}
                </div>
              </div>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
