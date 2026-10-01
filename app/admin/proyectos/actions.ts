"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import sharp from "sharp";
import { TipoProyecto, EstadoProyecto } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { portfolioSchema } from "@/lib/validations/proyecto";

const PORTFOLIO_BUCKET = "portfolio";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];
const MAX_IMAGE_WIDTH = 1600;
const IMAGE_QUALITY = 80;

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

function tagsField(formData: FormData, key: string): string[] {
  const value = formData.get(key);
  if (typeof value !== "string" || !value.trim()) return [];
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function portfolioFields(formData: FormData) {
  const fields = {
    mostrarEnLanding: formData.get("mostrarEnLanding") === "on",
    imagenPortfolioUrl: optionalField(formData, "imagenPortfolioUrl"),
    linkPublico: optionalField(formData, "linkPublico"),
    tagsPortfolio: tagsField(formData, "tagsPortfolio"),
    descripcionPortfolio: optionalField(formData, "descripcionPortfolio"),
    resenaTexto: optionalField(formData, "resenaTexto"),
    resenaAutor: optionalField(formData, "resenaAutor"),
  };

  const result = portfolioSchema.safeParse(fields);
  if (!result.success) {
    throw new Error(result.error.issues.map((issue) => issue.message).join(" "));
  }

  return result.data;
}

export async function subirImagenPortfolio(
  formData: FormData
): Promise<{ url: string } | { error: string }> {
  await requireUser();

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "No se recibió ningún archivo." };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { error: "La imagen tiene que ser JPG o PNG." };
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return { error: "La imagen no puede superar los 5MB." };
  }

  const originalBuffer = Buffer.from(await file.arrayBuffer());

  let processedBuffer: Buffer;
  let contentType: string;
  let extension: string;

  try {
    const image = sharp(originalBuffer);
    const metadata = await image.metadata();
    const resized = image.resize({
      width: MAX_IMAGE_WIDTH,
      withoutEnlargement: true,
    });

    // PNG con transparencia relevante se mantiene en PNG (perder el alpha
    // la arruinaría); todo lo demás se convierte a JPEG para un peso más
    // chico y consistente.
    if (metadata.hasAlpha) {
      processedBuffer = await resized
        .png({ quality: IMAGE_QUALITY, compressionLevel: 9 })
        .toBuffer();
      contentType = "image/png";
      extension = "png";
    } else {
      processedBuffer = await resized.jpeg({ quality: IMAGE_QUALITY }).toBuffer();
      contentType = "image/jpeg";
      extension = "jpg";
    }
  } catch {
    return { error: "No se pudo procesar la imagen. Probá con otro archivo." };
  }

  const path = `${crypto.randomUUID()}.${extension}`;

  const supabaseAdmin = createAdminClient();
  const { error: uploadError } = await supabaseAdmin.storage
    .from(PORTFOLIO_BUCKET)
    .upload(path, processedBuffer, { contentType, upsert: false });

  if (uploadError) {
    return { error: `No se pudo subir la imagen: ${uploadError.message}` };
  }

  const { data } = supabaseAdmin.storage.from(PORTFOLIO_BUCKET).getPublicUrl(path);

  return { url: data.publicUrl };
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
      ...portfolioFields(formData),
    },
  });

  revalidatePath("/admin/proyectos");
  revalidatePath("/");
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
      ...portfolioFields(formData),
    },
  });

  revalidatePath("/admin/proyectos");
  revalidatePath(`/admin/proyectos/${id}`);
  revalidatePath("/");
  redirect(`/admin/proyectos/${id}`);
}
