import RevealOnScroll from "./RevealOnScroll";

const PROBLEMAS = [
  {
    numero: "01",
    titulo: "SOFTWARE QUE TE OBLIGA A CAMBIAR",
    texto:
      "Los sistemas genéricos te hacen adaptar tu forma de trabajar a ellos. Nosotros construimos el sistema alrededor de cómo ya trabajás.",
  },
  {
    numero: "02",
    titulo: "SISTEMAS QUE NO SE HABLAN",
    texto:
      "Tienda, facturación y redes por separado significan cargar los mismos datos tres veces. Integramos todo para que la información viaje sola.",
  },
  {
    numero: "03",
    titulo: "MIEDO A QUE DESAPAREZCAMOS",
    texto:
      "La preocupación de siempre: que alguien entregue, cobre, y no vuelva más. El soporte sigue incluido después de la entrega, con abono mensual.",
  },
];

export default function Problemas() {
  return (
    <section className="mx-auto max-w-[1200px] px-[6vw] py-[100px]">
      <RevealOnScroll>
        <h2 className="mb-14 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-bold uppercase tracking-[-0.01em]">
          PROBLEMAS QUE <span className="text-yellow">RESOLVEMOS</span>
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-12">
          {PROBLEMAS.map((p) => (
            <div key={p.numero}>
              <div className="mb-4 font-display text-[14px] font-bold tracking-[0.1em] text-cyan">
                {p.numero}
              </div>
              <h3 className="mb-3 font-display text-xl font-semibold uppercase">
                {p.titulo}
              </h3>
              <p className="text-[15px] leading-[1.6] text-[#9A9A9A]">
                {p.texto}
              </p>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
