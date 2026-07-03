import Link from "next/link";

export const metadata = { title: "Sobre · Animal Madeira" };

export default function SobrePage() {
  return (
    <main>
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] text-green">Sobre nós</p>
          <h1 className="max-w-[16ch] font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Não somos um abrigo. Somos uma ponte<span className="text-green">.</span>
          </h1>
          <p className="mt-4 max-w-[52ch] text-[15px] text-white/45">
            Ligamos o público, os voluntários, as associações e as autoridades — para que cada animal tenha uma hipótese melhor.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-8 md:p-10">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-green">Missão</p>
            <h2 className="font-display text-2xl font-bold">Informar, ligar, proteger.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/50">
              Melhorar a vida dos animais da Madeira através de um ponto central de informação, coordenação e apoio comunitário. A informação existia — estava era espalhada e difícil de encontrar. Nós juntámo-la.
            </p>
          </div>
          <div className="rounded-2xl bg-ink p-8 text-white md:p-10">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-white/40">Valores</p>
            <h2 className="font-display text-2xl font-bold">O que nos move.</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Compaixão", "Transparência", "Colaboração", "Respeito", "Responsabilidade"].map((v) => (
                <span key={v} className="rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white/70">
                  {v}
                </span>
              ))}
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-white/40">
              Os animais primeiro, sempre. Comunicação aberta. E a certeza de que fazemos mais quando trabalhamos juntos.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-green">Plataforma</p>
          <h2 className="mb-14 font-display text-3xl font-bold tracking-tight md:text-4xl">O que juntámos aqui.</h2>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {[
              { title: "Apoiar", desc: "Facilitar o acesso a ajuda, denúncias e recursos para animais." },
              { title: "Ligar", desc: "Juntar público, voluntários, associações e autoridades." },
              { title: "Proteger", desc: "Promover posse responsável e proteção de todos os animais." },
              { title: "Educar", desc: "Partilhar conhecimento para uma comunidade mais compassiva." },
              { title: "Mudar", desc: "Usar dados e colaboração para criar mudança duradoura." },
            ].map((item) => (
              <div key={item.title} className="bg-white p-7">
                <h3 className="font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/45">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-green">Rede</p>
        <h2 className="mb-14 font-display text-3xl font-bold tracking-tight md:text-4xl">Com quem trabalhamos.</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Municípios", desc: "Câmaras e canis municipais, para melhorar serviços e padrões." },
            { title: "Abrigos & Associações", desc: "Quem resgata, cuida e encontra famílias todos os dias." },
            { title: "Veterinários", desc: "Profissionais que garantem o melhor cuidado possível." },
            { title: "A comunidade", desc: "Alimentadores, transportadores, acolhedores e todos os que ajudam." },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`rounded-2xl p-7 ${
                i === 0 ? "bg-green text-white" : "border border-line bg-white"
              }`}
            >
              <h3 className="font-display text-base font-semibold">{item.title}</h3>
              <p className={`mt-2 text-[13px] leading-relaxed ${i === 0 ? "text-white/55" : "text-ink/45"}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-green">A história</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Como começou.
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink/50">
                <p>
                  A Madeira tem muitas pessoas e organizações a ajudar animais. Mas a informação estava espalhada — quem precisava de ajuda não sabia por onde começar, e quem queria ajudar não sabia como.
                </p>
                <p>
                  A Animal Madeira nasceu da Madeira Friends depois de percebemos o quão difícil era saber quem contactar, onde adotar, como denunciar e onde se voluntariar.
                </p>
                <p>
                  O objetivo é simples: que quem precisa de ajuda a encontre mais rápido, e que quem quer ajudar consiga fazê-lo de forma mais eficaz.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { year: "2024", text: "Ideia nasce na comunidade Madeira Friends." },
                { year: "2025", text: "Primeiras conversas com abrigos e câmaras municipais." },
                { year: "2026", text: "Lançamento da plataforma Animal Madeira." },
              ].map((t) => (
                <div key={t.year} className="flex gap-5 rounded-xl border border-line p-5">
                  <span className="font-display text-2xl font-bold text-green">{t.year}</span>
                  <p className="text-[14px] text-ink/50">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="overflow-hidden rounded-2xl bg-green-light md:flex">
          <div className="flex-1 p-8 md:p-12">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.15em] text-green">Quem criou</p>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Madeira Friends</h2>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-ink/50">
              Uma comunidade de pessoas que vivem, trabalham e criam raízes na Madeira. Locais e recém-chegados, unidos pelo mesmo objetivo: tornar a ilha um lugar melhor para todos — incluindo os animais.
            </p>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-ink/50">
              A Animal Madeira é a nossa iniciativa de bem-estar animal — independente, sem fins lucrativos e movida a voluntários. Não somos um abrigo nem uma autoridade pública: somos a plataforma que liga quem precisa a quem pode ajudar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
  <a
    href="https://madeirafriends.org"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-dark"
  >
    madeirafriends.org ↗
  </a>

  <Link
    href="/voluntariar"
    className="rounded-full border border-ink px-6 py-3 text-sm font-semibold transition hover:bg-ink hover:text-white"
  >
    Quero ajudar
  </Link>
</div>
          </div>
          <div className="flex flex-col items-center justify-center bg-green p-12">
            <span className="font-display text-5xl font-bold text-white">MF</span>
            <span className="mt-2 text-[13px] font-semibold text-white/50">Madeira Friends</span>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12">
          <div>
            <h3 className="font-display text-lg font-bold">Queres fazer parte?</h3>
            <p className="mt-1 text-[13px] text-ink/45">Há muitas formas de ajudar — encontra a tua.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/voluntariar"
              className="rounded-full bg-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-dark"
            >
              Voluntariar
            </Link>
            <Link
              href="/adotar"
              className="rounded-full border border-line px-6 py-3 text-sm font-semibold transition hover:border-ink"
            >
              Adotar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}