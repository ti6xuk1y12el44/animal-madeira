"use client";
import { useState } from "react";
import { Ambulance, PawPrint, AlertTriangle, Cat, Bird, HelpCircle } from "lucide-react";

const situations = [
  {
    id: "ferido",
    Icon: Ambulance,
    color: "text-red-500",
    bg: "bg-red-50",
    title: "Animal ferido",
    desc: "Atropelado, a sangrar ou com dor visivel.",
    steps: [
      "Verifica se a zona e segura para ti e para o animal.",
      "Se e urgente, liga 112 (Bombeiros).",
      "Tira fotos do animal e do local.",
      "Fica por perto ate chegar ajuda.",
    ],
    contacts: [
      { name: "Bombeiros", phone: "112", note: "Perigo imediato" },
      { name: "Camara Municipal local", phone: "Ver contactos do concelho", note: "Animais na via publica" },
      { name: "Provedor do Animal", phone: "291 212 180", note: "provedor.animal@madeira.gov.pt" },
    ],
  },
  {
    id: "abandonado",
    Icon: PawPrint,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "Animal abandonado",
    desc: "Sozinho, deixado para tras ou a vaguear.",
    steps: [
      "Observa: tem coleira? Pode estar apenas perdido.",
      "Tira fotos e regista o local exato.",
      "Submete uma denuncia na plataforma.",
      "Verifica os anuncios de Perdidos & Achados.",
    ],
    contacts: [
      { name: "Denuncia online", phone: "/denunciar", note: "Nesta plataforma", link: true },
      { name: "Camara Municipal local", phone: "Ver contactos do concelho", note: "Recolha de animais errantes" },
    ],
  },
  {
    id: "crueldade",
    Icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-50",
    title: "Maus-tratos",
    desc: "Sem comida, acorrentado, agredido ou em condicoes insalubres.",
    steps: [
      "Nao confrontes o agressor.",
      "Documenta com fotos ou videos.",
      "Faz a denuncia aqui ou a PSP.",
      "Guarda os comprovativos.",
    ],
    contacts: [
      { name: "PSP", phone: "291 208 400", note: "Crimes contra animais" },
      { name: "Denuncia online", phone: "/denunciar", note: "Confidencial", link: true },
      { name: "Provedor do Animal", phone: "291 212 180", note: "provedor.animal@madeira.gov.pt" },
    ],
  },
  {
    id: "colonia",
    Icon: Cat,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "Colonia de gatos",
    desc: "Gatos comunitarios que precisam de esterilizacao.",
    steps: [
      "Nao afastes os gatos — colonias estaveis sao a solucao.",
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
    Icon: Bird,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "Vida selvagem",
    desc: "Ave ferida, cagarra ou outro animal selvagem.",
    steps: [
      "Nao alimentes nem manipules mais do que o necessario.",
      "Coloca aves numa caixa de cartao furada, em local escuro.",
      "Contacta o IFCN.",
    ],
    contacts: [
      { name: "IFCN (Instituto de Florestas)", phone: "291 740 060", note: "Fauna selvagem da RAM" },
      { name: "SPEA Madeira", phone: "291 241 210", note: "Aves — epoca das cagarras" },
    ],
  },
  {
    id: "outro",
    Icon: HelpCircle,
    color: "text-ink/50",
    bg: "bg-green-50",
    title: "Outra situacao",
    desc: "Animal morto, perdido ou algo diferente.",
    steps: [
      "Animal morto na via: contacta a camara municipal.",
      "Animal perdido: usa a seccao Perdidos & Achados.",
      "Na duvida, escreve-nos.",
    ],
    contacts: [
      { name: "Camara Municipal local", phone: "Ver site do concelho", note: "Via publica" },
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
            className={"flex flex-col gap-3 rounded-xl border p-6 text-left transition hover:-translate-y-0.5 hover:shadow-sm " +
              (active === s.id
                ? "border-green-600 bg-green-50"
                : "border-line bg-white hover:border-green-400")
            }
          >
            <span className={"flex h-10 w-10 items-center justify-center rounded-lg " + s.bg}>
              <s.Icon size={20} className={s.color} />
            </span>
            <h3 className="font-display text-base font-semibold">{s.title}</h3>
            <p className="text-[13px] text-ink/60">{s.desc}</p>
          </button>
        ))}
      </div>

      {current && (
        <div className="mt-8 grid gap-8 rounded-xl border border-line bg-white p-8 md:grid-cols-2 md:p-10">
          <div>
            <div className="flex items-center gap-3">
              <span className={"flex h-9 w-9 items-center justify-center rounded-lg " + current.bg}>
                <current.Icon size={18} className={current.color} />
              </span>
              <h2 className="font-display text-xl font-bold">{current.title}</h2>
            </div>
            <p className="mb-6 mt-2 text-[13px] text-ink/50">O que fazer, passo a passo</p>
            <ol className="space-y-3">
              {current.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-[14px]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-50 font-display text-xs font-bold text-green-600">
                    {i + 1}
                  </span>
                  <span className="text-ink/70">{step}</span>
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
                    <p className="text-[12px] text-ink/50">{c.note}</p>
                  </div>
                  {c.link ? (
                    <LinkButton href={c.phone} />
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

function LinkButton({ href }) {
  return (
    <a href={href} className="shrink-0 rounded-full bg-green-600 px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-green-700">
      Ir
    </a>
  );
}