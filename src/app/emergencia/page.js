import Link from "next/link";
import EmergencySelector from "./EmergencySelector";

export const metadata = { title: "Emergência · Animal Madeira" };

export default function EmergenciaPage() {
  return (
    <main>
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] text-green">Emergência animal</p>
          <h1 className="max-w-[14ch] font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Do que precisas agora<span className="text-green">?</span>
          </h1>
          <p className="mt-4 max-w-[50ch] text-[15px] text-white/45">
            Escolhe a situação e mostramos quem contactar e o que fazer.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <EmergencySelector />

        <div className="mt-12 flex items-center justify-between gap-6 rounded-2xl bg-ink px-8 py-8 text-white">
          <div>
            <span className="font-display text-4xl font-bold">112</span>
            <p className="mt-1 max-w-[50ch] text-[13px] text-white/40">
              Se um animal está em perigo imediato — atropelado, preso, a sangrar — liga aos Bombeiros. Esta plataforma não substitui as autoridades.
            </p>
          </div>
          <a href="tel:112" className="shrink-0 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-paper">
            Ligar 112
          </a>
        </div>
      </section>
    </main>
  );
}