import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/server";

export const metadata = { title: "Adotar · Animal Madeira" };

export default async function AdotarPage({ searchParams }) {
  const params = await searchParams;
  const supabase = supabasePublic();

  let query = supabase
    .from("animals")
    .select("*, shelters(name, parish)")
    .eq("adopted", false)
    .order("created_at", { ascending: false });

  if (params.especie && params.especie !== "todos") query = query.eq("species", params.especie);
  if (params.porte && params.porte !== "todos") query = query.eq("size", params.porte);
  if (params.sexo && params.sexo !== "todos") query = query.eq("sex", params.sexo);
  if (params.urgente === "1") query = query.eq("urgent", true);
  if (params.esterilizado === "1") query = query.eq("sterilised", true);
  if (params.vacinado === "1") query = query.eq("vaccinated", true);

  const { data: animals } = await query;

  const filtered = params.concelho && params.concelho !== "todos"
    ? animals?.filter((a) => a.shelters?.parish === params.concelho)
    : animals;

  const bySearch = params.q
    ? filtered?.filter((a) => a.name.toLowerCase().includes(params.q.toLowerCase()))
    : filtered;

  const count = bySearch?.length ?? 0;

  return (
    <main>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-green-900 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[.2em] text-green-400">Adocao</p>
            <h1 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-white md:text-4xl">
              Encontra o teu novo melhor amigo<span className="text-gold">.</span>
            </h1>
            <p className="mt-3 max-w-[48ch] text-[14px] text-white/45">
              Todos os animais sao avaliados por um veterinario. Quando adotas, mudas duas vidas.
            </p>
          </div>
          <div className="hidden overflow-hidden rounded-2xl md:block">
            <img src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=350&fit=crop" alt="Animais" className="h-[200px] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        {/* SEARCH + SORT */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <form className="flex flex-1 gap-2" action="/adotar">
            <HiddenParams params={params} exclude="q" />
            <input name="q" defaultValue={params.q || ""} placeholder="Pesquisar por nome..." className="flex-1 rounded-lg border border-line bg-white px-4 py-2.5 text-[13px] outline-none transition focus:border-green-400" />
          </form>
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-ink/40">{count} animais encontrados</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* SIDEBAR FILTROS */}
          <aside className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold">Filtrar</h2>
              <Link href="/adotar" className="text-[12px] font-semibold text-green-600 hover:underline">Limpar filtros</Link>
            </div>

            <FilterPills label="Especie" name="especie" value={params.especie} options={[
              { value: "todos", label: "Todos" },
              { value: "dog", label: "Caes" },
              { value: "cat", label: "Gatos" },
            ]} params={params} />

            <FilterSelect label="Concelho" name="concelho" value={params.concelho} options={[
              "todos|Todos os Concelhos",
              "Funchal|Funchal", "Santa Cruz|Santa Cruz", "Machico|Machico",
              "Camara de Lobos|Camara de Lobos", "Ribeira Brava|Ribeira Brava",
              "Santana|Santana", "Ponta do Sol|Ponta do Sol", "Calheta|Calheta",
            ]} params={params} />

            <FilterPills label="Sexo" name="sexo" value={params.sexo} options={[
              { value: "todos", label: "Todos" },
              { value: "m", label: "Macho" },
              { value: "f", label: "Femea" },
            ]} params={params} />

            <FilterPills label="Porte" name="porte" value={params.porte} options={[
              { value: "todos", label: "Todos" },
              { value: "small", label: "Pequeno" },
              { value: "medium", label: "Medio" },
              { value: "large", label: "Grande" },
            ]} params={params} />

            <div>
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.1em] text-ink/35">Caracteristicas</span>
              <div className="space-y-2">
                <FilterCheck label="Esterilizado" name="esterilizado" checked={params.esterilizado === "1"} params={params} />
                <FilterCheck label="Vacinado" name="vacinado" checked={params.vacinado === "1"} params={params} />
              </div>
            </div>

            <FilterToggle label="Apenas urgentes" name="urgente" value={params.urgente} params={params} />
          </aside>

          {/* GRID */}
          <div>
            {count > 0 ? (
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {bySearch.map((a) => {
                  const age = a.age_months < 12 ? a.age_months + " meses" : Math.floor(a.age_months / 12) + " anos";
                  const photo = a.photos && a.photos[0] ? a.photos[0] : null;
                  const sizeLabel = {small:"Pequeno",medium:"Medio",large:"Grande"}[a.size] || null;
                  return (
                    <Link key={a.id} href={"/adotar/" + a.slug} className="group overflow-hidden rounded-xl border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-md">
                      <div className="relative aspect-square overflow-hidden bg-green-100">
                        {photo ? <CardPhoto src={photo} alt={a.name} /> : (
                          <div className="flex h-full items-center justify-center font-display text-3xl font-bold text-green-300">{a.name[0]}</div>
                        )}
                        {a.urgent && (
                          <span className="absolute left-2 top-2 rounded bg-red-500 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">Urgente</span>
                        )}
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-1">
                          <h3 className="font-display text-[14px] font-semibold">{a.name}</h3>
                          <span className="text-[12px] text-ink/30">{a.sex === "f" ? "♀" : "♂"}</span>
                        </div>
                        <p className="text-[11px] text-ink/40">
                          {a.species === "dog" ? "Cao" : "Gato"} · {age}
                        </p>
                        <p className="text-[11px] text-ink/30">{a.shelters?.name} · {a.shelters?.parish}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {a.sterilised && <span className="rounded-full bg-green-50 px-2 py-0.5 text-[9px] font-semibold text-green-700">Esterilizado</span>}
                          {a.vaccinated && <span className="rounded-full bg-green-50 px-2 py-0.5 text-[9px] font-semibold text-green-700">Vacinado</span>}
                          {sizeLabel && <span className="rounded-full border border-line px-2 py-0.5 text-[9px] font-semibold text-ink/35">{sizeLabel}</span>}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-line bg-white px-8 py-16 text-center">
                <p className="font-display text-base font-semibold">Nenhum animal com estes filtros</p>
                <p className="mt-1 text-[13px] text-ink/35">Experimenta alargar a pesquisa.</p>
                <Link href="/adotar" className="mt-4 inline-block rounded-full bg-green-600 px-5 py-2.5 text-[12px] font-semibold text-white">Limpar filtros</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row">
          <p className="text-[13px] text-white/60">Nao podes adotar agora? Podes ajudar na mesma. Torna-te voluntario, acolhe temporariamente ou faz um donativo.</p>
          <Link href="/voluntariar" className="shrink-0 rounded-full bg-white px-5 py-2.5 text-[12px] font-semibold text-green-800 transition hover:bg-green-50">Quero ajudar</Link>
        </div>
      </section>
    </main>
  );
}

function CardPhoto({ src, alt }) {
  return <img src={src} alt={alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />;
}

function HiddenParams({ params, exclude }) {
  return Object.entries(params).filter(([k]) => k !== exclude).map(([k, v]) => (
    <input key={k} type="hidden" name={k} value={v} />
  ));
}

function buildHref(params, name, value) {
  const next = { ...params, [name]: value };
  if (value === "todos" || value === "") delete next[name];
  const qs = new URLSearchParams(next).toString();
  return "/adotar" + (qs ? "?" + qs : "");
}

function FilterPills({ label, name, value, options, params }) {
  const current = value || "todos";
  return (
    <div>
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.1em] text-ink/35">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <Link key={o.value} href={buildHref(params, name, o.value)} className={"rounded-full px-3 py-1.5 text-[12px] font-medium transition " + (current === o.value ? "bg-green-600 text-white" : "border border-line bg-white text-ink/50 hover:border-ink")}>
            {o.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function FilterSelect({ label, name, value, options, params }) {
  const current = value || "todos";
  return (
    <div>
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.1em] text-ink/35">{label}</span>
      <div className="flex flex-col gap-1">
        {options.map((opt) => {
          const [val, lbl] = opt.split("|");
          return (
            <Link key={val} href={buildHref(params, name, val)} className={"block rounded-lg px-3 py-2 text-[12px] font-medium transition " + (current === val ? "bg-green-600 text-white" : "text-ink/50 hover:bg-green-50 hover:text-ink")}>
              {lbl}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function FilterCheck({ label, name, checked, params }) {
  const next = { ...params };
  if (checked) { delete next[name]; } else { next[name] = "1"; }
  const qs = new URLSearchParams(next).toString();
  const href = "/adotar" + (qs ? "?" + qs : "");
  return (
    <Link href={href} className="flex items-center gap-2 text-[12px] font-medium text-ink/50 transition hover:text-ink">
      <span className={"flex h-4 w-4 items-center justify-center rounded border text-[9px] " + (checked ? "border-green-600 bg-green-600 text-white" : "border-line")}>{checked ? "✓" : ""}</span>
      {label}
    </Link>
  );
}

function FilterToggle({ label, name, value, params }) {
  const active = value === "1";
  const next = { ...params };
  if (active) { delete next[name]; } else { next[name] = "1"; }
  const qs = new URLSearchParams(next).toString();
  const href = "/adotar" + (qs ? "?" + qs : "");
  return (
    <Link href={href} className={"flex items-center gap-2 rounded-lg border px-3 py-2.5 text-[12px] font-medium transition " + (active ? "border-green-600 bg-green-50 text-green-700" : "border-line text-ink/40 hover:border-ink")}>
      <span className={"flex h-4 w-4 items-center justify-center rounded border text-[9px] " + (active ? "border-green-600 bg-green-600 text-white" : "border-line")}>{active ? "✓" : ""}</span>
      {label}
    </Link>
  );
}