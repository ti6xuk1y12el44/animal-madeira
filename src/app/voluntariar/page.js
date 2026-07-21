import Link from "next/link";
import VolunteerCards from "./VolunteerCards";

export const metadata = { title: "Voluntariar · Animal Madeira" };

export default function VoluntariarPage() {
  return (
    <main>
      <section className="bg-green-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px w-6 bg-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[.2em] text-gold">Voluntariado</span>
          </div>
          <h1 className="max-w-[14ch] font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Da tempo. Muda vidas<span className="text-gold">.</span>
          </h1>
          <p className="mt-4 max-w-[50ch] text-[15px] text-white/40">
            Ha muitas formas de ajudar os animais da Madeira — escolhe a que combina contigo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <VolunteerCards />
      </section>

      {/* PASSOS */}
      <section className="border-y border-line bg-white py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px w-6 bg-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-gold">Processo</span>
          </div>
          <h2 className="mb-14 font-display text-2xl font-bold tracking-tight md:text-3xl">
            O que acontece depois.
          </h2>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", title: "Inscreves-te", desc: "Contas-nos como gostavas de ajudar." },
              { n: "02", title: "Conversamos", desc: "Uma chamada rapida para nos conhecermos." },
              { n: "03", title: "Encontramos o encaixe", desc: "Ligamos-te ao abrigo ou missao certa." },
              { n: "04", title: "Comecas a ajudar", desc: "Com apoio da comunidade em cada passo." },
            ].map((step) => (
              <div key={step.n} className="bg-white p-7">
                <span className="font-display text-2xl font-bold text-gold">{step.n}</span>
                <h3 className="mt-3 font-display text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/40">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABRIGOS */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-px w-6 bg-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-gold">No terreno</span>
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Ajuda diretamente nos abrigos.
            </h2>
            <p className="mt-3 max-w-[44ch] text-[14px] leading-relaxed text-ink/40">
              Limpeza, alimentacao, passeios e socializacao — todos os dias, em toda a ilha.
            </p>
            <Link href="/abrigos" className="mt-8 inline-block rounded-full bg-green-800 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-green-700">
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
                <p className="mt-1 text-[12px] text-ink/35">{p.orgs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-10">
          <div>
            <h3 className="font-display text-base font-bold">Pronto para comecar?</h3>
            <p className="mt-1 text-[13px] text-ink/35">Estamos aqui para te guiar.</p>
          </div>
          <Link href="/sobre" className="rounded-full bg-green-800 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-green-700">
            Falar connosco
          </Link>
        </div>
      </section>
    </main>
  );
}