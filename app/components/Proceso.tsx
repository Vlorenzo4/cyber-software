import RevealOnScroll from "./RevealOnScroll";

const PASOS = [
  {
    numero: "01",
    titulo: "MIRAMOS TU OPERACIÓN",
    texto: "Charla inicial gratis, sin conocimientos técnicos necesarios de tu parte.",
  },
  {
    numero: "02",
    titulo: "TE PASAMOS LA PROPUESTA",
    texto:
      "Presupuesto por escrito. Sin precio de lista fijo: cada proyecto se cotiza según lo que necesita.",
  },
  {
    numero: "03",
    titulo: "LO CONSTRUIMOS POR ETAPAS",
    texto: "Etapas cortas, con algo demostrable funcionando al final de cada una.",
  },
  {
    numero: "04",
    titulo: "LO DEJAMOS ANDANDO",
    texto:
      "Capacitamos al equipo. Sigue un abono mensual que cubre hosting, mantenimiento y mejoras.",
  },
];

export default function Proceso() {
  return (
    <section id="proceso" className="mx-auto max-w-[1200px] px-[6vw] py-[100px]">
      <RevealOnScroll>
        <h2 className="mb-14 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-bold uppercase tracking-[-0.01em] text-background">
          CÓMO TRABAJAMOS
        </h2>
        <div className="flex flex-wrap">
          {PASOS.map((paso) => (
            <div
              key={paso.numero}
              className="min-w-[220px] flex-1 border-l-2 border-background/25 py-0 pb-6 pl-6 pr-6"
            >
              <div className="mb-4 font-display text-4xl font-bold text-background">
                {paso.numero}
              </div>
              <h3 className="mb-2.5 font-display text-[17px] font-semibold uppercase text-background">
                {paso.titulo}
              </h3>
              <p className="text-sm leading-[1.6] text-background/70">{paso.texto}</p>
            </div>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
