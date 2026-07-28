import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/server";
import ClinicList from "./ClinicList";
import { Scissors, Heart, Shield, Coins, Users } from "lucide-react";

export const metadata = { title: "Esterilizar · Animal Madeira" };

export default async function EsterilizarPage() {
  const supabase = supabasePublic();
  const { data: clinics } = await supabase
    .from("clinics")
    .select("*")
    .order("parish")
    .order("is_campaign", { ascending: false });

  const parishes = [...new Set(clinics?.map((c) => c.parish) || [])].sort();

  return (
    <main>
      <section className="relative overflow-hidden bg-green-900 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.2em] text-green-400">Prevencao</p>
            <h1 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl">
              Esterilizar e proteger<span className="text-green-400">.</span>
            </h1>
            <p className="mt-3 max-w-[52ch] text-[14px] text-white/60">
              A forma mais eficaz de reduzir o abandono na ilha. Encontra clinicas, campanhas e apoios no teu concelho.
            </p>
          </div>
          <div className="hidden overflow-hidden rounded-2xl md:block">
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=350&fit=crop" alt="Animais" className="h-[200px] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-line px-5 md:grid-cols-5 md:divide-y-0">
          {[
            { Icon: Heart, title: "Menos abandono", sub: "Previne ninhadas indesejadas." },
            { Icon: Shield, title: "Mais saude", sub: "Animais esterilizados vivem mais." },
            { Icon: Coins, title: "Menos custos", sub: "Evita problemas medicos caros." },
            { Icon: Users, title: "Comunidade", sub: "Controla a populacao de rua." },
            { Icon: Scissors, title: "Apoio local", sub: "Fortalece clinicas e associacoes." },
          ].map((b) => (
            <div key={b.title} className="flex items-start gap-3 px-4 py-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50">
                <b.Icon size={16} className="text-green-600" />
              </span>
              <div>
                <span className="text-[13px] font-semibold">{b.title}</span>
                <p className="mt-0.5 text-[11px] text-ink/50">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <ClinicList parishes={parishes} clinics={clinics || []} />
        </div>
      </section>

      <section className="border-t border-line bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px w-6 bg-green-400" />
            <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-green-600">Duvidas</span>
          </div>
          <h2 className="mb-10 font-display text-xl font-bold md:text-2xl">Perguntas frequentes</h2>
          <div className="mx-auto max-w-2xl divide-y divide-line">
            {[
              { q: "Quanto custa esterilizar?", a: "Depende da clinica, do porte e da especie. Muitas associacoes oferecem campanhas a baixo custo ou por donativo — e em alguns concelhos existe apoio municipal gratuito." },
              { q: "A partir de que idade posso esterilizar?", a: "Em geral a partir dos 5-6 meses, mas o veterinario avalia caso a caso. Fala sempre com a clinica antes de marcar." },
              { q: "E seguro?", a: "Sim — e um dos procedimentos mais comuns em medicina veterinaria. Animais esterilizados tendem a ser mais saudaveis e a viver mais tempo." },
              { q: "Preciso de marcar?", a: "Quase sempre. Liga primeiro para confirmar disponibilidade, condicoes e preparacao." },
              { q: "E depois da cirurgia?", a: "Repouso, local calmo, colar isabelino se indicado e vigilancia da ferida. A clinica da instrucoes completas no dia." },
            ].map((faq) => (
              <details key={faq.q} className="group">
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-display text-[15px] font-semibold">
                  {faq.q}
                  <span className="shrink-0 text-ink/30 transition group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 text-[14px] leading-relaxed text-ink/60">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-10">
          <div>
            <h3 className="font-display text-base font-bold">Dificuldades com o custo?</h3>
            <p className="mt-1 text-[13px] text-ink/50">Pode existir apoio financeiro. Fala connosco.</p>
          </div>
          <Link href="/sobre" className="rounded-full bg-green-600 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-green-700">
            Contactar
          </Link>
        </div>
      </section>
    </main>
  );
}