"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV_LINKS = [
  { href: "/admin", label: "Centro de control" },
  { href: "/admin/proyectos", label: "Proyectos" },
  { href: "/admin/cobros", label: "Cobros" },
  { href: "/admin/tickets", label: "Tickets" },
  { href: "/admin/consultas", label: "Consultas" },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header
      className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-[#131313] px-6 py-6"
      style={{ minHeight: "84px" }}
    >
      <div className="flex flex-wrap items-center gap-10">
        <span className="font-display text-lg font-bold uppercase tracking-[0.05em]">
          <span className="text-yellow">CYBER</span>
          <span className="text-[#ECECEC]">SOFTWARE</span>
          <span className="ml-2 text-[#5A5A5A]">· ADMIN</span>
        </span>

        <nav className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] font-semibold uppercase tracking-[0.06em] transition-colors ${
                  active ? "text-cyan" : "text-[#B8B8B8] hover:text-cyan"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="border border-white/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#B8B8B8] transition-colors hover:border-cyan hover:text-cyan"
      >
        Cerrar sesión
      </button>
    </header>
  );
}
