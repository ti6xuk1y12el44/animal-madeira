import Link from "next/link";

export default function AnimalCard({ animal }) {
  const age = animal.age_months < 12
    ? animal.age_months + " meses"
    : Math.floor(animal.age_months / 12) + (Math.floor(animal.age_months / 12) === 1 ? " ano" : " anos");

  const sizeLabel = { small: "Pequeno", medium: "Medio", large: "Grande" }[animal.size] || null;
  const photo = animal.photos && animal.photos[0] ? animal.photos[0] : null;

  return (
    <Link href={"/adotar/" + animal.slug} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-green-100">
        {photo ? (
          <Photo src={photo} alt={animal.name} />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-3xl font-bold text-green-400/20">
            {animal.name[0]}
          </div>
        )}
        {animal.urgent && (
          <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
            Urgente
          </span>
        )}
      </div>
      <div className="mt-2.5">
        <div className="flex items-center gap-1.5">
          <h3 className="font-display text-[14px] font-semibold transition group-hover:text-green-600">{animal.name}</h3>
          <span className="text-[12px] text-ink/30">{animal.sex === "f" ? "♀" : "♂"}</span>
        </div>
        <p className="text-[12px] text-ink/40">
          {animal.species === "dog" ? "Cao" : "Gato"} · {age}
        </p>
        <p className="text-[11px] text-ink/30">{animal.shelters?.name} · {animal.shelters?.parish}</p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {animal.sterilised && (
            <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">Esterilizado</span>
          )}
          {animal.vaccinated && (
            <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">Vacinado</span>
          )}
          {sizeLabel && (
            <span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold text-ink/40">{sizeLabel}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function Photo({ src, alt }) {
  return <img src={src} alt={alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />;
}