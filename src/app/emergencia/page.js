import Link from "next/link";
import { Phone } from "lucide-react";
import EmergencySelector from "./EmergencySelector";

export const metadata = { title: "Emergencia · Animal Madeira" };

export default function EmergenciaPage() {
  return (
    <main>
      <section className="bg-green-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] text-green-400">Emergencia animal</p>
          <h1 className="max-w-[14ch] font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Do que precisas agora<span className="text-green-400">?</span>
          </h1>
          <p className="mt-4 max-w-[50ch] text-[15px] text-white/60">
            Escolhe a situacao e mostramos quem contactar e o que fazer.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <EmergencySelector />

        <div className="mt-12 flex flex-col gap-6 rounded-xl bg-green-800 px-8 py-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
              <Phone size={22} />
            </span>
            <div>
              <span className="font-display text-4xl font-bold">112</span>
              <p className="mt-1 max-w-[50ch] text-[13px] text-white/50">
                Se um animal esta em perigo imediato — atropelado, preso, a sangrar — liga aos Bombeiros. Esta plataforma nao substitui as autoridades.
              </p>
            </div>
          </div>
          <CallButton />
        </div>
      </section>
    </main>
  );
}

function CallButton() {
  return (
    <a href="tel:112" className="shrink-0 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-green-800 transition hover:bg-green-50">
      Ligar 112
    </a>
  );
}