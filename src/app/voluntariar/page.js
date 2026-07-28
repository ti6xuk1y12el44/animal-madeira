import Link from "next/link";
import VolunteerCards from "./VolunteerCards";
import { HandHeart } from "lucide-react";

export const metadata = { title: "Voluntariar · Animal Madeira" };

export default function VoluntariarPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-green-900 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.2em] text-green-400">Voluntariado</p>
            <h1 className="max-w-[14ch] font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl">
              Da tempo. Muda vidas<span className="text-green-400">.</span>
            </h1>
            <p className="mt-3 max-w-[50ch] text-[14px] text-white/60">
              Ha muitas formas de ajudar os animais da Madeira — escolhe a que combina contigo.
            </p>
          </div>
          <div className="hidden overflow-hidden rounded-2xl md:block">
            <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=350&fit=crop" alt="Voluntario com animal" className="h-[200px] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <VolunteerCards />
      </section>

      <section className="border-y border-line bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px w-6 bg-green-400" />
            <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-green-600">Processo</span>
          </div>
          <h2 className="mb-10 font-display text-xl font-bold md:text-2xl">O que acontece depois.</h2>
          <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", title: "Inscreves-te", desc: "Contas-nos como gostavas de ajudar." },
              { n: "02", title: "Conversamos", desc: "Uma chamada rapida para nos conhecermos." },
              { n: "03", title: "Encontramos o encaixe", desc: "Ligamos-te ao abrigo ou missao certa." },
              { n: "04", title: "Comecas a ajudar", desc: "Com apoio da comunidade em cada passo." },
            ].map((step) => (
              <div key={step.n} className="bg-white p-7">
                <span className="font-display text-2xl font-bold text-green-600">{step.n}</span>
                <h3 className="mt-3 font-display text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/50">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-px w-6 bg-green-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-green-600">No terreno</span>
            </div>
            <h2 className="font-display text-xl font-bold md:text-2xl">Ajuda diretamente nos abrigos.</h2>
            <p className="mt-3 max-w-[44ch] text-[14px] leading-relaxed text-ink/50">
              Limpeza, alimentacao, passeios e socializacao — todos os dias, em toda a ilha.
            </p>
            <Link href="/abrigos" className="mt-8 inline-block rounded-full bg-green-600 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-green-700">
              Ver abrigos
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { name: "Funchal", orgs: "SPAD, Patinhas Felizes, Vamos La Madeira" },
              { name: "Santa Cruz", orgs: "CRO Santa Cruz" },
              { name: "Ribeira Brava", orgs: "Street Dogs Madeira" },
              { name: "Ponta do Sol", orgs: "Patinhas ao Sol" },
            ].map((p) => (
              <div key={p.name} className="rounded-xl border border-line bg-white p-5">
                <h3 className="font-display text-sm font-bold">{p.name}</h3>
                <p className="mt-1 text-[12px] text-ink/40">{p.orgs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-10">
          <div>
            <h3 className="font-display text-base font-bold">Pronto para comecar?</h3>
            <p className="mt-1 text-[13px] text-ink/50">Estamos aqui para te guiar.</p>
          </div>
          <Link href="/sobre" className="rounded-full bg-green-600 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-green-700">
            Falar connosco
          </Link>
        </div>
      </section>
    </main>
  );
}