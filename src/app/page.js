import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/server";

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
      <section className="relative min-h-[80vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1600&h=900&fit=crop"
          alt="Cao e gato na Madeira"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/85 via-green-900/50 to-transparent" />
        <div className="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-5 py-20">
          <h1 className="max-w-[12ch] font-display text-5xl font-bold italic leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
            Cada animal merece.
          </h1>
          <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-white/100">
            Adocao, esterilizacao, voluntariado e denuncias para todos os animais da Madeira — num so lugar.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/adotar" className="rounded-full bg-green-600 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-green-700">
              Quero adotar
            </Link>
            <Link href="/emergencia" className="rounded-full border border-white/30 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-green-700">
              Preciso de ajuda
            </Link>
          </div>
        </div>
      </section>

      {/* COMO QUERES AJUDAR */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <h2 className="mb-10 text-center font-display text-xl font-bold md:text-2xl">Como queres ajudar?</h2>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
          {[
            { href: "/adotar", icon: "🐾", label: "Adotar", sub: "Caes e gatos a espera de uma familia." },
            { href: "/esterilizar", icon: "✂️", label: "Esterilizar", sub: "Campanhas e clinicas em cada concelho." },
            { href: "/voluntariar", icon: "💚", label: "Voluntariar", sub: "Acolhe, transporta ou da o teu tempo." },
            { href: "/denunciar", icon: "⚠️", label: "Denunciar", sub: "Abandono ou maus-tratos. Sempre confidencial.", arrow: true },
            { href: "/emergencia", icon: "📞", label: "Emergencia", sub: "Contactos certos para cada situacao.", arrow: true },
            { href: "/abrigos", icon: "🏠", label: "Abrigos", sub: "Conhece as associacoes e como ajudar." },
          ].map((a) => (
            <Link key={a.href} href={a.href} className="group flex flex-col items-center gap-2 rounded-xl border border-line bg-white px-3 py-5 text-center transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-lg">{a.icon}</span>
              <h3 className="font-display text-[13px] font-semibold">{a.label}</h3>
              <p className="text-[12px] leading-snug text-ink/75">{a.sub}</p>
              {a.arrow && <span className="text-[11px] text-green-600">→</span>}
            </Link>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-line md:grid-cols-4 md:divide-y-0">
          {[
            { icon: "❤️", n: "500+", l: "animais a procura de uma familia" },
            { icon: "🏠", n: "Toda a Madeira", l: "abrigos e associacoes participantes" },
            { icon: "🙋", n: "Junte-se a nos", l: "voluntariado disponivel durante todo o ano" },
            { icon: "📍", n: "11 Municipios", l: "informacao organizada por concelho" },
          ].map((s) => (
            <div key={s.l} className="flex items-start gap-3 px-5 py-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-base">{s.icon}</span>
              <div>
                <div className="font-display text-[14px] font-bold">{s.n}</div>
                <div className="mt-0.5 text-[12px] leading-snug text-ink/90">{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ANIMAIS */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-xl font-bold md:text-2xl">A espera de uma familia</h2>
          <Link href="/adotar" className="text-[13px] font-semibold text-green-600 hover:text-green-700">Ver todos os animais →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {animals?.map((a) => {
            const age = a.age_months < 12 ? a.age_months + " meses" : Math.floor(a.age_months / 12) + " anos";
            const photo = a.photos && a.photos[0] ? a.photos[0] : null;
            return (
              <Link key={a.id} href={"/adotar/" + a.slug} className="group">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-green-100">
                  {photo ? <AnimalPhoto src={photo} alt={a.name} /> : (
                    <div className="flex h-full items-center justify-center font-display text-2xl font-bold text-green-300">{a.name[0]}</div>
                  )}
                  {a.urgent && (
                    <span className="absolute left-2 top-2 rounded bg-red-500 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">Urgente</span>
                  )}
                </div>
                <div className="mt-2">
                  <h3 className="font-display text-[14px] font-semibold">{a.name}</h3>
                  <p className="text-[11px] text-ink/90">
                    {a.sex === "f" ? "Femea" : "Macho"} · {age}
                  </p>
                  <p className="text-[11px] text-ink/90">
                    {a.species === "dog" ? "Cao" : "Gato"} · {a.size ? {small:"Pequeno",medium:"Medio",large:"Grande"}[a.size] : "—"}
                  </p>
                  <p className="text-[11px] text-ink/90">{a.shelters?.name} · {a.shelters?.parish}</p>
                </div>
                <button className="mt-2 w-full rounded-lg bg-green-600 py-1.5 text-[11px] font-semibold text-white transition group-hover:bg-green-700">Ver perfil</button>
              </Link>
            );
          })}
        </div>
      </section>

      {/* HISTORIAS */}
      <section className="bg-green-50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-xl font-bold md:text-2xl">Historias que mudam vidas ❤️</h2>
            <span className="text-[13px] font-semibold text-green-600">Ver todas as historias →</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Bella", status: "ADOTADO", story: "Adotada na ultima semana e ja faz parte da familia.", parish: "Funchal", img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop" },
              { name: "Simba", status: "ADOTADO", story: "Depois de 4 anos a espera, encontrou o seu lar.", parish: "Santa Cruz", img: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=300&fit=crop" },
              { name: "Nina", story: "Resgatada debilitada, hoje e pura alegria.", parish: "Machico", img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop" },
            ].map((s) => (
              <div key={s.name} className="flex gap-4 rounded-xl border border-line bg-white p-4">
                <img src={s.img} alt={s.name} className="h-20 w-20 shrink-0 rounded-lg object-cover" />
                <div>
                  {s.status && <span className="rounded bg-green-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-green-700">{s.status}</span>}
                  <h3 className="mt-1 font-display text-[14px] font-semibold">{s.name}</h3>
                  <p className="mt-0.5 text-[12px] text-ink/90">{s.story}</p>
                  <p className="mt-1 text-[12px] text-ink/90">{s.parish}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DENUNCIA + EMERGENCIA */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid overflow-hidden rounded-xl md:grid-cols-2">
          <div className="flex gap-4 bg-green-800 p-6 text-white md:p-8">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg">⚠️</span>
            <div>
              <h3 className="font-display text-base font-bold">Viste um animal em risco?</h3>
              <p className="mt-1 text-[12px] text-sky/50">A tua denuncia pode salvar uma vida. E rapido, facil e confidencial.</p>
              <Link href="/denunciar" className="mt-3 inline-block rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-semibold transition hover:bg-white/10">Fazer denuncia</Link>
            </div>
          </div>
          <div className="flex gap-4 bg-red-600 p-6 text-white md:p-8">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg">📞</span>
            <div>
              <h3 className="font-display text-base font-bold">Emergencia?</h3>
              <p className="mt-1 text-[12px] text-sky/50">Animal ferido ou em perigo imediato? Obtem ajuda agora.</p>
              <Link href="/emergencia" className="mt-3 inline-block rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-semibold transition hover:bg-white/10">Ver contactos de emergencia</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CAMPANHAS */}
      <section className="border-t border-line bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-xl font-bold md:text-2xl">Campanhas de esterilizacao</h2>
            <Link href="/esterilizar" className="text-[13px] font-semibold text-green-600 hover:text-green-700">Ver todas as campanhas →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Campanha Gatos Funchal", dates: "Ate 31 de Maio 2024", desc: "Esterilizacao para gatos de colonias", parish: "Funchal" },
              { name: "Dias da Esterilizacao Machico", dates: "10 - 12 de Junho 2024", desc: "Campanha low-cost para caes e gatos", parish: "Machico" },
              { name: "Apoio Animal Santana", dates: "Durante todo o mes", desc: "Apoio para esterilizacao de caes", parish: "Santana" },
            ].map((c) => (
              <div key={c.name} className="flex gap-4 rounded-xl border border-line p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-lg">✂️</span>
                <div>
                  <h3 className="font-display text-[13px] font-semibold">{c.name}</h3>
                  <p className="text-[12px] text-ink/85">{c.dates}</p>
                  <p className="mt-1 text-[12px] text-ink/85">{c.desc}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">{c.parish}</span>
                    <span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold text-sky/50">Saber mais</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABRIGOS */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-xl font-bold md:text-2xl">Abrigos e associacoes</h2>
          <Link href="/abrigos" className="text-[13px] font-semibold text-green-600 hover:text-green-700">Ver todos →</Link>
        </div>
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div>
            <div className="flex flex-wrap gap-5">
              {["SPAD", "Vamos La", "Patinhas Felizes", "CRO Santa Cruz", "Ajuda a Alimentar Caes", "Abrigo Municipal Santana"].map((name) => (
                <div key={name} className="flex flex-col items-center gap-1.5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                    <span className="font-display text-[15px] font-bold text-green-700">{name.split(" ").map(w => w[0]).join("").slice(0,3)}</span>
                  </div>
                  <span className="max-w-[70px] text-center text-[12px] leading-tight text-sky/40">{name}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13px] text-sky/40">Encontre abrigos, associacoes e clinicas em toda a Madeira.</p>
            <Link href="/abrigos" className="mt-4 inline-block rounded-full bg-green-600 px-5 py-2.5 text-[12px] font-semibold text-white transition hover:bg-green-700">Explorar no mapa</Link>
          </div>
          <div className="overflow-hidden rounded-xl border border-line">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=350&fit=crop" alt="Mapa da Madeira" className="h-[220px] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* JUNTOS */}
      <section className="border-t border-line bg-green-50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-8 md:grid-cols-[1fr_1.8fr]">
            <div>
              <h2 className="font-display text-xl font-bold md:text-2xl">Juntos fazemos a diferenca</h2>
              <p className="mt-3 text-[13px] leading-relaxed text-sky/40">
                Madeira Animal Help foi criado para ligar pessoas, associacoes, municipios e autoridades em prol do bem-estar animal na Madeira.
              </p>
              <Link href="/sobre" className="mt-5 inline-block rounded-full border border-ink px-5 py-2 text-[12px] font-semibold transition hover:bg-ink hover:text-white">Saber mais sobre nos</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: "🔷", title: "Independente", desc: "Somos uma plataforma, nao um abrigo nem autoridade publica." },
                { icon: "🔍", title: "Transparente", desc: "Trabalhamos com clareza e responsabilidade em tudo o que fazemos." },
                { icon: "🤝", title: "Colaborativo", desc: "Construimos pontes entre pessoas que querem ajudar e quem precisa." },
                { icon: "🎯", title: "Focado", desc: "O nosso foco e simples: melhorar a vida dos animais da Madeira." },
              ].map((v) => (
                <div key={v.title} className="rounded-xl border border-line bg-white p-4 text-center">
                  <span className="text-xl">{v.icon}</span>
                  <h3 className="mt-2 font-display text-[12px] font-bold">{v.title}</h3>
                  <p className="mt-1 text-[12px] leading-snug text-sky/35">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-green-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row">
          <div className="flex items-center gap-3 text-white">
            <span className="text-lg">💌</span>
            <div>
              <h3 className="text-[13px] font-bold">Fica a par de campanhas, historias e novidades.</h3>
              <p className="text-[13px] text-sky/90">Subscreve a nossa newsletter e ajuda mais animais.</p>
            </div>
          </div>
          <form className="flex w-full gap-2 sm:w-auto" action="#">
            <input type="email" required placeholder="O teu email" className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[13px] text-white placeholder-white/30 outline-none sm:w-56" />
            <button type="submit" className="shrink-0 rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-green-800 transition hover:bg-green-50">Subscrever</button>
          </form>
        </div>
      </section>
    </main>
  );
}

function AnimalPhoto({ src, alt }) {
  return <img src={src} alt={alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />;
}