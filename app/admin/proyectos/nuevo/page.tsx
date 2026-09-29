import Link from "next/link";
import ProyectoForm from "../ProyectoForm";
import { crearProyecto } from "../actions";

export default function NuevoProyectoPage() {
  return (
    <div className="mx-auto max-w-[800px] px-6 py-12">
      <Link
        href="/admin/proyectos"
        className="mb-8 inline-block text-xs font-semibold uppercase tracking-[0.08em] text-[#B8B8B8] transition-colors hover:text-cyan"
      >
        ← Volver a proyectos
      </Link>

      <h1 className="mb-8 font-display text-2xl font-bold uppercase tracking-[-0.01em] text-foreground">
        Nuevo proyecto
      </h1>

      <ProyectoForm action={crearProyecto} submitLabel="Crear proyecto" />
    </div>
  );
}
