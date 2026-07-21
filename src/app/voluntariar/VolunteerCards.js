"use client";
import { useState } from "react";
import VolunteerForm from "./VolunteerForm";

const options = [
  {
    id: "acolhimento",
    title: "Acolher temporariamente",
    desc: "Abre a tua casa a um animal enquanto espera por adocao. Alimentacao e apoio veterinario assegurados.",
    points: ["Cuidado temporario", "Comida e vet incluidos", "Preparar para adocao"],
    style: "bg-green-800 text-white",
  },
  {
    id: "flight-buddy",
    title: "Ser flight buddy",
    desc: "Acompanha um animal no voo ate a sua nova familia. Nos tratamos de toda a logistica.",
    points: ["Viajar com o animal", "Seguranca e conforto", "Nos organizamos tudo"],
    style: "bg-gold-light",
  },
  {
    id: "ced",
    title: "Ajudar colonias (CED)",
    desc: "Capturar, esterilizar e devolver gatos comunitarios. Formacao e material incluidos.",
    points: ["Montar armadilhas humanas", "Transporte a esterilizacao", "Programas CED"],
    style: "border border-line bg-white",
  },
];

export default function VolunteerCards() {
  const [active, setActive] = useState(null);

  if (active) {
    return (
      <div className="mx-auto max-w-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Inscrever-me: {active}</h2>
          <button onClick={() => setActive(null)} className="text-[13px] font-semibold text-ink/40 hover:text-ink">
            Voltar
          </button>
        </div>
        <div className="rounded-2xl border border-line bg-white p-6">
          <VolunteerForm interest={active} onClose={() => setActive(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {options.map((card) => {
        const dark = card.style.includes("green-800");
        return (
          <div key={card.id} className={"flex flex-col rounded-2xl p-8 " + card.style}>
            <h3 className="font-display text-xl font-bold">{card.title}</h3>
            <p className={"mt-2 text-[14px] leading-relaxed " + (dark ? "text-white/50" : "text-ink/40")}>
              {card.desc}
            </p>
            <ul className="mt-6 space-y-2">
              {card.points.map((p) => (
                <li key={p} className={"flex items-center gap-2 text-[13px] " + (dark ? "text-white/50" : "text-ink/40")}>
                  <span className="text-gold">✓</span> {p}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setActive(card.id)}
              className={"mt-8 w-full rounded-full py-3 text-sm font-semibold transition " +
                (dark
                  ? "bg-white text-ink hover:bg-paper"
                  : "bg-green-800 text-white hover:bg-green-700")
              }
            >
              Quero ajudar
            </button>
          </div>
        );
      })}
    </div>
  );
}