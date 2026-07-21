import Link from "next/link";
import { supabasePublic } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AnimalCard from "@/components/AnimalCard";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supabase = supabasePublic();
  const { data } = await supabase.from("shelters").select("name").eq("slug", slug).single();
  return { title: data ? `${data.name} · Animal Madeira` : "Abrigo nao encontrado" };
}

export default async function ShelterPage({ params }) {
  const { slug } = await params;
  const supabase = supabasePublic();

  const { data: shelter, error } = await supabase
    .from("shelters")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !shelter) notFound();

  const { data: animals } = await supabase
    .from("animals")
    .select("*, shelters(name, parish)")
    .eq("shelter_id", shelter.id)
    .eq("adopted", false)
    .order("created_at", { ascending: false });

  const typeLabels = {
    associacao: "Associacao",
    canil_municipal: "Canil municipal",
    clinica: "Clinica solidaria",
  };

  return (
    <main>
      <div className="mx-auto max-w-6xl px-5 py-8">
        <Link href="/abrigos" className="text-[13px] font-semibold text-ink/40 transition hover:text-ink">
          ← Voltar aos abrigos
        </Link>
      </div>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="grid gap-10 md:grid-cols-[1fr_320px]">
          {/* INFO */}
          <div>
            <div className="flex items-start gap-5">
              {shelter.logo_url ? (
                <img src={shelter.logo_url} alt={shelter.name} className="h-16 w-16 rounded-xl object-contain" />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-800 font-display text-lg font-bold text-white">
                  {shelter.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
              )}
              <div>
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700">
                  {typeLabels[shelter.type] || shelter.type}
                </span>
                <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">{shelter.name}</h1>
                <p className="mt-1 text-[15px] text-ink/40">{shelter.parish}</p>
              </div>
            </div>

            {/* SERVICOS */}
            {shelter.services && shelter.services.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 font-display text-base font-bold">Servicos</h2>
                <div className="flex flex-wrap gap-2">
                  {shelter.services.map((s) => (
                    <span key={s} className="rounded-full border border-line px-3.5 py-1.5 text-[12px] font-semibold text-ink/50">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ANIMAIS */}
            <div className="mt-12">
              <h2 className="mb-6 font-display text-xl font-bold">
                Animais para adocao ({animals?.length || 0})
              </h2>
              {animals && animals.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {animals.map((a) => <AnimalCard key={a.id} animal={a} />)}
                </div>
              ) : (
                <p className="rounded-2xl border border-line bg-white px-8 py-16 text-center text-[14px] text-ink/35">
                  Sem animais para adocao de momento neste abrigo.
                </p>
              )}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h3 className="mb-4 font-display text-sm font-bold">Contactos</h3>
              <div className="space-y-3 text-[13px]">
                {shelter.phone && (
                  <div className="flex items-center justify-between">
                    <span className="text-ink/40">Telefone</span>
                    <a href={"tel:" + shelter.phone} className="font-display font-bold hover:text-green-600">{shelter.phone}</a>
                  </div>
                )}
                {shelter.email && (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-ink/40">Email</span>
                    <a href={"mailto:" + shelter.email} className="truncate font-semibold hover:text-green-600">{shelter.email}</a>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-ink/40">Concelho</span>
                  <span className="font-semibold">{shelter.parish}</span>
                </div>
              </div>
            </div>

            {shelter.website && (
              <a
                href={shelter.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl bg-green-800 p-6 text-white transition hover:bg-green-700"
              >
                <h3 className="font-display text-sm font-bold">Visitar site</h3>
                <p className="mt-1 text-[12px] text-white/40">{shelter.website.replace("https://", "").replace("www.", "")}</p>
                <span className="mt-4 inline-block rounded-full bg-white/15 px-4 py-2 text-[12px] font-semibold">
                  Abrir site
                </span>
              </a>
            )}

            <div className="rounded-2xl bg-gold-light p-6">
              <h3 className="font-display text-sm font-bold">Queres ajudar este abrigo?</h3>
              <p className="mt-2 text-[12px] text-ink/40">Voluntariado, donativos ou acolhimento temporario.</p>
              <Link href="/voluntariar" className="mt-4 inline-block text-[13px] font-semibold text-gold-dark hover:underline">
                Ver como ajudar →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}