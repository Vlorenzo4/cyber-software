"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { EstadoCobro } from "@prisma/client";
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

export async function crearCobro(formData: FormData) {
  await requireUser();

  const proyectoId = optionalField(formData, "proyectoId");
  const montoTotalRaw = optionalField(formData, "montoTotal");
  const estado = formData.get("estado") as EstadoCobro | null;

  if (!proyectoId || !montoTotalRaw || !estado) {
    throw new Error("Proyecto, monto total y estado son obligatorios");
  }

  const montoTotal = Number(montoTotalRaw);
  const montoCobrado = Number(optionalField(formData, "montoCobrado") ?? "0");

  if (Number.isNaN(montoTotal) || Number.isNaN(montoCobrado)) {
    throw new Error("Los montos deben ser numéricos");
  }

  await prisma.cobro.create({
    data: {
      proyectoId,
      montoTotal,
      montoCobrado,
      estado,
      notas: optionalField(formData, "notas"),
    },
  });

  revalidatePath("/admin/cobros");
  revalidatePath(`/admin/proyectos/${proyectoId}`);
  redirect("/admin/cobros");
}

export async function actualizarCobro(
  id: string,
  data: { montoCobrado?: number; estado?: EstadoCobro }
) {
  await requireUser();

  if (data.montoCobrado !== undefined && Number.isNaN(data.montoCobrado)) {
    throw new Error("El monto cobrado debe ser numérico");
  }

  const cobro = await prisma.cobro.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/cobros");
  revalidatePath(`/admin/proyectos/${cobro.proyectoId}`);
}
