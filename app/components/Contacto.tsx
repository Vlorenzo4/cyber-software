"use client";

import { useState, type FormEvent } from "react";
import RevealOnScroll from "./RevealOnScroll";
import ClipOutlineButton from "./ClipOutlineButton";
import { contactoSchema, NECESIDAD_OPCIONES } from "@/lib/validations/contacto";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";

type FormState = {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  necesidad: string;
  mensaje: string;
};

const INITIAL_STATE: FormState = {
  nombre: "",
  email: "",
  telefono: "",
  empresa: "",
  necesidad: "",
  mensaje: "",
};

const inputClass =
  "bg-[#131313] border border-white/[0.12] text-foreground px-[14px] py-[14px] text-sm placeholder:text-[#5A5A5A] focus:outline-none focus:border-cyan/60 transition-colors";
const labelClass =
  "text-[11px] font-semibold uppercase tracking-[0.1em] text-background/70 mb-1.5 block";

export default function Contacto() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  function updateField<K extends keyof FormState>(field: K) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setForm((s) => ({ ...s, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = contactoSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("sent");
      setForm(INITIAL_STATE);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="mx-auto max-w-[1200px] px-[6vw] py-[100px]">
      <RevealOnScroll>
        <h2 className="mb-14 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-bold uppercase tracking-[-0.01em] text-background">
          CONTACTO
        </h2>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(260px,1fr)_minmax(300px,1.3fr)]">
          <div>
            <p className="mb-8 text-[15px] leading-[1.6] text-background/70">
              La primera charla no se cobra y no compromete a nada. Contanos
              qué hace tu negocio y vemos si podemos ayudarte.
            </p>
            <div className="flex flex-col gap-3.5">
              <a
                href="https://wa.me/5491155550100"
                className="bg-background px-6 py-3.5 text-center text-sm font-bold tracking-[0.05em] text-yellow hover:brightness-125 transition-[filter]"
                style={{ clipPath: CUT_CORNERS_CLIP }}
              >
                WHATSAPP: +54 9 11 5555-0100
              </a>
              <ClipOutlineButton
                href="mailto:hola@cybersoftware.dev"
                borderColorClass="bg-cyan"
                fillClass="bg-yellow"
                textColorClass="text-background"
                hoverClass="hover:bg-background/10"
                className="px-6 py-3.5 text-center text-sm font-bold tracking-[0.05em]"
              >
                EMAIL: HOLA@CYBERSOFTWARE.DEV
              </ClipOutlineButton>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {status === "sent" && (
              <div className="border border-background px-4 py-4 text-sm text-background">
                Gracias, recibimos tu mensaje. Te contactamos a la brevedad.
              </div>
            )}
            {status === "error" && (
              <div className="border border-red-800 px-4 py-4 text-sm text-red-800">
                Hubo un problema al enviar tu consulta. Probá de nuevo en unos
                minutos.
              </div>
            )}

            <div>
              <label className={labelClass} htmlFor="nombre">
                TU NOMBRE
              </label>
              <input
                id="nombre"
                type="text"
                placeholder="Nombre y apellido"
                value={form.nombre}
                onChange={updateField("nombre")}
                className={`${inputClass} w-full`}
              />
              {errors.nombre && (
                <p className="mt-1 text-xs text-red-800">{errors.nombre}</p>
              )}
            </div>

            <div>
              <label className={labelClass} htmlFor="email">
                TU EMAIL
              </label>
              <input
                id="email"
                type="email"
                placeholder="nombre@correo.com"
                value={form.email}
                onChange={updateField("email")}
                className={`${inputClass} w-full`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-800">{errors.email}</p>
              )}
            </div>

            <div>
              <label className={labelClass} htmlFor="telefono">
                TU TELÉFONO
              </label>
              <input
                id="telefono"
                type="tel"
                placeholder="+54 9 351 123 4567"
                value={form.telefono}
                onChange={updateField("telefono")}
                className={`${inputClass} w-full`}
              />
              {errors.telefono && (
                <p className="mt-1 text-xs text-red-800">{errors.telefono}</p>
              )}
            </div>

            <div>
              <label className={labelClass} htmlFor="empresa">
                TU EMPRESA
              </label>
              <input
                id="empresa"
                type="text"
                placeholder="Nombre del comercio o empresa"
                value={form.empresa}
                onChange={updateField("empresa")}
                className={`${inputClass} w-full`}
              />
              {errors.empresa && (
                <p className="mt-1 text-xs text-red-800">{errors.empresa}</p>
              )}
            </div>

            <div>
              <label className={labelClass} htmlFor="necesidad">
                QUÉ NECESITÁS
              </label>
              <select
                id="necesidad"
                value={form.necesidad}
                onChange={updateField("necesidad")}
                className={`${inputClass} w-full`}
              >
                <option value="">¿Qué necesitás?</option>
                {NECESIDAD_OPCIONES.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.label}
                  </option>
                ))}
              </select>
              {errors.necesidad && (
                <p className="mt-1 text-xs text-red-800">{errors.necesidad}</p>
              )}
            </div>

            <div>
              <label className={labelClass} htmlFor="mensaje">
                CONTANOS DE TU OPERACIÓN
              </label>
              <textarea
                id="mensaje"
                placeholder="Qué hace tu empresa, cómo trabajan hoy y qué te está costando más"
                value={form.mensaje}
                onChange={updateField("mensaje")}
                rows={5}
                className={`${inputClass} w-full resize-none`}
              />
              {errors.mensaje && (
                <p className="mt-1 text-xs text-red-800">{errors.mensaje}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-background px-4 py-4 text-sm font-bold tracking-[0.06em] text-yellow hover:brightness-125 transition-[filter] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ clipPath: CUT_CORNERS_CLIP }}
            >
              {status === "sending" ? "ENVIANDO..." : "ENVIAR"}
            </button>
          </form>
        </div>
      </RevealOnScroll>
    </section>
  );
}
