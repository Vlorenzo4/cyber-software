import { prisma } from "@/lib/prisma";

// Fallback defensivo: solo se usa si por algún motivo la tabla
// ConfiguracionAgencia no tiene ninguna fila (no debería pasar en uso
// normal, ya que es un singleton creado una vez).
const FALLBACK_CONFIG = {
  razonSocial: "Cyber Software",
  email: "valenvfx04@gmail.com",
  whatsapp: "+54 11 5771 0063",
};

export async function getConfiguracionAgencia() {
  const config = await prisma.configuracionAgencia.findFirst();
  return config ?? FALLBACK_CONFIG;
}
