import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problemas from "./components/Problemas";
import Servicios from "./components/Servicios";
import Proyectos from "./components/Proyectos";
import Proceso from "./components/Proceso";
import Nosotros from "./components/Nosotros";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

function GradientStrip({ from, to }: { from: string; to: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        height: "300px",
        background: `linear-gradient(to bottom, ${from} 0%, ${to} 100%)`,
      }}
    />
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="bg-yellow">
          <Hero />
        </div>

        {/* Franjas de transición con altura fija en px, en el flujo normal
            del documento (no dependen del alto de ninguna sección vecina). */}
        <GradientStrip from="#F4E400" to="#0A0A0A" />

        <div className="bg-background">
          <Problemas />
          <Servicios />
          <Proyectos />
        </div>

        <GradientStrip from="#0A0A0A" to="#F4E400" />

        <div className="bg-yellow">
          <Proceso />
          <Nosotros />
          <Contacto />
        </div>
      </main>
      <Footer />
    </>
  );
}
