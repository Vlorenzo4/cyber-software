"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { TipoProyecto, EstadoProyecto } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }
}

function optionalField(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function crearProyecto(formData: FormData) {
  await requireUser();

  const clienteNombre = optionalField(formData, "clienteNombre");
  const nombreProyecto = optionalField(formData, "nombreProyecto");
  const tipo = formData.get("tipo") as TipoProyecto | null;

  if (!clienteNombre || !nombreProyecto || !tipo) {
    throw new Error("Cliente, proyecto y tipo son obligatorios");
  }

  const proyecto = await prisma.proyecto.create({
    data: {
      clienteNombre,
      nombreProyecto,
      tipo,
      estado: (formData.get("estado") as EstadoProyecto | null) || undefined,
      stack: optionalField(formData, "stack"),
      urlProduccion: optionalField(formData, "urlProduccion"),
      adminStatsUrl: optionalField(formData, "adminStatsUrl"),
      notas: optionalField(formData, "notas"),
    },
  });

  revalidatePath("/admin/proyectos");
  redirect(`/admin/proyectos/${proyecto.id}`);
}

export async function actualizarProyecto(id: string, formData: FormData) {
  await requireUser();

  const clienteNombre = optionalField(formData, "clienteNombre");
  const nombreProyecto = optionalField(formData, "nombreProyecto");
  const tipo = formData.get("tipo") as TipoProyecto | null;
  const estado = formData.get("estado") as EstadoProyecto | null;

  if (!clienteNombre || !nombreProyecto || !tipo || !estado) {
    throw new Error("Cliente, proyecto, tipo y estado son obligatorios");
  }

  await prisma.proyecto.update({
    where: { id },
    data: {
      clienteNombre,
      nombreProyecto,
      tipo,
      estado,
      stack: optionalField(formData, "stack"),
      urlProduccion: optionalField(formData, "urlProduccion"),
      adminStatsUrl: optionalField(formData, "adminStatsUrl"),
      notas: optionalField(formData, "notas"),
    },
  });

  revalidatePath("/admin/proyectos");
  revalidatePath(`/admin/proyectos/${id}`);
  redirect(`/admin/proyectos/${id}`);
}
