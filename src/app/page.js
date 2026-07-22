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
    .limit(6);

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[85vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&h=1000&fit=crop&crop=faces"
          alt="Animais na Madeira"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-900/60 to-transparent" />
        <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-5 py-20">
          <h1 className="max-w-[10ch] font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl">
            Cada animal merece<span className="text-gold">.</span>
          </h1>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-white/50">
            Adocao, esterilizacao, voluntariado e denuncias para todos os animais da Madeira — num so lugar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/adotar" className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700">
              Quero adotar
            </Link>
            <Link href="/emergencia" className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20">
              Preciso de ajuda
            </Link>
          </div>
        </div>
      </section>

      {/* COMO QUERES AJUDAR */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <h2 className="mb-10 text-center font-display text-2xl font-bold md:text-3xl">Como queres ajudar?</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { href: "/adotar", icon: "🐾", label: "Adotar", sub: "Caes e gatos a espera de uma familia." },
            { href: "/esterilizar", icon: "✂️", label: "Esterilizar", sub: "Campanhas e clinicas em cada concelho." },
            { href: "/voluntariar", icon: "🤝", label: "Voluntariar", sub: "Acolhe, transporta ou da o teu tempo." },
            { href: "/denunciar", icon: "⚠️", label: "Denunciar", sub: "Abandono ou maus-tratos. Confidencial." },
            { href: "/emergencia", icon: "📞", label: "Emergencia", sub: "Contactos certos para cada situacao." },
            { href: "/abrigos", icon: "🏠", label: "Abrigos", sub: "Conhece as associacoes e como ajudar." },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="group flex flex-col items-center gap-2 rounded-xl border border-line bg-white p-5 text-center transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl">{a.icon}</span>
              <h3 className="font-display text-[14px] font-semibold">{a.label}</h3>
              <p className="text-[11px] leading-snug text-ink/35">{a.sub}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-line px-5 md:grid-cols-4">
          {[
            { icon: "❤️", n: "500+", l: "animais a procura de uma familia" },
            { icon: "🏠", n: "Toda a Madeira", l: "abrigos e associacoes participantes" },
            { icon: "🙋", n: "Junte-se a nos", l: "voluntariado disponivel durante todo o ano" },
            { icon: "📍", n: "11 Municipios", l: "informacao organizada por concelho" },
          ].map((s) => (
            <div key={s.l} className="flex items-start gap-3 px-4 py-6 md:px-6">
              <span className="mt-0.5 text-lg">{s.icon}</span>
              <div>
                <div className="font-display text-[14px] font-bold">{s.n}</div>
                <div className="mt-0.5 text-[12px] leading-snug text-ink/40">{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ANIMAIS */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold md:text-3xl">A espera de uma familia</h2>
          <Link href="/adotar" className="text-[13px] font-semibold text-green-600 transition hover:text-green-700">
            Ver todos os animais →
          </Link>
        </div>
        <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {animals?.map((a) => <AnimalCard key={a.id} animal={a} />)}
          {(!animals || animals.length === 0) && (
            <p className="col-span-full py-20 text-center text-[14px] text-ink/30">
              Sem animais na base de dados de momento.
            </p>
          )}
        </div>
      </section>

      {/* HISTORIAS */}
      <section className="bg-green-50 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Historias que mudam vidas ❤️
            </h2>
            <span className="text-[13px] font-semibold text-green-600">Ver todas as historias →</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Bella", status: "ADOTADO", story: "Adotada na ultima semana e ja faz parte da familia.", parish: "Funchal", img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop" },
              { name: "Simba", status: "ADOTADO", story: "Depois de 4 anos a espera, encontrou o seu lar.", parish: "Santa Cruz", img: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=300&fit=crop" },
              { name: "Nina", status: "ADOTADO", story: "Resgatada debilitada, hoje e pura alegria.", parish: "Machico", img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop" },
            ].map((s) => (
              <div key={s.name} className="flex gap-4 rounded-xl border border-line bg-white p-4">
                <img src={s.img} alt={s.name} className="h-20 w-20 shrink-0 rounded-lg object-cover" />
                <div>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-700">{s.status}</span>
                  <h3 className="mt-1 font-display text-[15px] font-semibold">{s.name}</h3>
                  <p className="mt-0.5 text-[12px] text-ink/40">{s.story}</p>
                  <p className="mt-1 text-[11px] text-ink/30">{s.parish}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DENUNCIA + EMERGENCIA */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="grid gap-0 overflow-hidden rounded-2xl md:grid-cols-2">
          <div className="flex items-center gap-4 bg-green-800 px-8 py-8 text-white md:px-10">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-xl">⚠️</span>
            <div>
              <h3 className="font-display text-lg font-bold">Viste um animal em risco?</h3>
              <p className="mt-1 text-[13px] text-white/45">A tua denuncia pode salvar uma vida. E rapido, facil e confidencial.</p>
              <Link href="/denunciar" className="mt-3 inline-block rounded-full border border-white/25 px-5 py-2 text-[12px] font-semibold transition hover:bg-white/10">
                Fazer denuncia
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-gold-dark px-8 py-8 text-white md:px-10">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-xl">📞</span>
            <div>
              <h3 className="font-display text-lg font-bold">Emergencia?</h3>
              <p className="mt-1 text-[13px] text-white/50">Animal ferido ou em perigo imediato? Obtem ajuda agora.</p>
              <Link href="/emergencia" className="mt-3 inline-block rounded-full border border-white/25 px-5 py-2 text-[12px] font-semibold transition hover:bg-white/10">
                Ver contactos de emergencia
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CAMPANHAS */}
      <section className="border-t border-line bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Campanhas de esterilizacao</h2>
            <Link href="/esterilizar" className="text-[13px] font-semibold text-green-600 transition hover:text-green-700">
              Ver todas as campanhas →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Campanha Gatos Funchal", dates: "Ate 31 de Maio 2024", desc: "Esterilizacao para gatos de colonias", parish: "Funchal" },
              { name: "Dias da Esterilizacao Machico", dates: "10 - 12 de Junho 2024", desc: "Campanha low-cost para caes e gatos", parish: "Machico" },
              { name: "Apoio Animal Santana", dates: "Durante todo o mes", desc: "Apoio para esterilizacao de caes", parish: "Santana" },
            ].map((c) => (
              <div key={c.name} className="flex gap-4 rounded-xl border border-line bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-green-50 text-lg">✂️</span>
                <div>
                  <h3 className="font-display text-[14px] font-semibold">{c.name}</h3>
                  <p className="mt-0.5 text-[12px] text-ink/40">{c.dates}</p>
                  <p className="mt-1 text-[12px] text-ink/35">{c.desc}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">{c.parish}</span>
                    <span className="rounded-full border border-line px-2.5 py-1 text-[11px] font-semibold text-ink/40">Saber mais</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABRIGOS */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Abrigos e associacoes</h2>
          <Link href="/abrigos" className="text-[13px] font-semibold text-green-600 transition hover:text-green-700">
            Ver todos →
          </Link>
        </div>
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div>
            <div className="flex flex-wrap gap-4">
              {["SPAD", "VLM", "PF", "CRO", "AAC", "AMS"].map((abbr) => (
                <div key={abbr} className="flex flex-col items-center gap-1.5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 font-display text-xs font-bold text-green-700">
                    {abbr}
                  </div>
                  <span className="text-[10px] text-ink/35">{abbr}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[14px] text-ink/40">
              Encontre abrigos, associacoes e clinicas em toda a Madeira.
            </p>
            <Link href="/abrigos" className="mt-4 inline-block rounded-full bg-green-800 px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-green-700">
              Explorar abrigos
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl border border-line">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop"
              alt="Mapa da Madeira"
              className="h-[240px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* JUNTOS */}
      <section className="border-t border-line bg-green-50 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">Juntos fazemos a diferenca</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/40">
                Madeira Animal Help foi criado para ligar pessoas, associacoes, municipios e autoridades em prol do bem-estar animal na Madeira.
              </p>
              <Link href="/sobre" className="mt-6 inline-block rounded-full border border-ink px-5 py-2.5 text-[13px] font-semibold transition hover:bg-ink hover:text-white">
                Saber mais sobre nos
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { title: "Independente", desc: "Somos uma plataforma, nao um abrigo nem autoridade publica." },
                { title: "Transparente", desc: "Trabalhamos com clareza e responsabilidade." },
                { title: "Colaborativo", desc: "Construimos pontes entre quem quer ajudar e quem precisa." },
                { title: "Focado", desc: "O nosso foco e simples: melhorar a vida dos animais da Madeira." },
              ].map((v) => (
                <div key={v.title} className="rounded-xl border border-line bg-white p-4">
                  <h3 className="font-display text-[13px] font-bold">{v.title}</h3>
                  <p className="mt-2 text-[11px] leading-snug text-ink/35">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-green-800">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-6">
          <div className="flex items-center gap-3 text-white">
            <span className="text-xl">💌</span>
            <div>
              <h3 className="font-display text-[14px] font-bold">Fica a par de campanhas, historias e novidades.</h3>
              <p className="text-[12px] text-white/40">Subscreve a nossa newsletter e ajuda mais animais.</p>
            </div>
          </div>
          <form className="flex w-full gap-2 sm:w-auto" action="#">
            <input
              type="email"
              required
              placeholder="O teu email"
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none transition focus:border-white/40 sm:flex-initial sm:w-64"
            />
            <button type="submit" className="shrink-0 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-green-800 transition hover:bg-gold">
              Subscrever
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}