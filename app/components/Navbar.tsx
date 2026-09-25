"use client";

import { useEffect, useState } from "react";
import { CUT_CORNERS_CLIP } from "@/lib/clipPath";

const LINKS = [
  { href: "#servicios", label: "SERVICIOS" },
  { href: "#proyectos", label: "PROYECTOS" },
  { href: "#proceso", label: "PROCESO" },
  { href: "#nosotros", label: "NOSOTROS" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-5 z-50 transition-[filter] duration-300 ${
        scrolled ? "drop-shadow-[0_12px_28px_rgba(0,0,0,0.5)]" : ""
      }`}
    >
      <div
        className="flex items-center justify-between gap-6 px-[5vw]"
        style={{ height: "122px" }}
      >
        <a
          href="#"
          className="flex min-w-0 shrink items-center gap-3"
          style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.85))" }}
        >
          <svg
            width="34"
            height="38"
            viewBox="0 0 34 38"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M17 1L32.5 9.5V28.5L17 37L1.5 28.5V9.5L17 1Z"
              stroke="#F4E400"
              strokeWidth="2"
            />
            <path d="M17 10L24.5 14.5V23.5L17 28L9.5 23.5V14.5L17 10Z" fill="#F4E400" />
          </svg>
          <span
            className="font-display font-bold uppercase leading-none tracking-[-0.01em]"
            style={{
              fontSize: "clamp(18px, 4.6vw, 34px)",
              textShadow: "0 1px 4px rgba(0,0,0,0.85)",
            }}
          >
            <span className="text-yellow">CYBER</span>
            <span className="text-[#ECECEC]">SOFTWARE</span>
          </span>
        </a>

        <div
          className="hidden bg-white/10 p-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.45)] md:block"
          style={{ clipPath: CUT_CORNERS_CLIP }}
        >
          <div
            className="flex items-center gap-9 bg-[#0A0A0A]/80 px-10 py-5 backdrop-blur-md"
            style={{ clipPath: CUT_CORNERS_CLIP }}
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#B8B8B8] transition-colors hover:text-cyan"
              >
                {link.label}
              </a>
            ))}

            <span className="h-5 w-px bg-white/15" aria-hidden="true" />

            <a
              href="#contacto"
              className="text-[13px] font-bold uppercase tracking-[0.12em] text-yellow transition-colors hover:text-[#fff6a3]"
            >
              CONTACTO
            </a>
          </div>
        </div>

        <a
          href="#contacto"
          className="flex shrink-0 items-center border-2 border-background bg-yellow px-7 py-4 text-[13px] font-bold tracking-[0.1em] text-background transition-[filter] hover:brightness-95 md:hidden"
        >
          CONTACTO
        </a>
      </div>
    </nav>
  );
}
