"use client";

import { useState, useTransition, type ChangeEvent, type FocusEvent } from "react";
import type { EstadoCobro } from "@prisma/client";
import { ESTADO_COBRO_OPCIONES } from "@/lib/cobros";
import { actualizarCobro } from "./actions";

type CobroInlineEditorProps = {
  id: string;
  montoCobrado: number;
  estado: EstadoCobro;
};

export default function CobroInlineEditor({
  id,
  montoCobrado,
  estado,
}: CobroInlineEditorProps) {
  const [monto, setMonto] = useState(String(montoCobrado));
  const [isPending, startTransition] = useTransition();

  function handleMontoBlur(e: FocusEvent<HTMLInputElement>) {
    const nuevoMonto = Number(e.target.value);
    if (Number.isNaN(nuevoMonto) || nuevoMonto === montoCobrado) return;
    startTransition(() => {
      actualizarCobro(id, { montoCobrado: nuevoMonto });
    });
  }

  function handleEstadoChange(e: ChangeEvent<HTMLSelectElement>) {
    const nuevoEstado = e.target.value as EstadoCobro;
    startTransition(() => {
      actualizarCobro(id, { estado: nuevoEstado });
    });
  }

  return (
    <div className="flex items-center gap-2">
      <div>
        <div className="mb-1 text-[10px] uppercase tracking-[0.08em] text-[#5A5A5A]">
          Cobrado
        </div>
        <input
          type="number"
          step="0.01"
          min="0"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          onBlur={handleMontoBlur}
          disabled={isPending}
          className="w-28 border border-white/[0.15] bg-[#0A0A0A] px-2 py-1.5 text-xs text-foreground focus:border-cyan/60 focus:outline-none disabled:opacity-50"
        />
      </div>
      <div>
        <div className="mb-1 text-[10px] uppercase tracking-[0.08em] text-[#5A5A5A]">
          Estado
        </div>
        <select
          value={estado}
          onChange={handleEstadoChange}
          disabled={isPending}
          className="border border-white/[0.15] bg-[#0A0A0A] px-2 py-[7px] text-xs font-semibold uppercase tracking-[0.05em] text-foreground focus:border-cyan/60 focus:outline-none disabled:opacity-50"
        >
          {ESTADO_COBRO_OPCIONES.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
