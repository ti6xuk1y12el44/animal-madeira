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

  return (
    <main>
      <section className="relative min-h-[94vh] overflow-hidden bg-ink">
        <img
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&h=1000&fit=crop&crop=faces"
          alt="Cão na Madeira"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20" />
        <div className="relative mx-auto flex min-h-[94vh] max-w-6xl flex-col justify-end px-5 pb-20">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.2em] text-green">
            Madeira Friends
          </p>
          <h1 className="max-w-[11ch] font-display text-6xl font-bold leading-[1] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
            Cada animal merece<span className="text-green">.</span>
          </h1>
          <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-white/50 md:text-lg">
            Adoção, esterilização, voluntariado e denúncias para todos os animais da Madeira — num só lugar.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/adotar"
              className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-green hover:text-white"
            >
              Adotar um animal
            </Link>
            <Link
              href="/emergencia"
              className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Emergência
            </Link>
          </div>
          <div className="mt-20 flex gap-16 border-t border-white/10 pt-8">
            {[
              { n: "68", l: "animais à espera" },
              { n: "28", l: "organizações" },
              { n: "11", l: "concelhos" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-3xl font-bold text-white md:text-4xl">{s.n}</div>
                <div className="mt-1 text-[13px] text-white/35">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <h2 className="mb-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Como queres ajudar?
        </h2>
        <p className="mb-14 max-w-[50ch] text-[15px] text-ink/50">
          Escolhe o que faz sentido para ti. Cada ação conta.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/adotar", label: "Adotar", sub: "Cães e gatos à espera de uma família.", style: "bg-green text-white" },
            { href: "/esterilizar", label: "Esterilizar", sub: "Campanhas e clínicas em cada concelho.", style: "bg-ink text-white" },
            { href: "/voluntariar", label: "Voluntariar", sub: "Acolhe, transporta ou dá o teu tempo.", style: "bg-white border border-line" },
            { href: "/denunciar", label: "Denunciar", sub: "Abandono ou maus-tratos. Sempre confidencial.", style: "bg-white border border-line" },
            { href: "/emergencia", label: "Emergência", sub: "Contactos certos para cada situação.", style: "bg-green-light" },
            { href: "/perdidos", label: "Perdidos & Achados", sub: "Ajuda a reunir animais às suas famílias.", style: "bg-white border border-line" },
          ].map((a) => {
            const isDark = a.style.includes("bg-green ") || a.style.includes("bg-ink");
            return (
              <Link
                key={a.href}
                href={a.href}
                className={`group flex items-start justify-between gap-4 rounded-2xl p-7 transition hover:-translate-y-0.5 hover:shadow-md ${a.style}`}
              >
                <div>
                  <h3 className="font-display text-lg font-semibold">{a.label}</h3>
                  <p className={`mt-2 text-[13px] leading-relaxed ${isDark ? "text-white/55" : "text-ink/45"}`}>
                    {a.sub}
                  </p>
                </div>
                <span className={`mt-1 shrink-0 text-lg transition group-hover:translate-x-1 ${isDark ? "text-white/40" : "text-ink/25"}`}>
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.15em] text-green">Adoção</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                À espera de casa
              </h2>
            </div>
            <Link
              href="/adotar"
              className="rounded-full border border-line px-5 py-2.5 text-[13px] font-semibold transition hover:border-ink"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {animals?.map((a) => <AnimalCard key={a.id} animal={a} />)}
            {(!animals || animals.length === 0) && (
              <p className="col-span-full py-20 text-center text-[15px] text-ink/40">
                Sem animais de momento.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="grid gap-4 md:grid-cols-5">
          <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-14 text-white md:col-span-3 md:px-12">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green/15 blur-[80px]" />
            <div className="absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-white/5 blur-[60px]" />
            <div className="relative">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-green">Denúncia confidencial</p>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Viste um animal em risco?
              </h2>
              <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-white/45">
                A tua informação é encaminhada diretamente para as autoridades com poder de agir. A tua identidade fica protegida.
              </p>
              <Link
                href="/denunciar"
                className="mt-10 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-green hover:text-white"
              >
                Fazer denúncia
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-3xl border border-line bg-white px-8 py-14 md:col-span-2">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-green">Prevenção</p>
              <h2 className="font-display text-2xl font-bold">Esterilização</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/50">
                Campanhas ativas, clínicas e apoio financeiro em cada concelho.
              </p>
            </div>
            <Link
              href="/esterilizar"
              className="mt-10 inline-block w-fit rounded-full bg-green px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-green-dark"
            >
              Ver campanhas
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-green">Rede</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                28 organizações em toda a ilha
              </h2>
              <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-ink/50">
                Abrigos, associações e clínicas solidárias — quase todos geridos por voluntários e mantidos por donativos.
              </p>
              <Link
                href="/abrigos"
                className="mt-10 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-green-dark"
              >
                Conhecer abrigos
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { abbr: "SPAD", bg: "bg-green text-white" },
                { abbr: "CRO", bg: "bg-ink text-white" },
                { abbr: "SDM", bg: "bg-green-light text-green" },
                { abbr: "VLM", bg: "bg-green-light text-green" },
                { abbr: "PF", bg: "bg-ink text-white" },
                { abbr: "AAC", bg: "bg-green text-white" },
              ].map((o) => (
                <div
                  key={o.abbr}
                  className={`flex aspect-square items-center justify-center rounded-2xl font-display text-lg font-bold transition hover:-translate-y-0.5 hover:shadow-md ${o.bg}`}
                >
                  {o.abbr}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="overflow-hidden rounded-3xl bg-green px-8 py-14 text-white md:flex md:items-center md:justify-between md:px-14 md:py-16">
          <div className="max-w-lg">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] text-white/50">
              Quem somos
            </p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Uma iniciativa Madeira Friends.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-white/55">
              Comunidade independente de pessoas que vivem na ilha e trabalham juntas pelo bem-estar animal. Não somos abrigo nem autoridade — somos a ponte.
            </p>
          </div>
          <Link
            href="/sobre"
            className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-paper md:mt-0"
          >
            Saber mais
          </Link>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12">
          <div>
            <h3 className="font-display text-lg font-bold">Fica a par</h3>
            <p className="mt-1 text-[13px] text-ink/45">Campanhas e novidades, uma vez por mês.</p>
          </div>
          <form className="flex gap-2" action="#">
            <input
              type="email"
              required
              placeholder="O teu email"
              className="rounded-full border border-line bg-white px-5 py-2.5 text-sm text-ink outline-none transition focus:border-green"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-dark"
            >
              Subscrever
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}