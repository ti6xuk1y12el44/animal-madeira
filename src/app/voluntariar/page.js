import Link from "next/link";

export const metadata = { title: "Voluntariar · Animal Madeira" };

export default function VoluntariarPage() {
  return (
    <main>
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] text-green">Voluntariado</p>
          <h1 className="max-w-[14ch] font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Da tempo. Muda vidas<span className="text-green">.</span>
          </h1>
          <p className="mt-4 max-w-[50ch] text-[15px] text-white/45">
            Ha muitas formas de ajudar os animais da Madeira — escolhe a que combina contigo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Acolher temporariamente",
              desc: "Abre a tua casa a um animal enquanto espera por adocao. Alimentacao e apoio veterinario assegurados.",
              points: ["Cuidado temporario", "Comida e vet incluidos", "Preparar para adocao"],
              style: "bg-green text-white",
              pointStyle: "text-white/55",
            },
            {
              title: "Ser flight buddy",
              desc: "Acompanha um animal no voo ate a sua nova familia. Nos tratamos de toda a logistica.",
              points: ["Viajar com o animal", "Seguranca e conforto", "Nos organizamos tudo"],
              style: "bg-ink text-white",
              pointStyle: "text-white/55",
            },
            {
              title: "Ajudar colonias (CED)",
              desc: "Capturar, esterilizar e devolver gatos comunitarios. Formacao e material incluidos.",
              points: ["Montar armadilhas humanas", "Transporte a esterilizacao", "Programas CED"],
              style: "bg-white border border-line",
              pointStyle: "text-ink/45",
            },
          ].map((card) => (
            <div key={card.title} className={`flex flex-col rounded-2xl p-8 ${card.style}`}>
              <h3 className="font-display text-xl font-bold">{card.title}</h3>
              <p className={`mt-2 text-[14px] leading-relaxed ${card.pointStyle}`}>{card.desc}</p>
              <ul className="mt-6 space-y-2">
                {card.points.map((p) => (
                  <li key={p} className={`flex items-center gap-2 text-[13px] ${card.pointStyle}`}>
                    <span className="text-green">✓</span> {p}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full rounded-full py-3 text-sm font-semibold transition ${
                  card.style.includes("bg-green")
                    ? "bg-white text-ink hover:bg-paper"
                    : card.style.includes("bg-ink")
                    ? "bg-white text-ink hover:bg-paper"
                    : "bg-ink text-white hover:bg-green-dark"
                }`}
              >
                Quero ajudar
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-green">Processo</p>
          <h2 className="mb-14 font-display text-3xl font-bold tracking-tight md:text-4xl">
            O que acontece depois.
          </h2>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", title: "Inscreves-te", desc: "Contas-nos como gostavas de ajudar e a tua disponibilidade." },
              { n: "02", title: "Conversamos", desc: "Uma chamada rapida para nos conhecermos e tirar duvidas." },
              { n: "03", title: "Encontramos o encaixe", desc: "Ligamos-te ao abrigo ou missao certa para o teu perfil." },
              { n: "04", title: "Comecas a ajudar", desc: "Com apoio da comunidade Madeira Friends em cada passo." },
            ].map((step) => (
              <div key={step.n} className="bg-white p-7">
                <span className="font-display text-2xl font-bold text-green">{step.n}</span>
                <h3 className="mt-3 font-display text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/45">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-green">No terreno</p>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Ajuda diretamente nos abrigos.
            </h2>
            <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-ink/50">
              Limpeza, alimentacao, passeios e socializacao — todos os dias, em toda a ilha. Os abrigos precisam de ti.
            </p>
            <Link
              href="/abrigos"
              className="mt-8 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-green-dark"
            >
              Ver abrigos
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Funchal", orgs: "SPAD, Patinhas Felizes, Vamos La Madeira, Canil Vasco Gil" },
              { name: "Santa Cruz", orgs: "CRO Santa Cruz" },
              { name: "Ribeira Brava", orgs: "Street Dogs Madeira" },
              { name: "Ponta do Sol", orgs: "Patinhas ao Sol" },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl border border-line bg-white p-5">
                <h3 className="font-display text-sm font-bold">{p.name}</h3>
                <p className="mt-1 text-[12px] text-ink/40">{p.orgs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-green">Razoes</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Porque voluntariar?
              </h2>
            </div>
            <div className="space-y-4">
              {[
                "Ajudar animais que precisam.",
                "Conhecer pessoas com os mesmos valores.",
                "Aprender competencias novas.",
                "Melhorar o bem-estar animal na Madeira.",
              ].map((r) => (
                <div key={r} className="flex items-center gap-3 rounded-xl border border-line px-5 py-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-light text-xs font-bold text-green">
                    ✓
                  </span>
                  <span className="text-[14px]">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12">
          <div>
            <h3 className="font-display text-lg font-bold">Pronto para comecar?</h3>
            <p className="mt-1 text-[13px] text-ink/45">Estamos aqui para te guiar.</p>
          </div>
          <Link
            href="/sobre"
            className="rounded-full bg-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-dark"
          >
            Falar connosco
          </Link>
        </div>
      </section>
    </main>
  );
}