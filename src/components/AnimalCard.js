import Link from "next/link";

export default function AnimalCard({ animal }) {
  const age =
    animal.age_months < 12
      ? `${animal.age_months} meses`
      : `${Math.floor(animal.age_months / 12)} ${Math.floor(animal.age_months / 12) === 1 ? "ano" : "anos"}`;

  return (
    <Link href={`/adotar/${animal.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-green-light">
        {animal.photos?.[0] ? (
          <img
            src={animal.photos[0]}
            alt={animal.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-4xl font-bold text-green/20">
            {animal.name[0]}
          </div>
        )}
        {animal.urgent && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Urgente
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-2">
        <h3 className="font-display text-lg font-semibold group-hover:text-green transition">{animal.name}</h3>
        <span className="text-xs text-ink-50">{animal.sex === "f" ? "♀" : "♂"}</span>
      </div>
      <p className="mt-0.5 text-[13px] text-ink-50">
        {animal.species === "dog" ? "Cão" : "Gato"} · {age}
      </p>
      <p className="mt-0.5 text-[13px] text-ink-50">{animal.shelters?.name}</p>
    </Link>
  );
}