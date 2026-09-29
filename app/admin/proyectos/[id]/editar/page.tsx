import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProyectoForm from "../../ProyectoForm";
import { actualizarProyecto } from "../../actions";

export default async function EditarProyectoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const proyecto = await prisma.proyecto.findUnique({ where: { id } });

  if (!proyecto) {
    notFound();
  }

  const action = actualizarProyecto.bind(null, id);

  return (
    <div className="mx-auto max-w-[800px] px-6 py-12">
      <Link
        href={`/admin/proyectos/${id}`}
        className="mb-8 inline-block text-xs font-semibold uppercase tracking-[0.08em] text-[#B8B8B8] transition-colors hover:text-cyan"
      >
        ← Volver al proyecto
      </Link>

      <h1 className="mb-8 font-display text-2xl font-bold uppercase tracking-[-0.01em] text-foreground">
        Editar proyecto
      </h1>

      <ProyectoForm action={action} proyecto={proyecto} submitLabel="Guardar cambios" />
    </div>
  );
}
