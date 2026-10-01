"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No autorizado");
  }
}

export async function actualizarConfiguracion(formData: FormData) {
  await requireUser();

  const razonSocial = (formData.get("razonSocial") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const whatsapp = (formData.get("whatsapp") as string)?.trim();

  if (!razonSocial || !email || !whatsapp) {
    throw new Error("Razón social, email y WhatsApp son obligatorios");
  }

  const existente = await prisma.configuracionAgencia.findFirst();

  if (existente) {
    await prisma.configuracionAgencia.update({
      where: { id: existente.id },
      data: { razonSocial, email, whatsapp },
    });
  } else {
    await prisma.configuracionAgencia.create({
      data: { razonSocial, email, whatsapp },
    });
  }

  // La landing pública lee estos datos, así que hay que revalidarla además
  // de esta misma pantalla.
  revalidatePath("/admin/configuracion");
  revalidatePath("/");
  redirect("/admin/configuracion");
}

export async function invitarUsuario(
  formData: FormData
): Promise<{ success: true } | { error: string }> {
  await requireUser();

  const email = (formData.get("email") as string)?.trim();
  if (!email) {
    return { error: "Ingresá un email." };
  }

  const supabaseAdmin = createAdminClient();
  const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/login`,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/configuracion");
  return { success: true };
}
