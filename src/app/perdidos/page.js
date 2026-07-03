import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/server";

export const metadata = { title: "Perdidos & Achados · Animal Madeira" };

export default async function PerdidosPage({ searchParams }) {
  const params = await searchParams;
  const supabase = supabasePublic();

  let query = supabase
    .from("lost_found")
    .select("*")
    .eq("resolved", false)
    .order("created_at", { ascending: false });

  if (params.tipo && params.tipo !== "todos") {
    query = query.eq("type", params.tipo);
  }

  const { data: listings } = await query;
  const count = listings?.length ?? 0;

  return (
    <main>
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] text-green">Comunidade</p>
          <h1 className="max-w-[16ch] font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Perdidos e achados<span className="text-green">.</span>
          </h1>
          <p className="mt-4 max-w-[50ch] text-[15px] text-white/45">
            Perdeste o teu animal ou encontraste um? Publica aqui e ajuda a reunir familias.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="mb-8 flex gap-2">
              {[
                { value: "todos", label: "Todos" },
                { value: "lost", label: "Perdidos" },
                { value: "found", label: "Encontrados" },
              ].map((t) => {
                const active = (params.tipo || "todos") === t.value;
                const href = t.value === "todos" ? "/perdidos" : `/perdidos?tipo=${t.value}`;
                return (
                  <Link
                    key={t.value}
                    href={href}
                    className={`rounded-full px-5 py-2.5 text-[13px] font-semibold transition ${
                      active
                        ? "bg-ink text-white"
                        : "border border-line bg-white text-ink/50 hover:border-ink hover:text-ink"
                    }`}
                  >
                    {t.label}
                  </Link>
                );
              })}
              <span className="ml-auto self-center text-[13px] font-semibold text-ink/40">
                {count} {count === 1 ? "anuncio" : "anuncios"}
              </span>
            </div>

            {count > 0 ? (
              <div className="space-y-3">
                {listings.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-5 rounded-2xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-light text-2xl">
                      {item.species === "dog" ? "🐕" : "🐈"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                            item.type === "lost"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-green-light text-green"
                          }`}
                        >
                          {item.type === "lost" ? "Perdido" : "Encontrado"}
                        </span>
                        <span className="text-[12px] text-ink/30">
                          {new Date(item.created_at).toLocaleDateString("pt-PT")}
                        </span>
                      </div>
                      <h3 className="mt-1 font-display text-base font-semibold">{item.title}</h3>
                      <p className="mt-0.5 text-[13px] text-ink/40 truncate">
                        {item.parish}
                        {item.description ? ` · ${item.description}` : ""}
                      </p>
                    </div>
                    <CallButton phone={item.contact_phone} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-line bg-white px-8 py-20 text-center">
                <p className="font-display text-lg font-semibold">Sem anuncios nesta categoria</p>
                <p className="mt-2 text-[13px] text-ink/40">Boa noticia — ou ainda ninguem publicou.</p>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl bg-ink p-6 text-white">
              <h3 className="font-display text-sm font-bold">Perdi o meu animal</h3>
              <p className="mt-2 text-[13px] text-white/45">
                Publica com foto, local e contacto. A comunidade ajuda a procurar.
              </p>
              <button className="mt-4 w-full rounded-full bg-white py-2.5 text-[13px] font-semibold text-ink transition hover:bg-paper">
                Publicar perdido
              </button>
            </div>
            <div className="rounded-2xl bg-green p-6 text-white">
              <h3 className="font-display text-sm font-bold">Encontrei um animal</h3>
              <p className="mt-2 text-[13px] text-white/55">
                Verifica se tem chip num veterinario e publica aqui.
              </p>
              <button className="mt-4 w-full rounded-full bg-white py-2.5 text-[13px] font-semibold text-ink transition hover:bg-paper">
                Publicar encontrado
              </button>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="font-display text-sm font-bold">Dica</h3>
              <p className="mt-2 text-[13px] text-ink/40">
                A maioria dos reencontros acontece nas primeiras 48 horas. Partilha tambem nos grupos locais do concelho.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
function CallButton({ phone }) {
  const url = "tel:" + phone;
  return (
    <a
      href={url}
      className="shrink-0 rounded-full bg-ink px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-green-dark"
    >
      Ligar
    </a>
  );
}