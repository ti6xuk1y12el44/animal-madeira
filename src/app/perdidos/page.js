import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/server";
import { Search } from "lucide-react";
import LostFoundButtons from "./LostFoundButtons";

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
      <section className="relative overflow-hidden bg-green-900 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.2em] text-green-400">Comunidade</p>
            <h1 className="max-w-[16ch] font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl">
              Perdidos e achados<span className="text-green-400">.</span>
            </h1>
            <p className="mt-3 max-w-[50ch] text-[14px] text-white/60">
              Perdeste o teu animal ou encontraste um? Publica aqui e ajuda a reunir familias.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {[
                { value: "todos", label: "Todos" },
                { value: "lost", label: "Perdidos" },
                { value: "found", label: "Encontrados" },
              ].map((t) => {
                const active = (params.tipo || "todos") === t.value;
                const href = t.value === "todos" ? "/perdidos" : "/perdidos?tipo=" + t.value;
                return (
                  <Link
                    key={t.value}
                    href={href}
                    className={"rounded-full px-5 py-2.5 text-[13px] font-semibold transition " +
                      (active
                        ? "bg-green-600 text-white"
                        : "border border-line bg-white text-ink/50 hover:border-ink hover:text-ink")
                    }
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
                    className="flex items-center gap-5 rounded-xl border border-line bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50">
                      <Search size={20} className="text-green-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={"rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide " +
                            (item.type === "lost"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-green-100 text-green-700")
                          }
                        >
                          {item.type === "lost" ? "Perdido" : "Encontrado"}
                        </span>
                        <span className="text-[12px] text-ink/30">
                          {new Date(item.created_at).toLocaleDateString("pt-PT")}
                        </span>
                      </div>
                      <h3 className="mt-1 font-display text-[14px] font-semibold">{item.title}</h3>
                      <p className="mt-0.5 truncate text-[13px] text-ink/50">
                        {item.parish}
                        {item.description ? " · " + item.description : ""}
                      </p>
                    </div>
                    <CallButton phone={item.contact_phone} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-line bg-white px-8 py-16 text-center">
                <p className="font-display text-base font-semibold">Sem anuncios nesta categoria</p>
                <p className="mt-1 text-[13px] text-ink/40">Boa noticia — ou ainda ninguem publicou.</p>
              </div>
            )}
          </div>

          <LostFoundButtons />
        </div>
      </section>
    </main>
  );
}

function CallButton({ phone }) {
  return (
    <a href={"tel:" + phone} className="shrink-0 rounded-full bg-green-600 px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-green-700">
      Ligar
    </a>
  );
}