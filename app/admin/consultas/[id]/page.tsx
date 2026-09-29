import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";
import { NECESIDAD_OPCIONES } from "@/lib/validations/contacto";
import EstadoSelect from "../EstadoSelect";

function necesidadLabel(valor: string) {
  return NECESIDAD_OPCIONES.find((o) => o.value === valor)?.label ?? valor;
}

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function ConsultaDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const consulta = await prisma.consulta.findUnique({ where: { id } });

  if (!consulta) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[800px] px-6 py-12">
      <Link
        href="/admin/consultas"
        className="mb-8 inline-block text-xs font-semibold uppercase tracking-[0.08em] text-[#B8B8B8] transition-colors hover:text-cyan"
      >
        ← Volver a consultas
      </Link>

      <div className="bg-cyan p-[2px]" style={{ clipPath: CUT_CORNERS_CLIP }}>
        <div
          className="flex flex-col gap-6 bg-[#131313] p-8"
          style={{ clipPath: CUT_CORNERS_CLIP }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-xl font-bold uppercase text-foreground">
                {consulta.nombre}
              </h1>
              <p className="mt-1 text-xs text-[#5A5A5A]">
                {dateFormatter.format(consulta.createdAt)}
              </p>
            </div>
            <EstadoSelect id={consulta.id} estado={consulta.estado} />
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
                Email
              </div>
              <div className="text-sm text-foreground">{consulta.email}</div>
            </div>
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
                Teléfono
              </div>
              <div className="text-sm text-foreground">
                {consulta.telefono || "Sin teléfono"}
              </div>
            </div>
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
                Empresa
              </div>
              <div className="text-sm text-foreground">
                {consulta.empresa || "Sin empresa"}
              </div>
            </div>
            <div>
              <div className="mb-1 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
                Necesita
              </div>
              <div className="text-sm text-cyan">
                {necesidadLabel(consulta.necesidad)}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="mb-2 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
              Mensaje
            </div>
            <p className="whitespace-pre-wrap text-sm leading-[1.6] text-[#9A9A9A]">
              {consulta.mensaje}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
