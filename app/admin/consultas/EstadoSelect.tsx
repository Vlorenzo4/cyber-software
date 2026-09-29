"use client";

import { useTransition } from "react";
import type { EstadoConsulta } from "@prisma/client";
import { ESTADO_OPCIONES } from "@/lib/consultas";
import { actualizarEstadoConsulta } from "./actions";

type EstadoSelectProps = {
  id: string;
  estado: EstadoConsulta;
};

export default function EstadoSelect({ id, estado }: EstadoSelectProps) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const nuevoEstado = e.target.value as EstadoConsulta;
    startTransition(() => {
      actualizarEstadoConsulta(id, nuevoEstado);
    });
  }

  return (
    <select
      value={estado}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
      disabled={isPending}
      className="border border-white/[0.15] bg-[#0A0A0A] px-3 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-foreground focus:border-cyan/60 focus:outline-none disabled:opacity-50"
    >
      {ESTADO_OPCIONES.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
