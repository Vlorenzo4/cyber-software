"use client";

import { useState, type ChangeEvent } from "react";
import type { Proyecto } from "@prisma/client";
import ImagenPortfolioField from "./ImagenPortfolioField";

const inputClass =
  "w-full border border-white/[0.12] bg-[#0A0A0A] px-[14px] py-[12px] text-sm text-foreground placeholder:text-[#5A5A5A] focus:border-cyan/60 focus:outline-none";
const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8C8C8C]";

function RequiredMark({ show }: { show: boolean }) {
  if (!show) return null;
  return <span className="ml-1 text-cyan">*</span>;
}

export default function PortfolioSection({ proyecto }: { proyecto?: Proyecto }) {
  const [mostrarEnLanding, setMostrarEnLanding] = useState(
    proyecto?.mostrarEnLanding ?? false
  );

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>) {
    setMostrarEnLanding(e.target.checked);
  }

  return (
    <div className="border-t border-white/10 pt-6">
      <h2 className="mb-1 font-display text-sm font-bold uppercase tracking-[0.08em] text-cyan">
        Datos de portfolio (landing pública)
      </h2>
      <p className="mb-5 text-xs text-[#5A5A5A]">
        Estos campos son los que se muestran afuera, en la sección
        &ldquo;Proyectos&rdquo; de la landing.
        {mostrarEnLanding && (
          <>
            {" "}
            Los campos marcados con <span className="text-cyan">*</span> son
            obligatorios porque este proyecto se va a mostrar en la landing.
          </>
        )}
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input
              id="mostrarEnLanding"
              name="mostrarEnLanding"
              type="checkbox"
              checked={mostrarEnLanding}
              onChange={handleCheckboxChange}
              className="h-4 w-4 accent-cyan"
            />
            Mostrar este proyecto en la landing
          </label>
        </div>

        <ImagenPortfolioField
          defaultValue={proyecto?.imagenPortfolioUrl}
          required={mostrarEnLanding}
        />

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="linkPublico">
            Link público (botón &ldquo;Usar app&rdquo;)
          </label>
          <input
            id="linkPublico"
            name="linkPublico"
            type="url"
            defaultValue={proyecto?.linkPublico ?? ""}
            className={inputClass}
            placeholder="https://..."
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="tagsPortfolio">
            Tags (separados por coma)
            <RequiredMark show={mostrarEnLanding} />
          </label>
          <input
            id="tagsPortfolio"
            name="tagsPortfolio"
            required={mostrarEnLanding}
            defaultValue={proyecto?.tagsPortfolio?.join(", ") ?? ""}
            className={inputClass}
            placeholder="PRODUCTO PROPIO, SISTEMA COMPLETO"
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="descripcionPortfolio">
            Descripción pública
            <RequiredMark show={mostrarEnLanding} />
          </label>
          <textarea
            id="descripcionPortfolio"
            name="descripcionPortfolio"
            required={mostrarEnLanding}
            rows={3}
            defaultValue={proyecto?.descripcionPortfolio ?? ""}
            className={`${inputClass} resize-none`}
            placeholder="Descripción que ve el visitante de la landing"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="resenaTexto">
            Reseña (texto)
          </label>
          <textarea
            id="resenaTexto"
            name="resenaTexto"
            rows={3}
            defaultValue={proyecto?.resenaTexto ?? ""}
            className={`${inputClass} resize-none`}
            placeholder="Lo que dijo el cliente sobre el proyecto"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="resenaAutor">
            Reseña (autor)
          </label>
          <input
            id="resenaAutor"
            name="resenaAutor"
            defaultValue={proyecto?.resenaAutor ?? ""}
            className={inputClass}
            placeholder='Ej: "Dueño de restaurante" — nunca nombre real'
          />
        </div>
      </div>
    </div>
  );
}
