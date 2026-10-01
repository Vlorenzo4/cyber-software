// Función pura, sin dependencias de servidor — se puede importar tanto desde
// Server Components como desde Client Components sin arrastrar Prisma al
// bundle del cliente.
export function whatsappLink(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}
