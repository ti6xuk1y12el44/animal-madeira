import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/server";

export const metadata = { title: "Abrigos · Animal Madeira" };

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
      <section className="bg-green-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-px w-6 bg-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[.2em] text-gold">Rede</span>
          </div>
          <h1 className="max-w-[18ch] font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Abrigos e associa<span className="text-gold">.</span>
          </h1>
          <p className="mt-4 max-w-[52ch] text-[15px] text-sky/10">
            O coracao do bem-estar animal na Madeira. Quase todos funcionam com voluntarios e vivem de donativos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shelters?.map((s) => (
            <Link
              key={s.id}
              href={`/abrigos/${s.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                {s.logo_url ? (
                  <img src={s.logo_url} alt={s.name} className="h-12 w-12 rounded-xl object-contain" />
                ) : (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-800 font-display text-sm font-bold text-white">
                    {s.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                )}
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700">
                  {typeLabels[s.type] || s.type}
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold transition group-hover:text-green-600">{s.name}</h3>
              <p className="mt-1 text-[13px] text-ink/40">{s.parish}</p>
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
                {s.email && <span className="text-ink/35 truncate">{s.email}</span>}
              </div>
              <span className="mt-4 text-[12px] font-semibold text-green-600 opacity-0 transition group-hover:opacity-100">
                Ver detalhes →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12">
          <div>
            <h3 className="font-display text-lg font-bold">Emergencia com um animal?</h3>
            <p className="mt-1 text-[13px] text-sky/15">Os bombeiros (112) resgatam animais em perigo imediato.</p>
          </div>
          <Link href="/emergencia" className="rounded-full bg-green-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700">
            Ver contactos
          </Link>
        </div>
      </section>
    </main>
  );
}