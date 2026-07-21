"use client";
import { useState } from "react";
import LostFoundForm from "./LostFoundForm";

export default function LostFoundButtons() {
  const [formType, setFormType] = useState(null);

  if (formType) {
    return (
      <aside>
        <div className="rounded-2xl border border-line bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-sm font-bold">
              {formType === "lost" ? "Publicar animal perdido" : "Publicar animal encontrado"}
            </h3>
            <button onClick={() => setFormType(null)} className="text-[13px] font-semibold text-ink/40 hover:text-ink">
              Cancelar
            </button>
          </div>
          <LostFoundForm type={formType} onClose={() => setFormType(null)} />
        </div>
      </aside>
    );
  }

  return (
    <aside className="space-y-4">
      <div className="rounded-2xl bg-green-800 p-6 text-white">
        <h3 className="font-display text-sm font-bold">Perdi o meu animal</h3>
        <p className="mt-2 text-[13px] text-white/45">
          Publica com local e contacto. A comunidade ajuda a procurar.
        </p>
        <button
          onClick={() => setFormType("lost")}
          className="mt-4 w-full rounded-full bg-white py-2.5 text-[13px] font-semibold text-ink transition hover:bg-paper"
        >
          Publicar perdido
        </button>
      </div>
      <div className="rounded-2xl bg-gold-light p-6">
        <h3 className="font-display text-sm font-bold">Encontrei um animal</h3>
        <p className="mt-2 text-[13px] text-ink/45">
          Verifica se tem chip num veterinario e publica aqui.
        </p>
        <button
          onClick={() => setFormType("found")}
          className="mt-4 w-full rounded-full bg-green-800 py-2.5 text-[13px] font-semibold text-white transition hover:bg-green-700"
        >
          Publicar encontrado
        </button>
      </div>
      <div className="rounded-2xl border border-line bg-white p-6">
        <h3 className="font-display text-sm font-bold">Dica</h3>
        <p className="mt-2 text-[13px] text-ink/40">
          A maioria dos reencontros acontece nas primeiras 48 horas. Partilha tambem nos grupos locais.
        </p>
      </div>
    </aside>
  );
}