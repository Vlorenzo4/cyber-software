import Link from "next/link";
import { EstadoCobro } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";
import { ESTADO_COBRO_OPCIONES } from "@/lib/cobros";
import CobroInlineEditor from "./CobroInlineEditor";

const FILTROS = [
  { value: "TODOS", label: "Todos" },
  ...ESTADO_COBRO_OPCIONES.map((o) => ({ value: o.value as string, label: o.label })),
];

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default async function CobrosPage({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  const { estado } = await searchParams;
  const filtroActivo =
    estado && estado in EstadoCobro ? (estado as EstadoCobro) : "TODOS";

  const cobros = await prisma.cobro.findMany({
    where: filtroActivo !== "TODOS" ? { estado: filtroActivo } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      proyecto: {
        select: { nombreProyecto: true, clienteNombre: true },
      },
    },
  });

  const totales = cobros.reduce(
    (acc, c) => {
      const total = Number(c.montoTotal);
      const cobrado = Number(c.montoCobrado);
      acc.total += total;
      acc.cobrado += cobrado;
      acc.pendiente += total - cobrado;
      return acc;
    },
    { total: 0, cobrado: 0, pendiente: 0 }
  );

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-bold uppercase tracking-[-0.01em] text-foreground">
          Cobros
        </h1>
        <Link
          href="/admin/cobros/nuevo"
          className="bg-yellow px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-background transition-[filter] hover:brightness-95"
          style={{ clipPath: CUT_CORNERS_CLIP }}
        >
          + Nuevo cobro
        </Link>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="border border-white/10 bg-[#131313] p-5">
          <div className="mb-1 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
            Total
          </div>
          <div className="font-display text-lg font-bold text-foreground">
            {currencyFormatter.format(totales.total)}
          </div>
        </div>
        <div className="border border-white/10 bg-[#131313] p-5">
          <div className="mb-1 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
            Cobrado
          </div>
          <div className="font-display text-lg font-bold text-cyan">
            {currencyFormatter.format(totales.cobrado)}
          </div>
        </div>
        <div className="border border-white/10 bg-[#131313] p-5">
          <div className="mb-1 text-[11px] uppercase tracking-[0.1em] text-[#5A5A5A]">
            Pendiente
          </div>
          <div className="font-display text-lg font-bold text-yellow">
            {currencyFormatter.format(totales.pendiente)}
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {FILTROS.map((f) => (
          <Link
            key={f.value}
            href={f.value === "TODOS" ? "/admin/cobros" : `/admin/cobros?estado=${f.value}`}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
              filtroActivo === f.value
                ? "bg-yellow text-background"
                : "border border-white/15 text-[#B8B8B8] hover:border-cyan hover:text-cyan"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      {cobros.length === 0 ? (
        <p className="text-sm text-[#9A9A9A]">No hay cobros en este filtro.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {cobros.map((c) => {
            const total = Number(c.montoTotal);
            const cobrado = Number(c.montoCobrado);
            const saldo = total - cobrado;

            return (
              <div key={c.id} className="border border-white/10 bg-[#131313] p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 text-xs uppercase tracking-[0.08em] text-[#5A5A5A]">
                      {c.proyecto.clienteNombre}
                    </div>
                    <div className="font-display text-sm font-semibold uppercase text-foreground">
                      {c.proyecto.nombreProyecto}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.08em] text-[#5A5A5A]">
                        Total
                      </div>
                      <div className="text-foreground">
                        {currencyFormatter.format(total)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.08em] text-[#5A5A5A]">
                        Cobrado
                      </div>
                      <div className="text-cyan">
                        {currencyFormatter.format(cobrado)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.08em] text-[#5A5A5A]">
                        Saldo
                      </div>
                      <div className={saldo > 0 ? "text-yellow" : "text-[#9A9A9A]"}>
                        {currencyFormatter.format(saldo)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.08em] text-[#5A5A5A]">
                        Fecha
                      </div>
                      <div className="text-[#9A9A9A]">
                        {dateFormatter.format(c.createdAt)}
                      </div>
                    </div>
                  </div>

                  <CobroInlineEditor
                    id={c.id}
                    montoCobrado={cobrado}
                    estado={c.estado}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
