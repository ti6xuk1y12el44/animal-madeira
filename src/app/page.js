import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/server";
import AnimalCard from "@/components/AnimalCard";

export default async function Home() {
  const supabase = supabasePublic();
  const { data: animals } = await supabase
    .from("animals")
    .select("*, shelters(name, parish)")
    .eq("adopted", false)
    .order("created_at", { ascending: false })
    .limit(4);

  const { count } = await supabase
    .from("animals")
    .select("*", { count: "exact", head: true })
    .eq("adopted", false);

  const { count: shelterCount } = await supabase
    .from("shelters")
    .select("*", { count: "exact", head: true });

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&h=1000&fit=crop&crop=faces"
          alt="Cao na Madeira"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-900/70 to-green-900/30" />
        <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-5 pb-16">
          <div className="mb-5 flex items-center gap-2">
            <div className="h-px w-8 bg-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[.2em] text-gold">
              Ilha da Madeira
            </span>
          </div>
          <h1 className="max-w-[12ch] font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Cada animal merece<span className="text-gold">.</span>
          </h1>
          <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-white/50 md:text-base">
            Adocao, esterilizacao, voluntariado e denuncias — toda a ilha, um so lugar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/adotar"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-green-900 transition hover:bg-gold hover:text-white"
            >
              Adotar um animal
            </Link>
            <Link
              href="/emergencia"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Emergencia
            </Link>
          </div>
          <div className="mt-16 flex gap-14 border-t border-white/10 pt-6">
            {[
              { n: "Centenas", l: "animais a procura de familia" },
              { n: "Toda a ilha", l: "abrigos participantes" },
              { n: "11", l: "municipios cobertos" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-2xl font-bold text-white md:text-3xl">{s.n}</div>
                <div className="mt-1 text-[12px] text-white/30">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACOES */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <h2 className="mb-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
          Como queres ajudar?
        </h2>
        <p className="mb-12 max-w-[48ch] text-[14px] text-ink/40">
          Escolhe o que faz sentido para ti.
        </p>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/adotar", label: "Adotar", sub: "Caes e gatos a espera de familia.", accent: "text-green-600" },
            { href: "/esterilizar", label: "Esterilizar", sub: "Campanhas e clinicas por concelho.", accent: "text-green-600" },
            { href: "/voluntariar", label: "Voluntariar", sub: "Acolhe, transporta ou da tempo.", accent: "text-green-600" },
            { href: "/denunciar", label: "Denunciar", sub: "Abandono ou maus-tratos.", accent: "text-gold" },
            { href: "/emergencia", label: "Emergencia", sub: "Quem contactar, o que fazer.", accent: "text-gold" },
            { href: "/perdidos", label: "Perdidos & Achados", sub: "Reunir animais e familias.", accent: "text-green-600" },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group flex items-start justify-between gap-4 bg-white p-7 transition hover:bg-green-50"
            >
              <div>
                <h3 className={`font-display text-base font-semibold ${a.accent}`}>{a.label}</h3>
                <p className="mt-1.5 text-[13px] text-ink/35">{a.sub}</p>
              </div>
              <span className="mt-0.5 shrink-0 text-ink/15 transition group-hover:translate-x-1 group-hover:text-green-600">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ANIMAIS */}
      <section className="bg-green-50 py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px w-6 bg-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-gold">Adocao</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                A espera de casa
              </h2>
            </div>
            <Link
              href="/adotar"
              className="text-[13px] font-semibold text-green-600 transition hover:text-green-700"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {animals?.map((a) => <AnimalCard key={a.id} animal={a} />)}
            {(!animals || animals.length === 0) && (
              <p className="col-span-full py-20 text-center text-[14px] text-ink/30">
                Sem animais na base de dados de momento.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* DENUNCIA + ESTER */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <div className="grid gap-4 md:grid-cols-5">
          <div className="relative overflow-hidden rounded-2xl bg-green-800 px-8 py-12 text-white md:col-span-3 md:px-10">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-[60px]" />
            <div className="relative">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-px w-6 bg-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-gold">Confidencial</span>
              </div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Viste um animal em risco?
              </h2>
              <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-white/40">
                A tua denuncia segue diretamente para as autoridades com poder de agir. A tua identidade fica protegida.
              </p>
              <Link
                href="/denunciar"
                className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-[13px] font-semibold text-green-800 transition hover:bg-gold hover:text-white"
              >
                Fazer denuncia
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-white px-8 py-12 md:col-span-2">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-px w-6 bg-green-400" />
                <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-green-600">Prevencao</span>
              </div>
              <h2 className="font-display text-xl font-bold">Esterilizacao</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/40">
                Campanhas ativas, clinicas e apoio em cada concelho da ilha.
              </p>
            </div>
            <Link
              href="/esterilizar"
              className="mt-8 inline-block w-fit rounded-full bg-green-800 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-green-700"
            >
              Ver campanhas
            </Link>
          </div>
        </div>
      </section>

      {/* ABRIGOS */}
      <section className="border-y border-line bg-white py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-14 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-px w-6 bg-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-gold">Rede</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                Organizacoes em toda a ilha
              </h2>
              <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-ink/40">
                Abrigos, associacoes e clinicas solidarias. Quase todos geridos por voluntarios e mantidos por donativos.
              </p>
              <Link
                href="/abrigos"
                className="mt-8 inline-block rounded-full bg-green-800 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-green-700"
              >
                Conhecer abrigos
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { abbr: "SPAD", bg: "bg-green-800 text-white" },
                { abbr: "CRO", bg: "bg-green-100 text-green-700" },
                { abbr: "SDM", bg: "bg-gold-light text-gold-dark" },
                { abbr: "VLM", bg: "bg-green-100 text-green-700" },
                { abbr: "PF", bg: "bg-green-800 text-white" },
                { abbr: "AAC", bg: "bg-gold-light text-gold-dark" },
              ].map((o) => (
                <div
                  key={o.abbr}
                  className={`flex aspect-square items-center justify-center rounded-xl font-display text-sm font-bold ${o.bg}`}
                >
                  {o.abbr}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MADEIRA FRIENDS */}
      <section className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <div className="rounded-2xl bg-green-900 px-8 py-12 text-white md:flex md:items-center md:justify-between md:px-12 md:py-14">
          <div className="max-w-md">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-6 bg-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-gold">Madeira Friends</span>
            </div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Feito pela comunidade, para a ilha.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-white/40">
              Independente, sem fins lucrativos, movida a voluntarios. Nao somos abrigo nem autoridade — somos a ponte.
            </p>
          </div>
          <Link
            href="/sobre"
            className="mt-8 inline-block rounded-full border border-white/15 px-6 py-3 text-[13px] font-semibold text-white transition hover:border-gold hover:text-gold md:mt-0"
          >
            Saber mais
          </Link>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-10">
          <div>
            <h3 className="font-display text-base font-bold">Fica a par</h3>
            <p className="mt-1 text-[13px] text-ink/35">Campanhas e novidades, uma vez por mes.</p>
          </div>
          <form className="flex gap-2" action="#">
            <input
              type="email"
              required
              placeholder="O teu email"
              className="rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink outline-none transition focus:border-green-400"
            />
            <button
              type="submit"
              className="rounded-full bg-green-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Subscrever
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}