import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/server";
import AnimalCard from "@/components/AnimalCard";

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
  if (params.urgente === "1") query = query.eq("urgent", true);

  const { data: animals, error } = await query;

  const filtered = params.concelho && params.concelho !== "todos"
    ? animals?.filter((a) => a.shelters?.parish === params.concelho)
    : animals;

  const count = filtered?.length ?? 0;

  return (
    <main>
      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[.2em] text-green">Adoção</p>
          <h1 className="max-w-[16ch] font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Encontra o teu novo melhor amigo<span className="text-green">.</span>
          </h1>
          <p className="mt-4 max-w-[48ch] text-[15px] text-white/45">
            Todos os animais são avaliados por um veterinário. Quando adotas, mudas duas vidas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">

          <aside>
            <div className="sticky top-20">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-base font-bold">Filtrar</h2>
                <Link href="/adotar" className="text-[13px] font-semibold text-green hover:underline">
                  Limpar
                </Link>
              </div>

              <form className="space-y-6">
                <FilterGroup label="Espécie" name="especie" value={params.especie} options={[
                  { value: "todos", label: "Todos" },
                  { value: "dog", label: "Cães" },
                  { value: "cat", label: "Gatos" },
                ]} params={params} />

                <FilterGroup label="Concelho" name="concelho" value={params.concelho} options={[
                  { value: "todos", label: "Todos" },
                  { value: "Funchal", label: "Funchal" },
                  { value: "Santa Cruz", label: "Santa Cruz" },
                  { value: "Machico", label: "Machico" },
                  { value: "Câmara de Lobos", label: "Câmara de Lobos" },
                  { value: "Ribeira Brava", label: "Ribeira Brava" },
                  { value: "Santana", label: "Santana" },
                  { value: "Ponta do Sol", label: "Ponta do Sol" },
                  { value: "Calheta", label: "Calheta" },
                ]} params={params} />

                <FilterGroup label="Porte" name="porte" value={params.porte} options={[
                  { value: "todos", label: "Todos" },
                  { value: "small", label: "Pequeno" },
                  { value: "medium", label: "Médio" },
                  { value: "large", label: "Grande" },
                ]} params={params} />

                <FilterToggle label="Apenas urgentes" name="urgente" value={params.urgente} params={params} />
              </form>
            </div>
          </aside>

          <div>
            <p className="mb-6 text-[13px] font-semibold text-ink/50">
              {count} {count === 1 ? "animal encontrado" : "animais encontrados"}
            </p>

            {count > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((a) => <AnimalCard key={a.id} animal={a} />)}
              </div>
            ) : (
              <div className="rounded-2xl border border-line bg-white px-8 py-20 text-center">
                <p className="font-display text-lg font-semibold">Nenhum animal com estes filtros</p>
                <p className="mt-2 text-[13px] text-ink/45">Experimenta alargar a pesquisa.</p>
                <Link
                  href="/adotar"
                  className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-green-dark"
                >
                  Limpar filtros
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}


function FilterGroup({ label, name, value, options, params }) {
  const current = value || "todos";

  function buildHref(optionValue) {
    const next = { ...params, [name]: optionValue };
    if (optionValue === "todos") delete next[name];
    const qs = new URLSearchParams(next).toString();
    return "/adotar" + (qs ? "?" + qs : "");
  }

  return (
    <div>
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[.12em] text-ink/40">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <Link
            key={o.value}
            href={buildHref(o.value)}
            className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition ${
              current === o.value
                ? "bg-ink text-white"
                : "bg-white border border-line text-ink/60 hover:border-ink hover:text-ink"
            }`}
          >
            {o.label}
          </Link>
        ))}
      </div>
    </div>
  );
}


function FilterToggle({ label, name, value, params }) {
  const active = value === "1";
  const next = { ...params };
  if (active) { delete next[name]; } else { next[name] = "1"; }
  const qs = new URLSearchParams(next).toString();
  const href = "/adotar" + (qs ? "?" + qs : "");

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-[13px] font-medium transition ${
        active ? "border-green bg-green-light text-green" : "border-line bg-white text-ink/50 hover:border-ink"
      }`}
    >
      <span className={`flex h-5 w-5 items-center justify-center rounded-md border text-[10px] ${
        active ? "border-green bg-green text-white" : "border-line"
      }`}>
        {active && "✓"}
      </span>
      {label}
    </Link>
  );
}