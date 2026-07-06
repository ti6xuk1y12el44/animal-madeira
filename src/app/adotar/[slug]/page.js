import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supabase = supabasePublic();
  const { data } = await supabase
    .from("animals")
    .select("name")
    .eq("slug", slug)
    .single();

  return { title: data ? `${data.name} · Animal Madeira` : "Animal nao encontrado" };
}

export default async function AnimalPage({ params }) {
  const { slug } = await params;
  const supabase = supabasePublic();

  const { data: animal, error } = await supabase
    .from("animals")
    .select("*, shelters(name, parish, phone, email)")
    .eq("slug", slug)
    .single();

  if (error || !animal) notFound();

  const age =
    animal.age_months < 12
      ? `${animal.age_months} meses`
      : `${Math.floor(animal.age_months / 12)} ${Math.floor(animal.age_months / 12) === 1 ? "ano" : "anos"}`;

  const sizeLabel = { small: "Pequeno", medium: "Medio", large: "Grande" }[animal.size] || null;

  return (
    <main>
      <div className="mx-auto max-w-6xl px-5 py-8">
        <Link href="/adotar" className="text-[13px] font-semibold text-ink/40 transition hover:text-ink">
          ← Voltar a todos os animais
        </Link>
      </div>

      <section className="mx-auto max-w-6xl px-5 pb-24 md:pb-32">
        <div className="grid gap-10 md:grid-cols-2">
          {/* FOTO */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-green-light">
            {animal.photos?.[0] ? (
              <img
                src={animal.photos[0]}
                alt={animal.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center font-display text-6xl font-bold text-green/20">
                {animal.name[0]}
              </div>
            )}
            {animal.urgent && (
              <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
                Adocao urgente
              </span>
            )}
          </div>

          {/* INFO */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
                {animal.name}
              </h1>
              <span className="text-2xl text-ink/30">{animal.sex === "f" ? "♀" : "♂"}</span>
            </div>

            <p className="mt-2 text-[15px] text-ink/50">
              {animal.species === "dog" ? "Cao" : "Gato"} · {age} · {animal.shelters?.parish}
            </p>

            {/* TAGS */}
            <div className="mt-5 flex flex-wrap gap-2">
              {animal.sterilised && (
                <span className="rounded-full bg-green-light px-3 py-1.5 text-[12px] font-semibold text-green">
                  Esterilizado
                </span>
              )}
              {animal.vaccinated && (
                <span className="rounded-full bg-green-light px-3 py-1.5 text-[12px] font-semibold text-green">
                  Vacinado
                </span>
              )}
              {sizeLabel && (
                <span className="rounded-full border border-line px-3 py-1.5 text-[12px] font-semibold text-ink/50">
                  {sizeLabel}
                </span>
              )}
              {animal.species === "dog" && (
                <span className="rounded-full border border-line px-3 py-1.5 text-[12px] font-semibold text-ink/50">
                  {animal.sex === "f" ? "Cadela" : "Cao"}
                </span>
              )}
              {animal.species === "cat" && (
                <span className="rounded-full border border-line px-3 py-1.5 text-[12px] font-semibold text-ink/50">
                  {animal.sex === "f" ? "Gata" : "Gato"}
                </span>
              )}
            </div>

            {/* DESCRICAO */}
            {animal.description && (
              <div className="mt-8">
                <h2 className="font-display text-base font-bold">Sobre</h2>
                <p className="mt-2 max-w-[50ch] text-[15px] leading-relaxed text-ink/50">
                  {animal.description}
                </p>
              </div>
            )}

            {/* DETALHES */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-line p-4">
                <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-ink/30">Idade</span>
                <p className="mt-1 font-display text-base font-semibold">{age}</p>
              </div>
              <div className="rounded-xl border border-line p-4">
                <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-ink/30">Sexo</span>
                <p className="mt-1 font-display text-base font-semibold">{animal.sex === "f" ? "Femea" : "Macho"}</p>
              </div>
              {sizeLabel && (
                <div className="rounded-xl border border-line p-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-ink/30">Porte</span>
                  <p className="mt-1 font-display text-base font-semibold">{sizeLabel}</p>
                </div>
              )}
              <div className="rounded-xl border border-line p-4">
                <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-ink/30">Especie</span>
                <p className="mt-1 font-display text-base font-semibold">{animal.species === "dog" ? "Cao" : "Gato"}</p>
              </div>
            </div>

            {/* ABRIGO */}
            <div className="mt-8 rounded-2xl bg-green-light p-6">
              <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-green">Abrigo</span>
              <h3 className="mt-1 font-display text-lg font-bold">{animal.shelters?.name}</h3>
              <p className="mt-0.5 text-[13px] text-ink/40">{animal.shelters?.parish}</p>
              <div className="mt-4 flex flex-col gap-1 text-[13px]">
                {animal.shelters?.phone && (
                  <span className="font-display font-bold">{animal.shelters.phone}</span>
                )}
                {animal.shelters?.email && (
                  <span className="text-ink/40">{animal.shelters.email}</span>
                )}
              </div>
            </div>

            {/* ACOES */}
            <div className="mt-8 flex flex-wrap gap-3">
              {animal.shelters?.phone && (
                <CallShelter phone={animal.shelters.phone} />
              )}
              {animal.shelters?.email && (
                <EmailShelter email={animal.shelters.email} name={animal.name} />
              )}
            </div>

            <p className="mt-4 text-[12px] text-ink/30">
              Contacta o abrigo diretamente para saber mais sobre o processo de adocao.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function CallShelter({ phone }) {
  const url = "tel:" + phone;
  return (
    <a href={url} className="rounded-full bg-green px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-green-dark">
      Ligar ao abrigo
    </a>
  );
}

function EmailShelter({ email, name }) {
  const url = "mailto:" + email + "?subject=Adocao - " + name;
  return (
    <a href={url} className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold transition hover:border-ink">
      Enviar email
    </a>
  );
}