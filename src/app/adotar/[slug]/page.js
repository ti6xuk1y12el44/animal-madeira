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
  return { title: data ? data.name + " · Animal Madeira" : "Animal" };
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

  const age = animal.age_months < 12
    ? animal.age_months + " meses"
    : Math.floor(animal.age_months / 12) + (Math.floor(animal.age_months / 12) === 1 ? " ano" : " anos");

  const sizeLabel = { small: "Pequeno", medium: "Medio", large: "Grande" }[animal.size] || null;
  const photo = animal.photos && animal.photos[0] ? animal.photos[0] : null;
  const shelterPhone = animal.shelters?.phone || null;
  const shelterEmail = animal.shelters?.email || null;

  return (
    <main>
      <div className="mx-auto max-w-6xl px-5 py-8">
        <Link href="/adotar" className="text-[13px] font-semibold text-ink/80 transition hover:text-ink">
          Voltar a todos os animais
        </Link>
      </div>

      <section className="mx-auto max-w-6xl px-5 pb-24 md:pb-32">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-green-100">
            <Photo src={photo} alt={animal.name} />
            {animal.urgent && (
              <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
                Adocao urgente
              </span>
            )}
          </div>

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

            <div className="mt-5 flex flex-wrap gap-2">
              {animal.sterilised && (
                <span className="rounded-full bg-green-100 px-3 py-1.5 text-[12px] font-semibold text-green-700">Esterilizado</span>
              )}
              {animal.vaccinated && (
                <span className="rounded-full bg-green-100 px-3 py-1.5 text-[12px] font-semibold text-green-700">Vacinado</span>
              )}
              {sizeLabel && (
                <span className="rounded-full border border-line px-3 py-1.5 text-[12px] font-semibold text-ink/50">{sizeLabel}</span>
              )}
            </div>

            {animal.description && (
              <div className="mt-8">
                <h2 className="font-display text-base font-bold">Sobre</h2>
                <p className="mt-2 max-w-[50ch] text-[15px] leading-relaxed text-ink/75">{animal.description}</p>
              </div>
            )}

            <div className="mt-8 grid grid-cols-2 gap-3">
              <DetailBox label="Idade" value={age} />
              <DetailBox label="Sexo" value={animal.sex === "f" ? "Femea" : "Macho"} />
              {sizeLabel && <DetailBox label="Porte" value={sizeLabel} />}
              <DetailBox label="Especie" value={animal.species === "dog" ? "Cao" : "Gato"} />
            </div>

            <div className="mt-8 rounded-2xl bg-green-50 p-6">
              <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-green-600">Abrigo</span>
              <h3 className="mt-1 font-display text-lg font-bold">{animal.shelters?.name}</h3>
              <p className="mt-0.5 text-[13px] text-ink/80 text-[14px]">{animal.shelters?.parish}</p>
              <div className="mt-4 flex flex-col gap-1 text-[13px]">
                {shelterPhone && <span className="font-display font-bold text-ink/80 text-[14px]">{shelterPhone}</span>}
                {shelterEmail && <span className="text-ink/80 text-[14px]">{shelterEmail}</span>}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {shelterPhone && <PhoneButton phone={shelterPhone} />}
              {shelterEmail && <EmailButton email={shelterEmail} name={animal.name} />}
            </div>

            <p className="mt-4 text-[12px] text-ink/80">
              Contacta o abrigo diretamente para saber mais sobre o processo de adoção.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Photo({ src, alt }) {
  if (!src) {
    return (
      <div className="flex h-full items-center justify-center font-display text-6xl font-bold text-green-400/20">
        {alt[0]}
      </div>
    );
  }
  return <img src={src} alt={alt} className="h-full w-full object-cover" />;
}

function DetailBox({ label, value }) {
  return (
    <div className="rounded-xl border border-line p-4">
      <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-ink/30">{label}</span>
      <p className="mt-1 font-display text-base font-semibold">{value}</p>
    </div>
  );
}

function PhoneButton({ phone }) {
  return (
    <a href={"tel:" + phone} className="rounded-full bg-green-800 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700">
      Ligar ao abrigo
    </a>
  );
}

function EmailButton({ email, name }) {
  return (
    <a href={"mailto:" + email + "?subject=Adocao - " + name} className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold transition hover:border-ink">
      Enviar email
    </a>
  );
}