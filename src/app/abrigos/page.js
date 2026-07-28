import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/server";
import { Building, Phone } from "lucide-react";

export const metadata = { title: "Abrigos · Animal Madeira" };

const colors = ["#1B6B4A", "#0F3D28", "#145A3A", "#0F3D28", "#1B6B4A", "#145A3A", "#0F3D28", "#1B6B4A", "#145A3A"];

export default async function AbrigosPage() {
  const supabase = supabasePublic();
  const { data: shelters } = await supabase
    .from("shelters")
    .select("*")
    .order("parish")
    .order("name");

  const typeLabels = {
    associacao: "Associacao",
    canil_municipal: "Canil municipal",
    clinica: "Clinica solidaria",
  };

  return (
    <main>
      <section className="relative overflow-hidden bg-green-900 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.2em] text-green-400">Rede</p>
            <h1 className="max-w-[18ch] font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl">
              Abrigos e associacoes<span className="text-green-400">.</span>
            </h1>
            <p className="mt-3 max-w-[52ch] text-[14px] text-white/60">
              O coracao do bem-estar animal na Madeira. Quase todos funcionam com voluntarios e vivem de donativos.
            </p>
          </div>
          <div className="hidden overflow-hidden rounded-2xl md:block">
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=350&fit=crop" alt="Animais" className="h-[200px] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shelters?.map((s, i) => (
            <Link
              key={s.id}
              href={"/abrigos/" + s.slug}
              className="group flex flex-col rounded-xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                {s.logo_url ? (
                  <img src={s.logo_url} alt={s.name} className="h-12 w-12 rounded-xl object-contain" />
                ) : (
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold text-white"
                    style={{ background: colors[i % colors.length] }}
                  >
                    {s.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                )}
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700">
                  {typeLabels[s.type] || s.type}
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold transition group-hover:text-green-600">{s.name}</h3>
              <p className="mt-1 text-[13px] text-ink/50">{s.parish}</p>
              {s.services && s.services.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {s.services.map((sv) => (
                    <span key={sv} className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-ink/40">
                      {sv}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-auto flex flex-col gap-1 pt-5 text-[13px]">
                {s.phone && <span className="font-display font-bold">{s.phone}</span>}
                {s.email && <span className="truncate text-ink/40">{s.email}</span>}
              </div>
              <span className="mt-3 text-[12px] font-semibold text-green-600 opacity-0 transition group-hover:opacity-100">
                Ver detalhes →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid items-center gap-14 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="h-px w-6 bg-green-400" />
                <span className="text-[11px] font-semibold uppercase tracking-[.15em] text-green-600">Apoiar</span>
              </div>
              <h2 className="font-display text-xl font-bold md:text-2xl">Como podes ajudar.</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink/50">
                Estas organizacoes sao a espinha dorsal do bem-estar animal na ilha. A maioria e gerida por voluntarios com recursos limitados.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: "Doar", desc: "Cada euro ajuda a salvar vidas.", accent: true },
                { title: "Acolher", desc: "Da um lar temporario a um animal.", accent: false },
                { title: "Voluntariar", desc: "O teu tempo e as tuas maos.", accent: false },
                { title: "Partilhar", desc: "Divulga. Cada partilha conta.", accent: false },
              ].map((h) => (
                <div key={h.title} className={"rounded-xl p-5 " + (h.accent ? "bg-green-800 text-white" : "border border-line")}>
                  <h3 className="font-display text-sm font-bold">{h.title}</h3>
                  <p className={"mt-1 text-[12px] " + (h.accent ? "text-white/55" : "text-ink/40")}>{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <Phone size={18} className="text-red-500" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold">Emergencia com um animal?</h3>
              <p className="mt-0.5 text-[13px] text-ink/40">Os bombeiros (112) resgatam animais em perigo imediato.</p>
            </div>
          </div>
          <Link href="/emergencia" className="rounded-full bg-green-600 px-6 py-3 text-[13px] font-semibold text-white transition hover:bg-green-700">
            Ver contactos
          </Link>
        </div>
      </section>
    </main>
  );
}