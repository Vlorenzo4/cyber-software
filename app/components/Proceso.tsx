import RevealOnScroll from "./RevealOnScroll";

const PASOS = [
  {
    numero: "01",
    titulo: "MIRAMOS TU OPERACIÓN",
    texto:
      "Nos contás qué hace la empresa, cómo trabajan hoy y qué te está costando más tiempo o plata. No hace falta que sepas nada técnico: con eso alcanza para armar una propuesta que tenga sentido para tu operación.",
  },
  {
    numero: "02",
    titulo: "TE PASAMOS LA PROPUESTA",
    texto:
      "No tenemos precio de lista porque no hay dos sistemas iguales. Te mandamos un presupuesto por escrito, con qué incluye, en qué orden se construye y cuánto tarda cada etapa, antes de tocar una sola línea de código.",
  },
  {
    numero: "03",
    titulo: "LO CONSTRUIMOS POR ETAPAS",
    texto:
      "Vamos por etapas cortas, y al final de cada una te mostramos algo funcionando de verdad, no un informe. Si en el camino hay que ajustar el rumbo, se ajusta ahí mismo, sin esperar a que esté todo terminado.",
  },
  {
    numero: "04",
    titulo: "LO DEJAMOS ANDANDO",
    texto:
      "Te entregamos el sistema funcionando y capacitamos a tu equipo para que lo usen sin depender de nosotros. Después, un abono mensual cubre el hosting, el mantenimiento y las mejoras que vayan saliendo — el soporte sigue incluido, no termina en la entrega.",
  },
];

export default function Proceso() {
  return (
    <section id="proceso" className="mx-auto max-w-[1600px] px-[6vw] py-[120px]">
      <RevealOnScroll>
        <h2 className="mb-20 font-display text-[clamp(2.2rem,4vw,3.2rem)] font-bold uppercase tracking-[-0.01em] text-background">
          CÓMO TRABAJAMOS
        </h2>
        <div className="relative mx-auto max-w-[760px]">
          <div
            className="absolute left-8 top-2 bottom-2 w-px bg-background/25"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-16">
            {PASOS.map((paso) => (
              <RevealOnScroll key={paso.numero} className="relative flex gap-8">
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-cyan bg-background font-display text-xl font-bold text-cyan">
                  {paso.numero}
                </div>
                <div className="pt-3">
                  <h3 className="mb-4 font-display text-[28px] font-semibold uppercase text-background">
                    {paso.titulo}
                  </h3>
                  <p className="max-w-[560px] text-lg leading-[1.65] text-background/70">
                    {paso.texto}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
