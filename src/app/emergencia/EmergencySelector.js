"use client";
import { useState } from "react";

const situations = [
  {
    id: "ferido",
    icon: "🚑",
    title: "Animal ferido",
    desc: "Atropelado, a sangrar ou com dor visível.",
    steps: [
      "Verifica se a zona é segura para ti e para o animal.",
      "Se é urgente, liga 112 (Bombeiros).",
      "Tira fotos do animal e do local.",
      "Fica por perto até chegar ajuda.",
    ],
    contacts: [
      { name: "Bombeiros", phone: "112", note: "Perigo imediato" },
      { name: "Câmara Municipal local", phone: "Ver contactos do concelho", note: "Animais na via pública" },
      { name: "Provedor do Animal", phone: "291 212 180", note: "provedor.animal@madeira.gov.pt" },
    ],
  },
  {
    id: "abandonado",
    icon: "🐾",
    title: "Animal abandonado",
    desc: "Sozinho, deixado para trás ou a vaguear.",
    steps: [
      "Observa: tem coleira? Pode estar apenas perdido.",
      "Tira fotos e regista o local exato.",
      "Submete uma denúncia na plataforma.",
      "Verifica os anúncios de Perdidos & Achados.",
    ],
    contacts: [
      { name: "Denúncia online", phone: "/denunciar", note: "Nesta plataforma", link: true },
      { name: "Câmara Municipal local", phone: "Ver contactos do concelho", note: "Recolha de animais errantes" },
    ],
  },
  {
    id: "crueldade",
    icon: "⚠️",
    title: "Maus-tratos",
    desc: "Sem comida, acorrentado, agredido ou em condições insalubres.",
    steps: [
      "Não confrontes o agressor.",
      "Documenta com fotos ou vídeos.",
      "Faz a denúncia aqui ou à PSP.",
      "Guarda os comprovativos.",
    ],
    contacts: [
      { name: "PSP", phone: "291 208 400", note: "Crimes contra animais" },
      { name: "Denúncia online", phone: "/denunciar", note: "Confidencial", link: true },
      { name: "Provedor do Animal", phone: "291 212 180", note: "provedor.animal@madeira.gov.pt" },
    ],
  },
  {
    id: "colonia",
    icon: "🐈",
    title: "Colónia de gatos",
    desc: "Gatos comunitários que precisam de esterilização.",
    steps: [
      "Não afastes os gatos — colónias estáveis são a solução.",
      "Contacta um grupo CED da tua zona.",
      "Podes tornar-te cuidador registado.",
    ],
    contacts: [
      { name: "SPAD", phone: "963 779 068", note: "Programas CED" },
      { name: "Patinhas ao Sol", phone: "962 118 400", note: "Ponta do Sol e arredores" },
    ],
  },
  {
    id: "selvagem",
    icon: "🦅",
    title: "Vida selvagem",
    desc: "Ave ferida, cagarra ou outro animal selvagem.",
    steps: [
      "Não alimentes nem manipules mais do que o necessário.",
      "Coloca aves numa caixa de cartão furada, em local escuro.",
      "Contacta o IFCN.",
    ],
    contacts: [
      { name: "IFCN (Instituto de Florestas)", phone: "291 740 060", note: "Fauna selvagem da RAM" },
      { name: "SPEA Madeira", phone: "291 241 210", note: "Aves — época das cagarras" },
    ],
  },
  {
    id: "outro",
    icon: "❓",
    title: "Outra situação",
    desc: "Animal morto, perdido ou algo diferente.",
    steps: [
      "Animal morto na via: contacta a câmara municipal.",
      "Animal perdido: usa a secção Perdidos & Achados.",
      "Na dúvida, escreve-nos.",
    ],
    contacts: [
      { name: "Câmara Municipal local", phone: "Ver site do concelho", note: "Via pública" },
      { name: "Animal Madeira", phone: "ola@madeirafriends.org", note: "Ajudamos a encaminhar" },
    ],
  },
];

export default function EmergencySelector() {
  const [active, setActive] = useState(null);
  const current = situations.find((s) => s.id === active);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {situations.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(active === s.id ? null : s.id)}
            className={`flex flex-col gap-2 rounded-2xl border p-6 text-left transition hover:-translate-y-0.5 hover:shadow-sm ${
              active === s.id
                ? "border-green bg-green-light"
                : "border-line bg-white hover:border-ink"
            }`}
          >
            <span className="text-2xl">{s.icon}</span>
            <h3 className="font-display text-base font-semibold">{s.title}</h3>
            <p className="text-[13px] text-ink/45">{s.desc}</p>
          </button>
        ))}
      </div>

      {current && (
        <div className="mt-8 grid gap-8 rounded-2xl border border-line bg-white p-8 md:grid-cols-2 md:p-10">
          <div>
            <h2 className="font-display text-xl font-bold">
              {current.icon} {current.title}
            </h2>
            <p className="mb-6 mt-1 text-[13px] text-ink/40">O que fazer, passo a passo</p>
            <ol className="space-y-3">
              {current.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-[14px]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-light font-display text-xs font-bold text-green">
                    {i + 1}
                  </span>
                  <span className="text-ink/60">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="mb-4 font-display text-base font-bold">Quem contactar</h3>
            <div className="space-y-3">
              {current.contacts.map((c, i) => (
                <div key={i} className="flex items-center justify-between gap-4 rounded-xl border border-line px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-[12px] text-ink/40">{c.note}</p>
                  </div>
                  {c.link ? (
                    <a href={c.phone} className="shrink-0 rounded-full bg-green px-4 py-2 text-[12px] font-semibold text-white">
                      Ir →
                    </a>
                  ) : (
                    <span className="shrink-0 font-display text-sm font-bold">{c.phone}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}