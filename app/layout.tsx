import type { Metadata } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cyber Software — Software a medida para negocios reales",
  description:
    "Desarrollamos software a medida entendiendo primero cómo trabaja tu negocio: sistemas de gestión, automatización con IA, tiendas online e integraciones.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${chakraPetch.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="relative flex flex-1 flex-col overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
