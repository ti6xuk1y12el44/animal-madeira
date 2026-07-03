import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/server";
import ClinicList from "./ClinicList";

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
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] text-green">Prevenção</p>
          <h1 className="max-w-[16ch] font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Esterilizar é proteger<span className="text-green">.</span>
          </h1>
          <p className="mt-4 max-w-[52ch] text-[15px] text-white/45">
            A forma mais eficaz de reduzir o abandono na ilha. Encontra clínicas, campanhas e apoios no teu concelho.
          </p>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl divide-x divide-line sm:grid-cols-2 lg:grid-cols-5">
          {[
            { title: "Menos abandono", sub: "Previne ninhadas indesejadas." },
            { title: "Mais saúde", sub: "Animais esterilizados vivem mais." },
            { title: "Menos custos", sub: "Evita problemas médicos caros." },
            { title: "Comunidade", sub: "Controla a população de rua." },
            { title: "Apoio local", sub: "Fortalece clínicas e associações." },
          ].map((b) => (
            <div key={b.title} className="px-5 py-7">
              <span className="text-sm font-semibold">{b.title}</span>
              <p className="mt-1 text-xs text-ink/45">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <ClinicList parishes={parishes} clinics={clinics || []} />
        </div>
      </section>

      <section className="border-t border-line bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-green">Dúvidas</p>
          <h2 className="mb-14 font-display text-3xl font-bold tracking-tight md:text-4xl">Perguntas frequentes</h2>
          <div className="mx-auto max-w-2xl divide-y divide-line">
            {[
              { q: "Quanto custa esterilizar?", a: "Depende da clínica, do porte e da espécie. Muitas associações oferecem campanhas a baixo custo ou por donativo — e em alguns concelhos existe apoio municipal gratuito." },
              { q: "A partir de que idade posso esterilizar?", a: "Em geral a partir dos 5–6 meses, mas o veterinário avalia caso a caso. Fala sempre com a clínica antes de marcar." },
              { q: "É seguro?", a: "Sim — é um dos procedimentos mais comuns em medicina veterinária. Animais esterilizados tendem a ser mais saudáveis e a viver mais tempo." },
              { q: "Preciso de marcar?", a: "Quase sempre. Liga primeiro para confirmar disponibilidade, condições e preparação." },
              { q: "E depois da cirurgia?", a: "Repouso, local calmo, colar isabelino se indicado e vigilância da ferida. A clínica dá instruções completas no dia." },
            ].map((faq) => (
              <details key={faq.q} className="group">
                <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 font-display text-[15px] font-semibold">
                  {faq.q}
                  <span className="shrink-0 text-ink/30 transition group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 text-[14px] leading-relaxed text-ink/50">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12">
          <div>
            <h3 className="font-display text-lg font-bold">Dificuldades com o custo?</h3>
            <p className="mt-1 text-[13px] text-ink/45">Pode existir apoio financeiro. Fala connosco.</p>
          </div>
          <Link
            href="/sobre"
            className="rounded-full bg-green px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-dark"
          >
            Contactar
          </Link>
        </div>
      </section>
    </main>
  );
}