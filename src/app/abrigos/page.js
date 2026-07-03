import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/server";

export const metadata = { title: "Abrigos · Animal Madeira" };

const colors = ["#1B6B4A", "#1A1A19", "#134F36", "#1A1A19", "#1B6B4A", "#134F36", "#1A1A19", "#1B6B4A", "#134F36"];

export default async function AbrigosPage() {
  const supabase = supabasePublic();
  const { data: shelters } = await supabase
    .from("shelters")
    .select("*")
    .order("parish")
    .order("name");

  const types = ["Todos", ...new Set(shelters?.map((s) => s.type) || [])];
  const typeLabels = {
    associacao: "Associacao",
    canil_municipal: "Canil municipal",
    clinica: "Clinica solidaria",
  };

  return (
    <main>
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] text-green">Rede</p>
          <h1 className="max-w-[18ch] font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Abrigos e associacoes<span className="text-green">.</span>
          </h1>
          <p className="mt-4 max-w-[52ch] text-[15px] text-white/45">
            O coracao do bem-estar animal na Madeira. Quase todos funcionam com voluntarios e vivem de donativos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shelters?.map((s, i) => (
            <div key={s.id} className="flex flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold text-white"
                  style={{ background: colors[i % colors.length] }}
                >
                  {s.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                <span className="rounded-full bg-green-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green">
                  {typeLabels[s.type] || s.type}
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold">{s.name}</h3>
              <p className="mt-1 text-[13px] text-ink/40">{s.parish}</p>
              {s.services && s.services.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.services.map((sv) => (
                    <span key={sv} className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-ink/50">
                      {sv}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-auto flex flex-col gap-1 pt-5 text-[13px]">
                {s.phone && <span className="font-display font-bold">{s.phone}</span>}
                {s.email && <span className="text-ink/40">{s.email}</span>}
              </div>
            </div>
          ))}
        </div>

        {(!shelters || shelters.length === 0) && (
          <p className="py-20 text-center text-[15px] text-ink/40">
            Sem abrigos na base de dados de momento.
          </p>
        )}
      </section>

      {/* COMO AJUDAR */}
      <section className="border-y border-line bg-white py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.15em] text-green">Apoiar</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Como podes ajudar.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/50">
                Estas organizacoes sao a espinha dorsal do bem-estar animal na ilha. A maioria e gerida por voluntarios com recursos limitados.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: "Doar", desc: "Cada euro ajuda a salvar vidas." },
                { title: "Acolher", desc: "Da um lar temporario a um animal." },
                { title: "Voluntariar", desc: "O teu tempo e as tuas maos." },
                { title: "Partilhar", desc: "Divulga. Cada partilha conta." },
              ].map((h, i) => (
                <div key={h.title} className={`rounded-2xl p-6 ${i === 0 ? "bg-green text-white" : "border border-line"}`}>
                  <h3 className="font-display text-sm font-bold">{h.title}</h3>
                  <p className={`mt-1 text-[12px] ${i === 0 ? "text-white/55" : "text-ink/40"}`}>{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EMERGENCIA */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-ink px-8 py-8 text-white">
          <div>
            <h3 className="font-display text-lg font-bold">Emergencia com um animal?</h3>
            <p className="mt-1 text-[13px] text-white/40">Nao esperes — os bombeiros (112) resgatam animais em perigo imediato.</p>
          </div>
          <Link
            href="/emergencia"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-paper"
          >
            Ver contactos de emergencia
          </Link>
        </div>
      </section>
    </main>
  );
}