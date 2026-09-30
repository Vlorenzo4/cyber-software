"use server";

import { revalidatePath } from "next/cache";
import { EstadoTicket, PrioridadTicket } from "@prisma/client";
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

export async function actualizarTicket(
  id: string,
  data: { estado?: EstadoTicket; prioridad?: PrioridadTicket }
) {
  await requireUser();

  await prisma.ticket.update({
    where: { id },
    data,
  });

  revalidatePath("/admin/tickets");
  revalidatePath(`/admin/tickets/${id}`);
}
