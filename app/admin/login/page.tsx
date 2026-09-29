"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Email o contraseña incorrectos");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-[380px]">
        <div className="mb-8 text-center">
          <span className="font-display text-2xl font-bold uppercase tracking-[-0.01em]">
            <span className="text-yellow">CYBER</span>
            <span className="text-[#ECECEC]">SOFTWARE</span>
          </span>
          <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[#5A5A5A]">
            Centro de control
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border border-white/10 bg-[#131313] p-8"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8C8C8C]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-white/[0.12] bg-[#0A0A0A] px-[14px] py-[12px] text-sm text-foreground placeholder:text-[#5A5A5A] focus:border-cyan/60 focus:outline-none"
              placeholder="vos@cybersoftware.dev"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8C8C8C]"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/[0.12] bg-[#0A0A0A] px-[14px] py-[12px] text-sm text-foreground placeholder:text-[#5A5A5A] focus:border-cyan/60 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-yellow py-3 text-sm font-bold uppercase tracking-[0.06em] text-background transition-[filter] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
