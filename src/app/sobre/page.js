import Link from "next/link";
import { Heart, Users, Handshake, Shield, Eye, Target, Building, Stethoscope, HandHeart, ArrowRight } from "lucide-react";

export const metadata = { title: "Sobre · Animal Madeira" };

export default function SobrePage() {
  return (
    <main>
      <section className="bg-green-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px w-6 bg-green-400" />
            <span className="text-[11px] font-semibold uppercase tracking-[.2em] text-green-400">Quem somos</span>
          </div>
          <h1 className="max-w-[18ch] font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            A ponte entre quem precisa e quem pode ajudar<span className="text-green-400">.</span>
          </h1>
          <p className="mt-4 max-w-[56ch] text-[15px] text-white/90">
            Madeira Animal Help e uma plataforma criada para ligar pessoas, associacoes, municipios e autoridades responsaveis pelo bem-estar animal na Madeira.
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-line md:grid-cols-4 md:divide-y-0">
          {[
            { Icon: Heart, n: "500+", l: "Animais a procura de uma familia" },
            { Icon: Building, n: "Toda a Madeira", l: "Abrigos e associacoes participantes" },
            { Icon: Users, n: "Junte-se a nos", l: "Voluntariado disponivel" },
            { Icon: Target, n: "11 Municipios", l: "Informacao organizada por concelho" },
          ].map((s) => (
            <div key={s.l} className="flex items-start gap-3 px-5 py-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50">
                <s.Icon size={18} className="text-green-600" />
              </span>
              <div>
                <div className="font-display text-[14px] font-bold">{s.n}</div>
                <div className="mt-0.5 text-[12px] leading-snug text-ink/85">{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="h-px w-6 bg-green-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-green-600">A plataforma</span>
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              O que e a Madeira Animal Help.
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink/90">
              <p>
                A plataforma foi iniciada pela Madeira Friends juntamente com parceiros locais para tornar mais facil ajudar os animais da ilha.
              </p>
              <p>
                Nos nao somos um abrigo. Nao somos uma associacao de resgate. Somos a ponte entre quem precisa de ajuda e quem a pode dar.
              </p>
              <p>
                A informacao sobre bem-estar animal existia — mas estava espalhada, desorganizada e dificil de encontrar. Nos juntamo-la num so lugar.
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-green-800 p-8 text-white md:p-10">
            <h2 className="font-display text-xl font-bold">O que fazemos.</h2>
            <div className="mt-6 space-y-4">
              {[
                "Ligamos quem encontra um animal a quem pode ajudar.",
                "Organizamos informacao de esterilizacao por concelho.",
                "Facilitamos denuncias confidenciais as autoridades.",
                "Mostramos contactos de emergencia para cada situacao.",
                "Centralizamos abrigos, associacoes e voluntariado.",
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-[14px]">
                  <span className="mt-0.5 shrink-0">
                    <Heart size={14} className="text-green-400" />
                  </span>
                  <span className="text-white/100">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-line p-8 md:p-10">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-px w-6 bg-green-400" />
                <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-green-600">Missão</span>
              </div>
              <h2 className="font-display text-xl font-bold">Informar, ligar, proteger.</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/90">
                Melhorar a vida dos animais da Madeira atraves de um ponto central de informacao, coordenacao e apoio comunitario.
              </p>
            </div>
            <div className="rounded-xl border border-line p-8 md:p-10">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-px w-6 bg-green-400" />
                <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-green-600">Valores</span>
              </div>
              <h2 className="font-display text-xl font-bold">O que nos move.</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  { label: "Compaixao", Icon: Heart },
                  { label: "Transparencia", Icon: Eye },
                  { label: "Colaboracao", Icon: Handshake },
                  { label: "Respeito", Icon: Shield },
                  { label: "Responsabilidade", Icon: Target },
                ].map((v) => (
                  <span key={v.label} className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3.5 py-1.5 text-[12px] font-semibold text-green-700">
                    <v.Icon size={12} /> {v.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-px w-6 bg-green-400" />
          <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-green-600">Rede</span>
        </div>
        <h2 className="mb-12 font-display text-2xl font-bold tracking-tight md:text-3xl">Com quem trabalhamos.</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Municipios", desc: "Camaras e canis municipais, para melhorar servicos e padroes.", Icon: Building, accent: true },
            { title: "Abrigos e Associacoes", desc: "Quem resgata, cuida e encontra familias todos os dias.", Icon: HandHeart, accent: false },
            { title: "Veterinarios", desc: "Profissionais que garantem o melhor cuidado possivel.", Icon: Stethoscope, accent: false },
            { title: "A comunidade", desc: "Alimentadores, transportadores, acolhedores e todos os que ajudam.", Icon: Users, accent: false },
          ].map((item) => (
            <div
              key={item.title}
              className={"rounded-xl p-6 " + (item.accent ? "bg-green-800 text-white" : "border border-line bg-white")}
            >
              <span className={"flex h-10 w-10 items-center justify-center rounded-lg " + (item.accent ? "bg-white/10" : "bg-green-50")}>
                <item.Icon size={18} className={item.accent ? "text-white" : "text-green-600"} />
              </span>
              <h3 className="mt-3 font-display text-[15px] font-semibold">{item.title}</h3>
              <p className={"mt-2 text-[13px] leading-relaxed " + (item.accent ? "text-white/55" : "text-ink/50")}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-14 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-px w-6 bg-green-400" />
                <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-green-600">Percurso</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Como comecou.</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-sky/80">
                A Madeira tem muitas pessoas e organizacoes a ajudar animais. Mas a informacao estava espalhada — quem precisava de ajuda nao sabia por onde comecar, e quem queria ajudar nao sabia como.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-sky/80">
                A Madeira Animal Help nasceu da Madeira Friends depois de percebermos o quao dificil era saber quem contactar, onde adotar, como denunciar e onde se voluntariar.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { year: "2024", text: "Ideia nasce na comunidade Madeira Friends." },
                { year: "2025", text: "Primeiras conversas com abrigos e camaras municipais." },
                { year: "2026", text: "Lancamento da plataforma Madeira Animal Help." },
              ].map((t) => (
                <div key={t.year} className="flex gap-5 rounded-xl border border-line p-5">
                  <span className="font-display text-2xl font-bold text-green-600">{t.year}</span>
                  <p className="text-[14px] text-sky/80">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 md:py-28">
        <div className="rounded-xl bg-green-50 md:flex md:overflow-hidden">
          <div className="flex-1 p-8 md:p-12">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px w-6 bg-green-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-green-600">Iniciativa</span>
            </div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Madeira Friends</h2>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-sky/80">
              Uma comunidade de pessoas que vivem, trabalham e criam raizes na Madeira. Locais e recem-chegados, unidos pelo mesmo objetivo.
            </p>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-sky/80">
              A Madeira Animal Help e a nossa iniciativa de bem-estar animal — independente, sem fins lucrativos e movida a voluntarios.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://madeirafriends.org" target="_blank" rel="noopener noreferrer" className="rounded-full bg-green-800 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-green-700">
                madeirafriends.org
              </a>
              <Link href="/voluntariar" className="rounded-full border border-green-700 px-6 py-3 text-[13px] font-semibold text-green-700 transition hover:bg-green-800 hover:text-white">
                Quero ajudar
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center bg-green-800 p-12">
            <div className="text-center">
              <span className="font-display text-5xl font-bold text-white">MF</span>
              <p className="mt-2 text-[13px] text-white/40">Madeira Friends</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-10">
          <div>
            <h3 className="font-display text-base font-bold">Queres fazer parte?</h3>
            <p className="mt-1 text-[13px] text-ink/85">Ha muitas formas de ajudar — encontra a tua.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/voluntariar" className="rounded-full bg-green-600 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-green-700">
              Voluntariar
            </Link>
            <Link href="/adotar" className="rounded-full border border-line px-6 py-3 text-[13px] font-semibold transition hover:border-ink">
              Adotar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}