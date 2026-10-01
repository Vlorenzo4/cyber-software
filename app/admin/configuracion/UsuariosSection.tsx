"use client";

import { useState, useTransition, type FormEvent } from "react";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";
import { invitarUsuario } from "./actions";

type Usuario = {
  id: string;
  email: string;
  createdAt: string;
};

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default function UsuariosSection({ usuarios }: { usuarios: Usuario[] }) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [mensaje, setMensaje] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);

    startTransition(async () => {
      const result = await invitarUsuario(formData);
      if ("error" in result) {
        setStatus("error");
        setMensaje(result.error);
      } else {
        setStatus("success");
        setMensaje(`Invitación enviada a ${email}.`);
        setEmail("");
        setMostrarForm(false);
      }
    });
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-cyan">
          Usuarios con acceso
        </h2>
        <button
          type="button"
          onClick={() => {
            setMostrarForm((v) => !v);
            setStatus("idle");
          }}
          className="border border-cyan px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-cyan transition-colors hover:bg-cyan hover:text-background"
        >
          {mostrarForm ? "Cancelar" : "+ Invitar usuario"}
        </button>
      </div>

      {mostrarForm && (
        <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nombre@correo.com"
            className="min-w-[240px] flex-1 border border-white/[0.12] bg-[#0A0A0A] px-[14px] py-[12px] text-sm text-foreground placeholder:text-[#5A5A5A] focus:border-cyan/60 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isPending}
            className="bg-yellow px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] text-background transition-[filter] hover:brightness-95 disabled:opacity-50"
            style={{ clipPath: CUT_CORNERS_CLIP }}
          >
            {isPending ? "Enviando..." : "Enviar invitación"}
          </button>
        </form>
      )}

      {status === "success" && (
        <p className="mb-4 text-sm text-cyan">{mensaje}</p>
      )}
      {status === "error" && (
        <p className="mb-4 text-sm text-red-500">{mensaje}</p>
      )}

      <div className="flex flex-col divide-y divide-white/10 border border-white/10">
        {usuarios.length === 0 ? (
          <p className="p-5 text-sm text-[#9A9A9A]">No hay usuarios cargados.</p>
        ) : (
          usuarios.map((u) => (
            <div
              key={u.id}
              className="flex flex-wrap items-center justify-between gap-2 px-5 py-4"
            >
              <span className="text-sm text-foreground">{u.email}</span>
              <span className="text-xs uppercase tracking-[0.06em] text-[#5A5A5A]">
                Desde {dateFormatter.format(new Date(u.createdAt))}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
