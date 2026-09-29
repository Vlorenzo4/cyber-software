"use server";

import { revalidatePath } from "next/cache";
import { EstadoConsulta } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function actualizarEstadoConsulta(
  id: string,
  estado: EstadoConsulta
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }

  await prisma.consulta.update({
    where: { id },
    data: { estado },
  });

  revalidatePath("/admin/consultas");
  revalidatePath(`/admin/consultas/${id}`);
}
