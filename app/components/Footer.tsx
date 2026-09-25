import RevealOnScroll from "./RevealOnScroll";

export default function Footer() {
  return (
    <footer className="border-t border-yellow/15 px-[6vw] py-14">
      <RevealOnScroll className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-10">
        <div className="max-w-[280px]">
          <div className="mb-2.5 font-display text-lg font-bold uppercase">
            <span className="text-yellow">CYBER</span>
            <span className="text-foreground">SOFTWARE</span>
          </div>
          <p className="text-[13px] leading-[1.6] text-[#8C8C8C]">
            Software a medida para negocios reales.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <a href="#servicios" className="text-[13px] text-[#B8B8B8] hover:text-cyan">
            Servicios
          </a>
          <a href="#proyectos" className="text-[13px] text-[#B8B8B8] hover:text-cyan">
            Proyectos
          </a>
          <a href="#proceso" className="text-[13px] text-[#B8B8B8] hover:text-cyan">
            Proceso
          </a>
          <a href="#nosotros" className="text-[13px] text-[#B8B8B8] hover:text-cyan">
            Nosotros
          </a>
        </div>

        <div className="flex flex-col gap-2.5">
          <a
            href="https://wa.me/5491155550100"
            className="text-[13px] text-[#B8B8B8] hover:text-cyan"
          >
            WhatsApp
          </a>
          <a
            href="mailto:hola@cybersoftware.dev"
            className="text-[13px] text-[#B8B8B8] hover:text-cyan"
          >
            hola@cybersoftware.dev
          </a>
          <a
            href="https://github.com/cybersoftware"
            className="text-[13px] text-[#B8B8B8] hover:text-cyan"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/company/cybersoftware"
            className="text-[13px] text-[#B8B8B8] hover:text-cyan"
          >
            LinkedIn
          </a>
        </div>

        <div className="text-[13px] text-[#5A5A5A]">© 2026 Cyber Software</div>
      </RevealOnScroll>
    </footer>
  );
}
