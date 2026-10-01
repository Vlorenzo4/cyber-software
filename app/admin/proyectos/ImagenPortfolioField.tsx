"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import { subirImagenPortfolio } from "./actions";

const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8C8C8C]";

export default function ImagenPortfolioField({
  defaultValue,
  required = false,
}: {
  defaultValue?: string | null;
  required?: boolean;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [preview, setPreview] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // El input que guarda la URL es type="hidden", y los inputs ocultos quedan
  // excluidos de la validación nativa del navegador (willValidate = false),
  // así que el atributo `required` no alcanza acá: hay que interceptar el
  // submit del form a mano para bloquearlo si falta la imagen.
  useEffect(() => {
    const form = containerRef.current?.closest("form");
    if (!form) return;

    function handleSubmit(e: SubmitEvent) {
      if (required && !url) {
        e.preventDefault();
        setError(
          "La imagen es obligatoria cuando el proyecto se muestra en la landing."
        );
      }
    }

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, [required, url]);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.set("file", file);
      const result = await subirImagenPortfolio(formData);

      if ("error" in result) {
        setError(result.error);
        setPreview(url);
      } else {
        setUrl(result.url);
        setPreview(result.url);
      }
    } catch {
      setError("No se pudo subir la imagen. Probá de nuevo.");
      setPreview(url);
    } finally {
      setUploading(false);
      URL.revokeObjectURL(objectUrl);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className="sm:col-span-2" ref={containerRef}>
      <label className={labelClass} htmlFor="imagenPortfolioFile">
        Imagen
        {required && <span className="ml-1 text-cyan">*</span>}
      </label>

      <input type="hidden" name="imagenPortfolioUrl" value={url} />

      {preview && (
        <div className="relative mb-3 aspect-[16/10] w-full max-w-[320px] overflow-hidden border border-white/10">
          <Image src={preview} alt="Vista previa" fill className="object-cover" unoptimized />
        </div>
      )}

      <input
        ref={fileInputRef}
        id="imagenPortfolioFile"
        type="file"
        accept="image/jpeg,image/png"
        disabled={uploading}
        onChange={handleFileChange}
        className="block w-full text-sm text-[#B8B8B8] file:mr-4 file:border file:border-white/[0.12] file:bg-[#0A0A0A] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.08em] file:text-cyan hover:file:border-cyan/60 disabled:opacity-50"
      />

      {uploading && (
        <p className="mt-1.5 text-xs text-cyan">Subiendo imagen...</p>
      )}
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
